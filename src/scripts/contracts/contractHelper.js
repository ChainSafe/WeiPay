const ethers = require('ethers');
const axios = require('axios');
const provider = require('../../constants/Providers');

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
  console.log('after function call');
  console.log(abi);

  console.log('wallet', wallet);
  let cWallet = wallet;
  cWallet.provider = provider;
  
  try {
    // let abix = JSON.stringify(abi, null, 2)
    let contract = new ethers.Contract(address, abi, provider);
    console.log(contract);
  } catch (err) {
    console.log(err);
  } 
};

export default processContractByAddress;
