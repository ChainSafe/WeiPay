import { checkMaliciousAddresses } from '../../maliciousCheck/';

const ethers = require('ethers');

const utils = ethers.utils;

/**
 * TODO 1)malicious check 2) regex expression check
 */
const executeEtherTransaction = async (provider, to, privateKey, value) => {
  const validAddress = new RegExp('0x[0-9a-fA-F]{40}');
  const initializedWallet = new ethers.Wallet(privateKey, provider);
  const amountString = value.toString();
  const testTo = '0x03B96bd08E820fE853339fa84F8F25818ce7346a';
  const amount = ethers.utils.parseEther(amountString);
  const sendPromise = initializedWallet.send(testTo, amount);
  sendPromise.then((transactionHash) => {
    console.log(transactionHash);
    provider.getBalance(initializedWallet.address).then(function (balance) {
        const etherString = utils.formatEther(balance);
        console.log(`currentWallet Balance: ${ etherString}`);
    });
  });
}

export default executeEtherTransaction;


