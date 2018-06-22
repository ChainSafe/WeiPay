/*
    Return provider here for local testprc
    var ethers = require('ethers');
    var providers = ethers.providers;
    provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
*/

var ethers = require('ethers');
const provider = new ethers.providers.InfuraProvider('ropsten', "O8UtwLH2uVXXIu89dieJ");

export default provider;