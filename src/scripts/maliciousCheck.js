import MaliciousAddresses from '../constants/data/json/addresses_darklist.json';

const checkMaliciousAddresses = (address) => {
  for (let i = 0; i < MaliciousAddresses.length; i++) {
    if (address === MaliciousAddresses[i].address) {
      // this.setState({ maliciousComment:  MaliciousAddresses[i].comment })
      return { flag: true, 'address' : MaliciousAddresses[i].address, 'comment' : MaliciousAddresses[i].comment };
    }
  }
  return { flag: false };
}

export default checkMaliciousAddresses;