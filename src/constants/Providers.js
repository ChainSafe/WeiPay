import Config from 'react-native-config';

const ethers = require('ethers');

const provider = new ethers.providers.InfuraProvider('mainnet', Config.INFURA_API_KEY);

export default provider;
