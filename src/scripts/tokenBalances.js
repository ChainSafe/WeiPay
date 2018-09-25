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
  let tokenSymbolString = '';

  console.log(dataSet.length);
  
  for(let i = 0; i < dataSet.length; i++) {
    
    let key;
    switch (i) {
      case 0:                
        const balance = await provider.getBalance(wallet.address);
        const parsedEtherBalance = String(ethers.utils.formatEther(balance));        
        key = Object.keys(dataSet[i]);    
        console.log("key", key);         
        let ethObj = {};
        ethObj.type = key[0];
        ethObj.amount = parsedEtherBalance;        
        tokenSymbolString += `${key[0]}`;   
        if (dataSet.length > 1) tokenSymbolString += ',';
        tokenHoldings.push(ethObj);
        break;
      default: 
        key = Object.keys(dataSet[i]);    
        const contract = new ethers.Contract(key[1], ERC20ABI, provider); //key[1] is contract address
        const tokenBalance = await contract.balanceOf(wallet.address); 
        key = Object.keys(dataSet[i]);  
        console.log("token key 1", key[1]);        
        let tokenObj = {};
        tokenObj.type = key[0];
        tokenObj.amount = parsedEtherBalance;   
        tokenSymbolString += `${key[0]}`;   
        if (i < dataSet.length - 1) tokenSymbolString += ',';
        console.log(String(tokenBalance));           
    }
  }
  return { tokenHoldings, tokenSymbolString };
};

export default processAllTokenBalances;
