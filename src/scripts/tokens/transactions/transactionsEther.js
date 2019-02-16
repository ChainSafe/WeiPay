const ethers = require('ethers');

const executeEtherTransaction = async (provider, to, privateKey, value) => {
  const initializedWallet = new ethers.Wallet(privateKey, provider);
  const amountString = value.toString();
  const amount = ethers.utils.parseEther(amountString);
  const sendPromise = initializedWallet.send(to, amount);
  return sendPromise.then((transactionHash) => {
    console.log(transactionHash);
    return transactionHash;
  }).catch(err => {
		console.log(err);
		return null;
	});
};

export default executeEtherTransaction;
