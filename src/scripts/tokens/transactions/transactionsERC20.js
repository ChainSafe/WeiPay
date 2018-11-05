const executeERC20Transaction = async () => {

    this.setState({ maliciousCheck: false });
    const response = await this.checkMaliciousAddresses(this.state.toAddress);
const provider = await getNetworkProvider(this.props.network);  
if (response.flag) {
    this.setState({ maliciousCheck: true });
} else {
    this.setState({ maliciousCheck: true });
    const initializedWallet = new ethers.Wallet(this.props.wallet.privateKey, provider);
    const transactionCountPromise = initializedWallet.getTransactionCount();
    const count = await transactionCountPromise;
    const val = this.state.value;
    const toAddr = this.state.toAddress;
    if (this.state.validAddress.exec(toAddr) == null){
    return 1;
    }
    const contract = new ethers.Contract(this.props.token.address, ERC20ABI, initializedWallet);
    const overrideOptions = {
    gasLimit: 150000,
    gasPrice: 9000000000,
    nonce: count,
    };
    try {
    const sendPromise = contract.functions.transfer(toAddr, val, overrideOptions);
    sendPromise.then((transaction) => {
        console.log(transaction.hash);
        this.setState({ txHash: transaction.hash });
        this.openModal();
    });
    } catch (error) {
    console.log('Didnt Go through');
    }
  }
}

  export default 