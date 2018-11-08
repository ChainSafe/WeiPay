const ethers = require('ethers');

const utils = ethers.utils;

const executeEtherTransaction = async (provider, to, privateKey, value) => {
  const initializedWallet = new ethers.Wallet(privateKey, provider);
  const amountString = value.toString();
  const testTo = '0x03B96bd08E820fE853339fa84F8F25818ce7346a';
  const amount = ethers.utils.parseEther(amountString);
  const sendPromise = initializedWallet.send(testTo, amount);
  sendPromise.then((transactionHash) => {
    console.log(transactionHash);
    provider.getBalance(initializedWallet.address).then(function (balance) {
      const etherString = utils.formatEther(balance);
      console.log(`currentWallet Balance: ${etherString}`);
    });
  });
};

export default executeEtherTransaction;
