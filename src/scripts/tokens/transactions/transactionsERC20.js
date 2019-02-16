import ERC20ABI from '../../../constants/data/json/ERC20ABI.json';

const ethers = require('ethers');

const utils = ethers.utils;

const executeERC20Transaction = async (provider, to, privateKey, value, contractAddress, decimals) => {
	try {
		const initializedWallet = new ethers.Wallet(privateKey, provider);
		const amountString = value.toString();
		const numberOfTokens = ethers.utils.parseUnits(amountString, decimals);
		const transactionCountPromise = initializedWallet.getTransactionCount();
		const count = await transactionCountPromise;
		const contract = new ethers.Contract(contractAddress, ERC20ABI, initializedWallet);
		const overrideOptions = {
			gasLimit: 150000,
			gasPrice: 9000000000,
			nonce: count,
		};
		const sendPromise = contract.functions.transfer(to, numberOfTokens, overrideOptions);
		return sendPromise.then((transaction) => {
			// console.log(transaction.hash);
			return transaction;
		}).catch(err => {
			console.log(err);
			return null;
		});
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default executeERC20Transaction;


