const ethers = require('ethers');
const axios = require('axios');

var  provider = ethers.providers.getDefaultProvider('ropsten');
let abi;

getContractAbi = async (contractAddress) => { 
  // await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`)
  //   .then((res) => {    
  //     abi = res.data.result;
  //     console.log(abi);
      
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  await axios.get(`https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`)
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
}

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
}

const getFunctionInputs = (interfaceFunctions, formattedFunctions) => {
  let functionsWithInputs = [];
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
          functionInputs.push(inputObj);
        }
       functionObject.inputs = functionInputs;
      }
    }
    functionsWithInputs.push(functionObject);
  }
  return functionsWithInputs;
}

export const processContractByAddress = async (wallet, address) => {
  await this.getContractAbi(address);
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

    var payableFunctions = [];
    uniqueX.forEach(element => {
      if(contractFunctions[element]['payable']) {
        payableFunctions.push(element);
      }
    });  
    return { contractFunctions, contractEvents, contract, payableFunctions };
  } catch (err) {
    console.log(err);
  }
};

export const processFunctionCall2 = async (wallet, functionName, inputs, contract) => {
  let cWallet = wallet;
  const initializedWallet = new ethers.Wallet(cWallet.privateKey, provider);
  console.log({ wallet, functionName, inputs, contract });

  try {
    const args = Object.values(inputs);
    const contractWithSigner = contract.connect(initializedWallet);
    if (args.length == 0) {
      let tx = await contract['functions'][functionName]();
      console.log('Call went through');
      console.log(tx);
      console.log('---------000---------------');
    } else {
      const transactionCountPromise = initializedWallet.getTransactionCount();
      const wei = ethers.utils.parseEther('0.002');
      const ether = ethers.utils.formatEther(wei);
      const count = await transactionCountPromise;
      const overrideOptions = {
        gasLimit: 250000,
        gasPrice: 9000000000,
        nonce: count,
        value: ethers.utils.parseEther('0.002'),
      };
      const call = "contractWithSigner['functions'][functionName](" + args.toString() + ',' + 'overrideOptions' + ')';
      console.log(call);
      await eval(call);
      console.log('Call went through');
      console.log('---------000---------------');
    }
  } catch (err) {
    console.log('Didnt go through');
    
    console.log(err);
  }
  
};

