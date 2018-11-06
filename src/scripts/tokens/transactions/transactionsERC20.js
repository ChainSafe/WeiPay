// import { checkMaliciousAddresses } from '../../maliciousCheck/';
import ERC20ABI from '../../../constants/data/json/ERC20ABI.json';
const ethers = require('ethers');

const utils = ethers.utils;

/**
 * TODO 1)malicious check 2) regex expression check
 */
const executeERC20Transaction = async (provider, to, privateKey, value, contractAddress) => {
  const initializedWallet = new ethers.Wallet(privateKey, provider);
  const amountString = value.toString();
  const testTo = '0x03B96bd08E820fE853339fa84F8F25818ce7346a';
  try {
    const amount = ethers.utils.parseEther(amountString);
    const transactionCountPromise = initializedWallet.getTransactionCount();
    const count = await transactionCountPromise;
    const contract = new ethers.Contract('0x6Ac15feFB151bC0742d40A13B3d8c1848229d939', ERC20ABI, initializedWallet);
    const overrideOptions = {
      gasLimit: 150000,
      gasPrice: 9000000000,
      nonce: count,
    };
    const sendPromise = contract.functions.transfer(testTo, amount, overrideOptions);
    sendPromise.then((transaction) => {
      console.log(transaction.hash);
    });
  } catch (error) {
    console.log('Didnt Go through');
  }
};

export default executeERC20Transaction;


