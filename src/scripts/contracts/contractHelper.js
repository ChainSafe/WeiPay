const ethers = require('ethers');
const axios = require('axios');

let abi;

getContractAbi = async (contractAddress) => { 
  await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`)
    .then((res) => {    
      abi = res.data.result;
    })
    .catch((err) => {
      console.log(err);
    });
};

const processContractByAddress = async (wallet, address) => {
  await getContractAbi(address);
  var  provider = ethers.providers.getDefaultProvider("ropsten");
  let abiParsed = JSON.parse(abi);
  let cWallet = wallet;
  const initializedWallet = new ethers.Wallet(cWallet.privateKey, provider);
  try {
    let contract = await new ethers.Contract(address, abiParsed, initializedWallet);
    let contractEvents = contract.interface.events;
    let contractFunctions = contract.interface.functions;
    return { contractFunctions, contractEvents };
  } catch (err) {
    console.log(err);
  }
};

export default processContractByAddress;
