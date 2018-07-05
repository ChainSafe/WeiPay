/*
    Return provider here for local testprc
    var ethers = require('ethers');
    var providers = ethers.providers;
    provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
*/

/**
 * Provider is required to create an abstract connection between the wallet and the ethereum blockchain
 * Exporting a provider that is connected to the ropsten testnet via Infura
 */
const ethers = require('ethers');
const provider = new ethers.providers.InfuraProvider('ropsten', "O8UtwLH2uVXXIu89dieJ");

export default provider;