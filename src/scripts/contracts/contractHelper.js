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
      console.log(abi);
      
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
    console.log("------------");
    console.log(contract.functions);
    console.log("------------");
    
    
    return { contractFunctions, contractEvents, contract };
  } catch (err) {
    console.log(err);
  }
};

/*
  Wallet
  function name
  all the parameters for that function
  Contract.

*/
export const processFunctionCall = async (wallet, inputs, contract) => {
  console.log("In function Call");  
  let cWallet = wallet;
  const initializedWallet = new ethers.Wallet(cWallet.privateKey, provider);
  // debugger
  try {
    
    
    const funcName = inputs["funcName"].substring(0,inputs["funcName"].indexOf("(")); 
    console.log(funcNme);
    
    const contractWithSigner = contract.connect(initializedWallet);
    await contractWithSigner["functions"][funcName](inputs["input"]);
    let tx = await contractWithSigner["functions"]["getMessage"]();
    console.log("Call went through");
    console.log(tx);
    console.log("---------000---------------");
    
  } catch (err) {
    console.log("Didnt go through");
    
    console.log(err);
  }
  


};

