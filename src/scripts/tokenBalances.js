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
let wallet;

const processAllTokenBalances = async (privateKey, dataSet) => {
  let allBalances = [];
  let tokenApiRequestString = '';
  wallet = new ethers.Wallet(privateKey);
  wallet.provider = provider;
  for (let i = 0; i < dataSet.length; i++) {
    let tokenObj = {};
    tokenObj.symbol = dataSet[i].symbol;
    if (dataSet[i].contractAddress === '') {
      await this.getEthereumBalance(wallet.address)
        .then((response) => {
          tokenObj.amount = Number(response).toFixed(4);
          allBalances.push(tokenObj);
          tokenApiRequestString += `${dataSet[i].symbol}`;  
          if (i < dataSet.length - 1) tokenApiRequestString += ',';
        })
        .catch((err) => {
          tokenObj.amount = 0;
          allBalances.push(tokenObj);
        });
    } else {
      let contractAddress = dataSet[i].contractAddress;
      await this.getERC20Balance(contractAddress, dataSet[i].decimals)
        .then((response) => {
          tokenObj.amount = Number(response).toFixed(4);
          allBalances.push(tokenObj);
          tokenApiRequestString += `${dataSet[i].symbol}`;  
          if (i < dataSet.length - 1) tokenApiRequestString += ','; 
        })
        .catch((err) => {
          tokenObj.amount = 0;
          allBalances.push(tokenObj);
        });
    }
  }
  return { 'tokenSymbolString' : tokenApiRequestString, 'tokenBalances' : allBalances };
};

formatBalance = (balance, decimals) => {
  const x = Math.pow(10, decimals);
  if(decimals === 0) {
    return balance;
  }
  return (balance / x);
};

getEthereumBalance = async () => {
  const balance = await provider.getBalance(wallet.address);
  const parsedEtherBalance = String(ethers.utils.formatEther(balance));
  return parsedEtherBalance;
};

getERC20Balance = async (contractAdd, decimals) => {
  const contract = new ethers.Contract(contractAdd, ERC20ABI, provider);
  const tokenBalance = await contract.balanceOf(wallet.address);  
  const parsedTokenBalance = String(tokenBalance);
  const adjustedTokenValue = formatBalance(parsedTokenBalance, decimals);  
  return adjustedTokenValue;
};

export default processAllTokenBalances;
