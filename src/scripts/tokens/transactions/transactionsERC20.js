import ERC20ABI from '../../../constants/data/json/ERC20ABI.json';

const ethers = require('ethers');

const utils = ethers.utils;

const executeERC20Transaction = async (provider, to, privateKey, value, contractAddress) => {
  console.log('inside call');
  const initializedWallet = new ethers.Wallet(privateKey, provider);
  console.log({ initializedWallet });
  const amountString = value.toString();
  console.log({ amountString });
  try {
    const amount = ethers.utils.parseEther(amountString);
    console.log({ amount });
    const transactionCountPromise = initializedWallet.getTransactionCount();
    const count = await transactionCountPromise;
    console.log({ count });
    const contract = new ethers.Contract(contractAddress, ERC20ABI, initializedWallet);
    const overrideOptions = {
      gasLimit: 150000,
      gasPrice: 9000000000,
      nonce: count,
    };
    const sendPromise = contract.functions.transfer(to, amount, overrideOptions);
    console.log({ sendPromise });
    return sendPromise.then((transaction) => {
      console.log(transaction.hash);
      return transaction;
    });
  } catch (error) {
    console.log('Didnt Go through');
  }
};

export default executeERC20Transaction;


