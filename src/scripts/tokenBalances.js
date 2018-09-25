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
  console.log(privateKey, dataSet, dataSet.length);
  for (let i = 0; i < dataSet.length; i++) {
    let tokenObj = {};
    // let keys = Object.keys(dataSet[i]);    
    tokenObj.symbol = dataSet[i].symbol;
    if (dataSet[i].contractAddress === '') {
      await this.getEthereumBalance(wallet.address)
        .then((response) => {
          console.log('eth response', response);
          tokenObj.amount = response;
          allBalances.push(tokenObj);
          tokenApiRequestString += `${dataSet[i].symbol}`;  
          if (i < dataSet.length - 1) tokenApiRequestString += ','; 
        });
    } else {
      let contractAddress = dataSet[i].contractAddress;
      await this.getERC20Balance(contractAddress)
        .then((response) => {
          console.log('eth response', response);
          tokenObj.amount = response;
          allBalances.push(tokenObj);
          tokenApiRequestString += `${dataSet[i].symbol}`;  
          if (i < dataSet.length - 1) tokenApiRequestString += ','; 
        });
    }
  }
  console.log('token string', tokenApiRequestString);
  console.log('all balance length', allBalances.length);
  return allBalances;
};

getEthereumBalance = async () => {
  const balance = await provider.getBalance(wallet.address);
  const parsedEtherBalance = String(ethers.utils.formatEther(balance));
  console.log('Ethereum Balance', parsedEtherBalance);
  return parsedEtherBalance;
};

getERC20Balance = async (contractAdd) => {
  console.log('contract address', contractAdd);
  const contract = new ethers.Contract(contractAdd, ERC20ABI, provider);
  const tokenBalance = await contract.balanceOf(wallet.address);
  const parsedTokenBalance = String(tokenBalance);
  console.log('Token Balance', parsedTokenBalance);
  return parsedTokenBalance;
}

export default processAllTokenBalances;
