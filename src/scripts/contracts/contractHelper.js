const ethers = require('ethers');
const axios = require('axios');

let abi;

getContractAbi = async (contractAddress, network) => {
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
  await axios.get(url)
    .then((res) => {
      abi = res.data.result;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUniqueFunctionSignatures = (interfaceFunctions) => {
  let functionNames = [];
  for (var key in interfaceFunctions) {
    if (interfaceFunctions.hasOwnProperty(key)) {
      functionNames.push(key.split('(')[0]);
    }
  }
  var unique = functionNames.filter((v, i, a) => a.indexOf(v) === i);
  return unique;
};

const markPayableFunctions = (interfaceFunctions, uniqueFunctions) => {
  let formattedObjects = [];
  uniqueFunctions.forEach(element => {
    let funcObj = {};
    funcObj.payable = interfaceFunctions[element]['payable'];
    funcObj.signature = interfaceFunctions[element].signature;
    const functionInputs = interfaceFunctions[element].inputs;
    formattedObjects.push(funcObj);
  });
  return formattedObjects;
};

const getFunctionInputs = (interfaceFunctions, formattedFunctions) => {
  let functionsWithInputs = [];
  let uniqueKey = 333;
  for (let i = 0; i < formattedFunctions.length; i++) {
    let functionObject = {};
    let functionInputs = [];
    for (var key in interfaceFunctions) {
      if (key === formattedFunctions[i].signature) {
        functionObject.signature = formattedFunctions[i].signature;
        functionObject.payable = formattedFunctions[i].payable;
        const inputs = interfaceFunctions[key].inputs;
        for (let y = 0; y < inputs.names.length; y++) {
          let inputObj = {};
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

export const processContractByAddress = async (wallet, address, provider, network) => {
  await this.getContractAbi(address, network);
  const abiParsed = JSON.parse(abi);
  const initializedWallet = new ethers.Wallet(wallet.privateKey, provider);
  try {
    let contract = await new ethers.Contract(address, abiParsed, initializedWallet);
    let contractEvents = contract.interface.events;
    let contractFunctions = contract.interface.functions;
    let functionNames = [];
    for (var key in contractFunctions) {
      if (contractFunctions.hasOwnProperty(key)) {
        functionNames.push(key.split('(')[0]);
      }
    }
    var uniqueX = functionNames.filter((v, i, a) => a.indexOf(v) === i);
    const uniqueFunctionListX = await getUniqueFunctionSignatures(contractFunctions);
    const formattedFunctions = await markPayableFunctions(contractFunctions, uniqueFunctionListX);
    const withInputs = await getFunctionInputs(contractFunctions, formattedFunctions);
    return { contractFunctions, contractEvents, contract, withInputs };
  } catch (err) {
    console.log(err);
  }
};

const executePayableMethod = async (wallet, functionName, inputs, contract, provider) => {
  const initializedWallet = new ethers.Wallet(wallet.privateKey, provider);
  const { payable } = inputs;
  const trimmedValue = payable.trim();
  let args = [];
  for (var key in inputs) {
    if(key !== 'payable') {
      args.push(inputs[key]);
    }
  }

  if(!isNaN(payable)) {
    try {
      const contractWithSigner = contract.connect(initializedWallet);
      if (args.length == 0) {
        let tx = await contract['functions'][functionName]();
        console.log('Call went through');
        console.log(tx);
        console.log('---------000---------------');
      } else {
        const transactionCountPromise = initializedWallet.getTransactionCount();
        const wei = ethers.utils.parseEther(trimmedValue);
        const count = await transactionCountPromise;
        const overrideOptions = {
          gasLimit: 250000,
          gasPrice: 9000000000,
          nonce: count,
          value: wei,
        };
        const call = "contractWithSigner['functions'][functionName](" + args.toString() + ',' + 'overrideOptions' + ')';
        await eval(call);
        console.log(call);
        console.log('Call went through');
        console.log('---------000---------------');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('payable amount is not a number');
  }
};

const executeMethod = async (wallet, functionName, inputs, contract, provider) => {
  const initializedWallet = new ethers.Wallet(wallet.privateKey, provider);
  try {
    const args = Object.values(inputs);
    const contractWithSigner = contract.connect(initializedWallet);
    if (args.length == 0) {
      let tx = await contract['functions'][functionName]();
      console.log('Call went through');
      console.log(tx);
      console.log('---------000---------------');
    } else {
      const call = "contractWithSigner['functions'][functionName](" + args.toString() + ')';
      console.log(call);
      await eval(call);
      console.log('Call went through');
      console.log('---------000---------------');
    }
  } catch (err) {
    console.log(err);
  }
};

export const processFunctionCall2 = async (wallet, functionName, inputs, contract, provider) => {
  const isPayable = Object.prototype.hasOwnProperty.call(inputs, 'payable');
  if (isPayable) {
    executePayableMethod(wallet, functionName, inputs, contract, provider);
  } else {
    executeMethod(wallet, functionName, inputs, contract, provider);
  }
};

