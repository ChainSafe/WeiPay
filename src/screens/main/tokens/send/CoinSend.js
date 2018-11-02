import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView, TouchableWithoutFeedback, Dimensions, Keyboard, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';
import * as action from '../../../../actions/ActionCreator';
//import provider from '../../../../constants/Providers';
import getNetworkProvider from '../../../../constants/Providers';
import ERC20ABI from '../../../../constants/data/json/ERC20ABI.json';
import LinearButton from '../../../../components/linearGradient/LinearButton';
import ClearButton from '../../../../components/linearGradient/ClearButton';
import BoxShadowCard from '../../../../components/shadowCards/BoxShadowCard';
import MaliciousAddresses from '../../../../constants/data/json/addresses_darklist.json';

const ethers = require('ethers');

const utils = ethers.utils;

class CoinSend extends Component {
  constructor(props) {
    super(props);
    const addressFromQRCode = this.props.addressData;
    this.state = {
      toAddress: addressFromQRCode,
      value: 0,
      resetInput: false,
      inputValue: addressFromQRCode,
      txnFee: this.props.txnFee,
      maliciousCheck: true,
      maliciousComment: '',
      sendButtonEnabled: false,
      validAddress: new RegExp('0x[0-9a-fA-F]{40}'),
      valid: false,
    };
  }

  /**
   * Sets the address to which the coin/tokens are being sent to
   * @param {String} addressInput
   */
  renderAddress(addressInput) {
    let add = addressInput.trim();
    this.setState({ inputValue: add, toAddress: add });
    this.props.getQRCodeData(addressInput);
    if (this.state.validAddress.exec(addressInput) == null){
      this.setState({valid: false})
    }else {
      this.setState({valid: true})

    }
  }

  /**
   * Error checks the value inputted to be sent. Sets the Value to 0 if the value input is
   * either lower than 0 or is not a number
   * @param {String} valueInput
   */
  renderValue(valueInput) {
    if (!isNaN(valueInput)) {
      if (valueInput < 0) {
        Alert.alert(
          'Invalid Ether Amount',
          'Please enter an amount greater than 0.',
          [
            { text: 'OK', onPress: () => { return console.log('OK Pressed')} },
          ],
          { cancelable: false },
        );
      } else {
        console.log(`is a number ${valueInput}`);
        this.setState({ value: valueInput });
      }
    } else {
      console.log(`not a number ${valueInput}`);
      this.setState({ value: 0 });
    }
  }

  /*
     this.props.wallet is either the recovered wallet or new wallet, in either case we have sent 5 ether in the constructor
     to this wallet by using a testrpc private key. If we are recvoering a wallet, this does nothing, but if we are creating
     a new wallet, we will never have funds in our test environemnt, so this is just a test setup.
   */

  /**
   * Conducts the transction between the two addresses
   */
  sendTransaction = async () => {
    this.setState({ maliciousCheck: false });
    const response = await this.checkMaliciousAddresses(this.state.toAddress);
    const provider = await getNetworkProvider(this.props.network);    
    if (response.flag) {
      this.setState({ maliciousCheck: true });
    } else {
      this.setState({ maliciousCheck: true });
      const initializedWallet = new ethers.Wallet(this.props.wallet.privateKey, provider);
      const amountString = this.state.value.toString();
      const receivingAddress = this.state.toAddress;
      if (this.state.validAddress.exec(receivingAddress) == null){
        return 1;
      }
      const amount = ethers.utils.parseEther(amountString);
      const sendPromise = initializedWallet.send(receivingAddress, amount);
      sendPromise.then((transactionHash) => {
        console.log(transactionHash);
        provider.getBalance(initializedWallet.address).then(function (balance) {
          const etherString = utils.formatEther(balance);
          console.log('currentWallet Balance: ' + etherString);
        });
        provider.getBalance(receivingAddress).then(function (balance) {
          const etherString = utils.formatEther(balance);
          console.log('receiving account Balance: ' + etherString);
        });
      });
    }
  }

  sendERC20Transaction = async () => {
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

  checkMaliciousAddresses = (address) => {
    for (var i = 0; i < MaliciousAddresses.length; i++) {
      if (address === MaliciousAddresses[i].address) {
        this.setState({ maliciousComment:  MaliciousAddresses[i].comment })
        return { flag: true, 'address' : MaliciousAddresses[i].address, 'comment' : MaliciousAddresses[i].comment };
      }
    }
    return { flag: false };
  }

  getTxnFee = async () => {
    const provider = await getNetworkProvider(this.props.network);  
    try {
      let gasPriceString = await provider.getGasPrice().then((gasPrice) => {
        gasPriceString = gasPrice.toString();
        const gasPriceEth = utils.formatEther(gasPrice);
        const txnFee = 21000 * gasPriceEth;
        return txnFee;
      });
      await this.props.updateTxnFee(gasPriceString);
      await this.setState({ txnFee: gasPriceString })
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Is used to reset the input fields
   */
  resetFields = () => {
    this.inputAddress.clearText();
    this.inputAmount.clearText();
  }

  /**
   * Navigator
   * Is used to navigate to the Qr-Code scanner
   */
  navigate = () => {
    this.props.qrScannerInvoker('TokenFunctionality');
    this.props.qrScannerCoinInvoker(this.props.token.symbol);
    const navigateToQRScanner = NavigationActions.navigate({
      routeName: 'QCodeScanner',
      params: { name: 'Shubhnik', invoker: 'CoinSend' },
    });
    this.props.navigation.dispatch(navigateToQRScanner);
  };

  /**
   * Main Component Function
   * Returns the complete form required to send a transaction
   */
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.mainContainer,  this.state.maliciousCheck ? { backgroundColor: '#fafbfe' } : { backgroundColor: 'black' }]}>
            <View style={[styles.boxShadowContainer, this.state.maliciousCheck ? null : { backgroundColor: 'black' }]}>
              <View style={[styles.contentContainer, this.state.maliciousCheck ? null : { backgroundColor: 'black' }]}>
                {
                   this.state.maliciousCheck ?
                   <BoxShadowCard>
                      <Text style={styles.cardText}>
                        Send Ether by scanning someone's QR code or public address.
                      </Text>
                      <View style= {styles.barcodeImageContainer}>
                        <TouchableOpacity
                          onPress= {() => {return this.navigate()}} >
                          <Image
                            source={require('../../../../assets/icons/barcode.png')}
                            style={styles.barcodeImage}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.inputContainer}>
                        {
                          this.state.maliciousComment != '' ?
                            <Text style={styles.maliciousCommentText}>Malicious - {this.state.maliciousComment} </Text>
                            : null
                        }
                        <View style={[styles.formInputContainer]}>
                            <FormInput
                              placeholder={'Public Address'}
                              onChangeText={this.renderAddress.bind(this)}
                              ref={ref => {return this.inputAddress = ref}}
                              inputStyle={[styles.formAddress,this.state.valid? {color: 'green'} : {color: 'red'}] }
                              value={this.state.inputValue}
                            />
                          </View>
                          <View style={styles.formInputContainer}>
                            <FormInput
                              placeholder={'Amount'}
                              onChangeText={this.renderValue.bind(this)}
                              ref={ref => {return this.inputAmount = ref}}
                              inputStyle={styles.formAmount}
                            />
                          </View>
                          <Text style={styles.displayFeeText} >
                            Transaction Fee Total {this.state.txnFee} Eth
                          </Text>
                      </View>
                    </BoxShadowCard>
                     :
                  <View style={styles.activityContainer}>
                    <View style={styles.activityHorizontal}>
                      <Text style={styles.warningText}>Checking value for known malicious addresses. </Text>
                      <ActivityIndicator size="large" color="#12c1a2" />
                    </View>
                  </View>
                }
              </View>
            </View>
            {
               this.state.maliciousCheck ?
               <View style={styles.btnContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <ClearButton
                        onClickFunction={this.resetFields}
                        buttonText="Reset"
                        customStyles={{ marginLeft: '0%', marginRight: '1.75%', height: Dimensions.get('window').height * 0.082 }}
                        // buttonStateEnabled={this.state.buttonDisabled}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <LinearButton
                        onClickFunction={
                          this.props.token.address !== '' ? this.sendERC20Transaction : this.sendTransaction
                        }
                        buttonText="Send"
                        customStyles={{ marginLeft: '0%', marginLeft: '1.75%', height: Dimensions.get('window').height * 0.082 }}
                        buttonStateEnabled={this.state.sendButtonEnabled}
                      />
                    </View>
                  </View>
                  <View style={styles.footerGrandparentContainer}>
                    <View style={styles.footerParentContainer} >
                      <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                    </View>
                  </View>
                </View>
                 : null
            }
          </View>
        </TouchableWithoutFeedback>
       </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  navContainer: {
    flex: 0.65,
  },
  navHeaderContainer: {
    flex: 0.3,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    justifyContent: 'center',
    width: '100%',
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  activityHorizontal: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  warningText: {
    color: 'white',
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Light',
    letterSpacing: 0.4,
    paddingBottom: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  maliciousCommentText: {
    color: 'red',
    fontSize: RF(2.1),
    marginLeft: '5%',
  },
  boxShadowContainer: {
    alignItems: 'center',
    marginTop: '10%',
    flex: 3.75,
    width: '100%',
  },
  contentContainer: {
    width: '82%',
    flex: 1,
  },
  cardText: {
    paddingBottom: '5%',
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'WorkSans-Light',
    fontSize: RF(2.4),
    color: '#000000',
    letterSpacing: 0.4,
  },
  barcodeImageContainer: {
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingLeft: '10%',
  },
  barcodeImage: {
    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.18,
  },
  formAmount: {
    width: '90%',
    fontSize: RF(2.2),
    color: '#12c1a2',
    flexWrap: 'wrap',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
  },
  formAddress: {
    width: '90%',
    fontSize: RF(2.2),
    color: '#12c1a2',
    flexWrap: 'wrap',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    paddingBottom: '3%',
  },
  displayFeeText: {
    width: '90%',
    marginLeft: '10.5%',
    fontSize: RF(1.4),
    letterSpacing: 0.3,
    fontFamily: 'WorkSans-Light',
    marginTop: '2%',
  },
  formInputContainer: {
    marginLeft: '4.5%',
  },
  btnContainer: {
    flex: 1.25,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '82%',
    alignContent: 'center',
    marginLeft: '9%',
    marginRight: '9%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '5%',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(1.7),
    color: '#c0c0c0',
    letterSpacing: 0.5,
  },

});

const mapStateToProps = ({ Wallet, HotWallet, newWallet, contacts }) => {
  return {
    tokenData: Wallet.activeTokenData,
    wallet: HotWallet.hotWallet.wallet,
    addressData: newWallet.QrData,
    token: Wallet.activeTokenData,
    txnFee: newWallet.txnFee,
    contactAddress: contacts.contactDataforCoinSend,
    network: Wallet.network,
  };
};
export default connect(mapStateToProps, action)(CoinSend);
