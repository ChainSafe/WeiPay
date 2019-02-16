const ethers = require('ethers');
const axios = require('axios');

let abi;

getContractAbi = (contractAddress, network) => {
	let url;
	if (network === 'mainnet') {
		url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`;
	} else if (network === 'ropsten') {
		url = `https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`;
	} else if (network === 'kovan') {
		url = `https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`;
	} else {
		url = `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`;
	}
	return axios.get(url)
		.then((res) => {
			abi = res.data.result;
			// console.log({ abi: abi });
			return { abi: abi };
			// console.log(res.data.result);
		})
		.catch((err) => {
			console.log({ err: err })
			return null;

			// console.log("in error", err);
		});
};

const getUniqueFunctions = (interfaceFunctions) => {
	let functionNames = [];
	for (var key in interfaceFunctions) {
		if (interfaceFunctions.hasOwnProperty(key)) {
			if (typeof interfaceFunctions[key] === 'function') {
				functionNames.push(key.split('(')[0]);
			}
		}
	}
	var unique = functionNames.filter((v, i, a) => a.indexOf(v) === i);
	// console.log("unique", unique);
	return unique;
};

const markPayableFunctions = (interfaceFunctions, uniqueFunctions) => {
	const formattedObjects = [];
	uniqueFunctions.forEach(element => {
		const funcObj = {};
		funcObj.signature = interfaceFunctions[element].signature;
		funcObj.payable = interfaceFunctions[element]['payable'];
		formattedObjects.push(funcObj);
	});
	return formattedObjects;
};

const getFunctionInputs = (interfaceFunctions, formattedFunctions) => {
	const functionsWithInputs = [];
	const uniqueKey = 333;
	for (let i = 0; i < formattedFunctions.length; i++) {
		const functionObject = {};
		const functionInputs = [];
		for (var key in interfaceFunctions) {
			if (key === formattedFunctions[i].signature) {
				functionObject.signature = formattedFunctions[i].signature;
				functionObject.payable = formattedFunctions[i].payable;
				const inputs = interfaceFunctions[key].inputs;
				for (let y = 0; y < inputs.names.length; y++) {
					const inputObj = {};
					inputObj.inputName = inputs.names[y];
					inputObj.type = inputs.types[y];
					const uniqueKeyHelper = functionsWithInputs.length * 2 + uniqueKey;
					inputObj.uniqueKey = `${uniqueKeyHelper}${functionObject.signature}${inputObj.inputName}${functionObject.payable}`;
					this.uniqueKey += 33;
					functionInputs.push(inputObj);
				}
				functionObject.inputs = functionInputs;
			}
		}
		functionsWithInputs.push(functionObject);
	}
	return functionsWithInputs;
};

const getUniqueFunctionsWithInputs = (interfaceFunctions) => {
	// final array of functions
	let functions = [];

	// array to check uniqueness
	let functionNames = [];

	for (let key in interfaceFunctions) {
		let tempFunction = interfaceFunctions[key];
		let functionName = key.split('(')[0];
		if (typeof tempFunction === 'function' && functionNames.indexOf(functionName) === -1) {
			const funcObj = {}
			funcObj.signature = tempFunction.signature;
			funcObj.name = functionName;
			funcObj.funcKey = key;
			funcObj.payable = tempFunction.payable;

			// getting inputs
			if (tempFunction.inputs && tempFunction.inputs.names && tempFunction.inputs.names.length) {
				let tempInputs = tempFunction.inputs;
				funcObj.inputs = { names: [], types: [] }
				for (let i = 0; i < tempInputs.names.length; i++) {
					// function input names are not always defined
					if (tempInputs.names[i]) {
						funcObj.inputs.names.push(tempInputs.names[i]);
						// function input types are not always defined
						if (tempInputs.types[i]) funcObj.inputs.types.push(tempInputs.types[i]);
						else funcObj.inputs.types.push("unknown");
					}
					else {
						funcObj.inputs.names.push('input' + i);
						// function input types are not always defined
						if (tempInputs.types[i]) funcObj.inputs.types.push(tempInputs.types[i]);
						else funcObj.inputs.types.push("unknown");
					}
				}
			}

			functions.push(funcObj);
			functionNames.push(functionName);
		}
	}
	// console.log("unique", functions);
	return functions;
};

export const processContractByAddress = async (wallet, address, provider, network) => {
	let myAbi = await this.getContractAbi(address, network);
	if (myAbi) {
		// console.log("after get contract abi", myAbi);
		try {
			const abiParsed = JSON.parse(myAbi.abi);
			const initializedWallet = new ethers.Wallet(wallet.privateKey, provider);
			try {
				const contract = await new ethers.Contract(address, abiParsed, initializedWallet);
				// unused variable
				// const contractEvents = contract.interface.events;
				const contractFunctions = contract.interface.functions;

				// console.log(contract);
				// console.log(contractFunctions);

				// const uniqueFunctionListX = await getUniqueFunctions(contractFunctions);
				// const formattedFunctions = await markPayableFunctions(contractFunctions, uniqueFunctionListX);
				// const withInputs = await getFunctionInputs(contractFunctions, formattedFunctions);

				const functionsWithInputs = getUniqueFunctionsWithInputs(contractFunctions);


				// console.log("with Inputs", withInputs);
				// console.log(functionsWithInputs);
				return {
					success: true,
					objects: { contractFunctions, contract, functionsWithInputs }
				};
			} catch (err) {
				console.log(err);
				return {
					success: false,
					objects: null
				};
			}
		} catch (err) {
			// abi parsing error due to some reason
			console.log("parsing error");
			return {
				success: false,
				objects: null
			};
		}
	}
	else {
		//abi error
		console.log("abi error");
		return {
			success: false,
			objects: null
		};
	}

};

const executePayableMethod = async (wallet, functionItem, inputs, contract, provider) => {
	console.log("inputs", inputs, "functionItem", functionItem);
	const initializedWallet = new ethers.Wallet(wallet.privateKey, provider);
	let { payable } = inputs;
	payable = payable.trim();

	const args = [];
	for (var key in inputs) {
		if (key !== 'payable') {
			args.push(inputs[key]);
		}
	}
	console.log(args.toString());
	if (!isNaN(payable)) {
		try {
			const contractWithSigner = contract.connect(initializedWallet);
			if (!args.length) {
				const tx = await contract['functions'][functionItem.funcKey]();
				console.log(tx);
				return { success: true, data: tx };
			} else {
				const transactionCountPromise = initializedWallet.getTransactionCount();
				const wei = ethers.utils.parseEther(payable);
				const count = await transactionCountPromise;
				const overrideOptions = {
					gasLimit: 250000,
					gasPrice: 9000000000,
					nonce: count,
					value: wei,
				};
				console.log(args);
				// not sure if this executes
				const call = "contractWithSigner['functions'][functionItem.funcKey](" + args.toString() + ',' + 'overrideOptions' + ')';
				console.log(call);
				const methodResponse = await eval(call);
				return { success: true, data: methodResponse };
			}
		} catch (err) {
			console.log(err);
			return { success: false, msg: err };
		}
	} else {
		console.log('payable amount is not a number');
		return { success: false, msg: 'payable amount is not a number' };
	}
};

const executeMethod = async (wallet, functionItem, inputs, contract, provider) => {
	console.log("inputs", inputs, "functionItem", functionItem);
	const initializedWallet = new ethers.Wallet(wallet.privateKey, provider);

	const args = [];
	for (let key in inputs) {
		if (key !== 'payable') {
			args.push(inputs[key]);
		}
	}

	try {
		// const args = Object.values(inputs);
		const contractWithSigner = contract.connect(initializedWallet);
		if (!args.length) {
			const methodResponse = await contract['functions'][functionItem.funcKey]();
			return { success: true, data: methodResponse };
		} else {
			console.log(args);
			const call = "contractWithSigner['functions'][functionItem.funcKey](" + args.toString() + ')';
			console.log(call);
			const methodResponse = await eval(call);
			return { success: true, data: methodResponse };
		}
	} catch (err) {
		console.log(err);
		return { success: false, msg: err };
	}
};

export const processFunctionCall2 = async (wallet, functionItem, inputs, contract, provider) => {
	if (functionItem.payable) {
		return await executePayableMethod(wallet, functionItem, inputs, contract, provider);
	} else {
		return await executeMethod(wallet, functionItem, inputs, contract, provider);
	}
};

