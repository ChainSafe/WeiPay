import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, Button, Card } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { getQRCodeData, addTokenInfo } from '../../../../actions/ActionCreator';
import provider from '../../../../constants/Providers';
import { qrScannerInvoker } from '../../../../actions/ActionCreator'
import CoinSendTabNavigator from '../../../../components/customPageNavs/CoinSendTabNavigator'
import ERC20ABI from '../../../../constants/data/json/ERC20ABI.json';
import LinearButton from '../../../../components/LinearGradient/LinearButton';
import ClearButton from '../../../../components/LinearGradient/ClearButton'
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../../components/ShadowCards/BoxShadowCard';
import RF from "react-native-responsive-fontsize"

const ethers = require('ethers');
const utils = ethers.utils;

/**
 * React Component
 * Screen used to conduct negative transactions (sending coins/tokens)
 */
class CoinSend extends Component {

  /**
   * Initializes State to keep track of the
   * value that is being sent, the address the value is being sent to,
   * and the default value.
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      toAddress: '',
      value: 0,
      resetInput: false,
      inputValue: ''
    }

    /**
     * Using the Provider (which is connected to the ethereum network) to get the wallet balance and
     * checks if the wallet has funds available to be sent
     */
    // provider.getBalance(this.props.wallet.address).then(function (balance) {
    //   const etherString = utils.formatEther(balance);
    //   console.log('Current Wallet Balance' + etherString);
    //   if (etherString == 0) {
    //     Alert.alert(
    //       'No Ether Alert',
    //       'You need to uncomment the code in the constructor and change the private key to one from your local testrpc to fund this account.',
    //       [
    //         { text: 'OK', onPress: () => console.log('OK Pressed') },
    //       ],
    //       { cancelable: false }
    //     )
    //   }
    // });
  }

  /**
   * LifeCycle Method
   * Executes before the Component has been rendered
   * Sets the state to the hold the wallet address
   */
  componentWillMount() {
    if (this.props.navigation.state.params) {
      let contactAddress = this.props.navigation.state.params.address
      if (contactAddress) {
        this.setState({ inputValue: contactAddress })
      }
    }
  }

  /**
   * Sets the address to which the coin/tokens are being sent to
   * @param {String} addressInput 
   */
  renderAddress(addressInput) {
    var add = addressInput.trim();    
    this.setState({ inputValue: add, toAddress: add })    
    this.props.getQRCodeData(addressInput)
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
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
      } else {   
        this.setState({ value: valueInput });
      }
    } else {   
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
  sendTransaction = () => {
    const amountString = '' + this.state.value + '';
    const receivingAddress = this.state.toAddress;
    const amount = ethers.utils.parseEther(amountString);
    const currentWallet = this.props.wallet;
    currentWallet.provider = provider;
    const sendPromise = currentWallet.send(receivingAddress, amount);
    sendPromise.then(function (transactionHash) {     
      provider.getBalance(currentWallet.address).then(function (balance) {
        const etherString = utils.formatEther(balance);        
      });
      provider.getBalance(receivingAddress).then(function (balance) {
        const etherString = utils.formatEther(balance);   
      });
    });
  }

  sendERC20Transaction = () => { 
    const val = this.state.value
    const toAddr = this.state.toAddress
    const currentWallet = this.props.wallet;
    const contract = new ethers.Contract(this.props.token.address, ERC20ABI, currentWallet)
    var overrideOptions = {
        gasLimit: 150000,
        gasPrice: 9000000000,
        nonce: 0,
    };
    var sendPromise = contract.functions.transfer(this.state.toAddress, val, overrideOptions)
    sendPromise.then((transaction) => {
        this.setState({ txHash: transaction.hash })
        this.openModal()
    });
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
    this.props.qrScannerInvoker('CoinSend')
    const navigateToQRScanner = NavigationActions.navigate({
      routeName: 'QCodeScanner',
      params: { name: 'Shubhnik', invoker: 'CoinSend' }
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
            <View style={styles.mainContainer}>
                <View style={styles.navContainer}>        
                  <BackWithMenuNav
                     showMenu={true}
                     showBack={true}
                     navigation={this.props.navigation}
                     backPage={"mainStack"}
                    />
                </View>
                <View style={styles.navHeaderContainer}>
                  <CoinSendTabNavigator 
                      navigation={this.props.navigation}
                      sendActive={true}
                      activityActive={false}
                      receiveActive={false} 
                    />
                </View>
                <View style={styles.boxShadowContainer}>
                  <View style={styles.contentContainer}>
                      <BoxShadowCard>
                          <Text style={styles.cardText}>
                              Send Ether by scanning someone's QR code or public address.
                          </Text>
                          <View style= {styles.barcodeImageContainer}>
                            <TouchableOpacity
                              onPress= {() => this.navigate()} >
                              <Image
                                  source={require('../../../../assets/icons/barcode.png')}
                                  style={styles.barcodeImage}
                              /> 
                          </TouchableOpacity>
                        </View>
                        <View style={styles.topFormInput}>
                          <FormInput
                              placeholder={"Public Address"}
                              onChangeText={this.renderAddress.bind(this)}                  
                              ref={ref => this.inputAddress = ref}
                              inputStyle={styles.formInput}
                            />
                        </View>
                          <FormInput
                            placeholder={"Amount"}
                            onChangeText={this.renderValue.bind(this)}
                            ref={ref => this.inputAmount = ref}
                            inputStyle={styles.formInput}
                          /> 
                          <Text style={styles.transactionFee} > 
                            Transaction Fee Total {this.state.value} Eth
                          </Text>                    
                      </BoxShadowCard>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <View style={styles.btnRow}>
                    <View style={styles.btnTopReset}>
                      <ClearButton 
                        onClickFunction={this.resetFields}
                        buttonText="Reset"
                        customStyles={styles.btnCustom}
                        // buttonStateEnabled={this.state.buttonDisabled}
                      />
                    </View>
                    <View style={{flex:1 }}>
                      <LinearButton 
                        onClickFunction={
                          this.props.token.type === "ERC20" ? this.sendERC20Transaction : this.sendTransaction  
                                      }
                        buttonText="Send"
                        customStyles={styles.btnCustom}
                        // buttonStateEnabled={this.state.buttonDisabled}
                      />
                    </View>
                  </View>
                  <View style={styles.footerGrandparentContainer}>
                    <View style={styles.footerParentContainer} >
                        <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                    </View>
                  </View>
                </View>
          </View>
        </TouchableWithoutFeedback>
       </SafeAreaView>      
    )
  }
}

/**
 * Styles for CoinSend screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: '#fafbfe'
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
  boxShadowContainer: {
    alignItems: 'center', 
    marginTop: '15%',
    flex: 4.25,
  },
  contentContainer: {
    width: '82%',
    flex: 1,
  },
  barcodeImageContainer: {
    paddingTop: '5%', 
    paddingBottom:'5%',
    paddingLeft: '7.5%',
  },
  barcodeImage: {
    height: 70, 
    width: 70,
  },
  formInput:{ 
    width:'100%', 
    flexWrap: 'wrap', 
    color:'#12c1a2', 
    fontSize:16, 
    fontFamily: 'WorkSans-Light',
    letterSpacing:0.4
  },
  topFormInput:{
    paddingBottom: '3%'
  },
  transactionFee : {
    fontFamily: 'WorkSans-Light',
    fontSize: 9,
    letterSpacing: 0.3,
    paddingLeft: '7%',
    paddingTop: '1.5%'
  },
  cardText: {
    paddingBottom: '5%',
    paddingTop: '7.5%',
    paddingLeft: '7.5%',
    paddingRight: '7.55%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    fontSize: RF(2.4),
  },
  txtWalletName: {
    width: '100%',
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Regular',  
  },
  btnContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '82%',
    alignContent: 'center',
    marginLeft: '9%',
    marginRight: '9%',
  },
  btnRow: {
    flexDirection:"row",
  },
  btnTopReset: {
    flex: 1,
  },
  btnCustom: {
    marginLeft:'0%', 
    marginRight:'1.75%', 
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
    letterSpacing: 0.5
  },
})

/**
 * Reterives the wallet created/reterived during the initial
 * process, and the Data collected from the QrCode component.
 * 
 * Returns the wallet and the data as an object
 * @param {Object} state 
 */
const mapStateToProps = state => {
  return {
    wallet: state.newWallet.wallet,
    addressData: state.newWallet.QrData,
    token: state.newWallet.current_token
  }
}

export default connect(mapStateToProps, { getQRCodeData, qrScannerInvoker, addTokenInfo })(CoinSend);
