import Config from 'react-native-config';

const ethers = require('ethers');

const provider = new ethers.providers.InfuraProvider('ropsten', Config.INFURA_API_KEY);

export default provider;
