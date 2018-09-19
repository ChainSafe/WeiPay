//import Config from 'react-native-config';

const ethers = require('ethers');

// const provider = new ethers.providers.InfuraProvider('ropsten', Config.INFURA_API_KEY);
const provider = new ethers.providers.InfuraProvider('mainnet', 'O8UtwLH2uVXXIu89dieJ');

export default provider;
