import Config from 'react-native-config';

const ethers = require('ethers');

const getNetworkProvider = async (network) => {
  const provider = await new ethers.providers.InfuraProvider(network, Config.INFURA_API_KEY);
  return provider;
};

export default getNetworkProvider;
