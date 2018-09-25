/**
 * All tokens/coins the user has will be passed in and an array of balances will be returned.
 * Delegate Ethereum and ERC20 token balance lookup here. 
 * The 0 index will be the user's eth -> corresponds to index in the tokens array in the wallet reducer.
 * Any subsequent coins will have an index of 1 or greater, unless they have removed ether from their wallet.
 * This use case will be address in a subsequent branch.
 */

import provider from '../constants/Providers';
import ERC20ABI from '../constants/data/json/ERC20ABI.json';

const ethers = require('ethers');

const processAllTokenBalances = async (privateKey, dataSet) => {
  console.log(privateKey, dataSet);
  const wallet = new ethers.Wallet(privateKey);
  wallet.provider = provider;

  let tokenHoldings = [];

  for(let i = 0; i < dataSet.length; i++) {
    switch (i) {
      case 0:                
        const balance = await provider.getBalance(wallet.address);
        const parsedEtherBalance = String(ethers.utils.formatEther(balance));        
        const key = Object.keys(dataSet[i]);     
        let ethObj = {};
        ethObj.type = key[0];
        ethObj.amount = parsedEtherBalance           
        tokenHoldings.push(ethObj); 
        break;
      default: 
        const contract = new ethers.Contract(token.address, ERC20ABI, Provider);       
        const tokenBalance = await contract.balanceOf(currentWallet.address);  
        console.log(String(tokenBalance));           
    }
  }
  return tokenHoldings; 
};

export default processAllTokenBalances;
