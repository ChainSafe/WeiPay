const ethers = require('ethers');
const axios = require('axios');

var  provider = ethers.providers.getDefaultProvider("ropsten");
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

export const processContractByAddress = async (wallet, address) => {
  await getContractAbi(address);
  //var provider = ethers.providers.getDefaultProvider("ropsten");
  let abiParsed = JSON.parse(abi);
  let cWallet = wallet;
  const initializedWallet = new ethers.Wallet(cWallet.privateKey, provider);
  try {
    let contract = await new ethers.Contract(address, abiParsed, initializedWallet);
    let contractEvents = contract.interface.events;
    let contractFunctions = contract.interface.functions;
    
    return { contractFunctions, contractEvents, contract };
  } catch (err) {
    console.log(err);
  }
};

export const processFunctionCall2 = async (wallet, functionName, inputs, contract) => {
  let cWallet = wallet;
  const initializedWallet = new ethers.Wallet(cWallet.privateKey, provider);
  
  try {
    const args = Object.values(inputs);
    const contractWithSigner = contract.connect(initializedWallet);
    if (args.length == 0) {
      let tx = await contract["functions"][functionName]();
      console.log("Call went through");
      console.log(tx);
      console.log("---------000---------------");
    }else {
      const call = "contractWithSigner['functions'][functionName](" + args.toString() + ")";
      console.log(call);
      await eval(call);
      // await contractWithSigner['functions']["setNewMessageNumber"].value(0.001)("Transaction", 69);
      console.log("Call went through");
      console.log("---------000---------------");
    
    }

  } catch (err) {
    console.log("Didnt go through");
    
    console.log(err);
  }
  
};

