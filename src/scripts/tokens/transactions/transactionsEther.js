const ethers = require('ethers');

const executeEtherTransaction = async (provider, to, privateKey, value) => {
  const initializedWallet = new ethers.Wallet(privateKey, provider);
  const amountString = value.toString();
  const amount = ethers.utils.parseEther(amountString);
  const sendPromise = initializedWallet.send(to, amount);
  return sendPromise.then((transactionHash, err) => {
    console.log(transactionHash);
		console.log(err);
    return transactionHash;
  });
};

export default executeEtherTransaction;
