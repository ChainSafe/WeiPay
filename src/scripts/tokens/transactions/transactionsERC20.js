import ERC20ABI from '../../../constants/data/json/ERC20ABI.json';

const ethers = require('ethers');

const utils = ethers.utils;

const executeERC20Transaction = async (provider, to, privateKey, value, contractAddress) => {
  const initializedWallet = new ethers.Wallet(privateKey, provider);
  const amountString = value.toString();
  try {
    const amount = ethers.utils.parseEther(amountString);
    const transactionCountPromise = initializedWallet.getTransactionCount();
    const count = await transactionCountPromise;
    const contract = new ethers.Contract(contractAddress, ERC20ABI, initializedWallet);
    const overrideOptions = {
      gasLimit: 150000,
      gasPrice: 9000000000,
      nonce: count,
    };
    const sendPromise = contract.functions.transfer(to, amount, overrideOptions);
    sendPromise.then((transaction) => {
      console.log(transaction.hash);
    });
  } catch (error) {
    console.log('Didnt Go through');
  }
};

export default executeERC20Transaction;


