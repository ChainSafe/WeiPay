const ethers = require('ethers');
const axios = require('axios');
//const provider = require('../../constants/Providers');

let abi;

getContractAbi = async (contractAddress) => { 
  await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`)
    .then((res) => {
      console.log('response', contractAddress);
      console.log('data', res.data);
      abi = res.data.result;
    })
    .catch((err) => {
      console.log(err);
    });
};

const processContractByAddress = async (wallet, address) => {

  await getContractAbi(address);
  var  provider = ethers.providers.getDefaultProvider("homestead");
  console.log('after function call');
  let abix = JSON.parse(abi);
  console.log(abix);
  let cWallet = wallet;
  const shimwallet = new ethers.Wallet(cWallet.privateKey, provider);
  console.log(shimwallet);
  try {
    // debugger
    let contract = new ethers.Contract(address, abix, shimwallet);
    console.log(contract);
  } catch (err) {
    console.log(err);
  }
};

export default processContractByAddress;
