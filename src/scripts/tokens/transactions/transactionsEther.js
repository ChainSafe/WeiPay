import { checkMaliciousAddresses } from '../../maliciousCheck/';

const ethers = require('ethers');

const utils = ethers.utils;

const executeEtherTransaction = async (provider, to, privateKey, value) => {

   const maliciousResult = checkMaliciousAddresses(to);
   console.log({maliciousResult});
   console.log({ provider, to, privateKey, value });
   


    // this.setState({ maliciousCheck: false });
    // const response = await this.checkMaliciousAddresses(this.state.toAddress);
    // const provider = await getNetworkProvider(this.props.network);    
    // if (response.flag) {
    //   this.setState({ maliciousCheck: true });
    // } else {
    //   this.setState({ maliciousCheck: true });
    //   const initializedWallet = new ethers.Wallet(this.props.wallet.privateKey, provider);
    //   const amountString = this.state.value.toString();
    //   const receivingAddress = this.state.toAddress;
    //   if (this.state.validAddress.exec(receivingAddress) == null){
    //     return 1;
    //   }
    //   const amount = ethers.utils.parseEther(amountString);
    //   const sendPromise = initializedWallet.send(receivingAddress, amount);
    //   sendPromise.then((transactionHash) => {
    //     console.log(transactionHash);
    //     provider.getBalance(initializedWallet.address).then(function (balance) {
    //       const etherString = utils.formatEther(balance);
    //       console.log('currentWallet Balance: ' + etherString);
    //     });
    //     provider.getBalance(receivingAddress).then(function (balance) {
    //       const etherString = utils.formatEther(balance);
    //       console.log('receiving account Balance: ' + etherString);
    //     });
    //   });
    // }

  }

  export default executeEtherTransaction;


