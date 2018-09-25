/**
 * All tokens/coins the user has will be passed in and an array of balances will be returned.
 * Delegate Ethereum and ERC20 token balance lookup here. 
 */

import provider from '../constants/Providers';
import ERC20ABI from '../constants/data/json/ERC20ABI.json';

const ethers = require('ethers');

/**
 * private key
 * dataSet[0] -> your Eth holdings
 * dataset[1+] -> any additional tokens
 */

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
