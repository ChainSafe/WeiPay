import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button, Card } from 'react-native-elements';
import { NavigationActions, DrawerNavigator } from "react-navigation";
import { getQRCodeData, addTokenInfo } from '../../../../actions/ActionCreator';
import provider from '../../../../constants/Providers';
import { qrScannerInvoker } from '../../../../actions/ActionCreator'
import CoinSendTabNavigator from '../../../../components/customPageNavs/CoinSendTabNavigator'
import ERC20ABI from '../../../../constants/data/json/ERC20ABI.json';
import LinearButton from '../../../../components/LinearGradient/LinearButton';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';

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
      toAddress: "",
      value: 0,
      resetInput: false,
      inputValue: ""
    }

    /**
     * Using the Provider (which is connected to the ethereum network) to get the wallet balance and
     * checks if the wallet has funds available to be sent
     */
    provider.getBalance(this.props.wallet.address).then(function (balance) {
      const etherString = utils.formatEther(balance);
      console.log("Current Wallet Balance" + etherString);
      if (etherString == 0) {
        Alert.alert(
          'No Ether Alert',
          'You need to uncomment the code in the constructor and change the private key to one from your local testrpc to fund this account.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
      }
    });
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
    console.log(add)
    this.setState({ inputValue: add, toAddress: add })
    //this.setState({ toAddress: add });
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
        console.log("is a number " + valueInput)
        this.setState({ value: valueInput });
      }
    } else {
      console.log("not a number " + valueInput)
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
      console.log(transactionHash);
      provider.getBalance(currentWallet.address).then(function (balance) {
        const etherString = utils.formatEther(balance);
        console.log("currentWallet Balance: " + etherString);
      });
      provider.getBalance(receivingAddress).then(function (balance) {
        const etherString = utils.formatEther(balance);
        console.log("receiving account Balance: " + etherString);
      });
    });
  }

  sendERC20Transaction = () => {
    console.log("IN SEND TRANSACTION FUNCTION")
    const val = this.state.value
    console.log("THE val is")
    console.log(val)
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
        console.log(transaction.hash);
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
    this.props.qrScannerInvoker("CoinSend")
    const navigateToQRScanner = NavigationActions.navigate({
      routeName: "QCodeScanner",
      params: { name: "Shubhnik", invoker: "CoinSend" }
    });
    this.props.navigation.dispatch(navigateToQRScanner);
  };

  /**
   * Main Component Function
   * Returns the complete form required to send a transaction
   */
  render() {
    console.log("This . wallet ")
    console.log(this.props.token)
    return (
      <View style={styles.mainContainer}>
        <BackWithMenuNav 
          showMenu={true}
          showBack={true}
          navigation={this.props.navigation}
          
        />
        <CoinSendTabNavigator 
          navigation={this.props.navigation} 
        />
        <View style={styles.contentContainer} >
       
            <Card containerStyle={ styles.cardContainer }>
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
              </Card>
         
          <View style={styles.btnContainer} >
            
              {/* <LinearButton 
                    onClickFunction={this.navigate}
                    buttonText="Next"
                    customStyles={styles.button}
                    buttonStateEnabled={this.state.buttonDisabled}
                />

                <LinearButton 
                    onClickFunction={this.navigate}
                    buttonText="Send"
                    customStyles={styles.button}
                    buttonStateEnabled={this.state.buttonDisabled}
                /> */}

             <Button
              title='Reset'
              disabled={this.state.toAddress === "" && this.state.value == 0}
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
              onPress={() => this.resetFields()} />

            <Button
              title='Next'
              disabled={this.state.toAddress === "" || this.state.value == 0}
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 30, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
              onPress={() => {
                if(this.props.token.type === "ERC20") {
                    this.sendERC20Transaction()
                } else {
                    this.sendTransaction()
                }
              }}
            />
          </View>
           <View style={styles.footerGrandparentContainer} >    
              <View style={styles.footerParentContainer} >
                  <Text style={styles.textFooter} >Powered by ChainSafe </Text> 
              </View>  
          </View>
        </View>
      </View >
    )
  }
}

/**
 * Styles for CoinSend screen
 */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: '2.5%',
    backgroundColor: "#fafbfe",
    width: '100%',
    height: '100%'
  },
  contentContainer: {    
    alignItems:'center',
    flex:1
  },
  barcodeImageContainer: {
    paddingTop: '5%', 
    paddingBottom:'5%',
    paddingLeft: '5%',
  },
  barcodeImage: {
    height:75, 
    width:75
  },
  cardContainer: {
    width: '82%', 
    height: '65%', 
    borderRadius: 7.5, 
    shadowOpacity: 0.5, 
    shadowRadius: 1.3, 
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 1, height: 2 },    
    alignItems:'stretch' 
  },
  cardText : {
    paddingBottom: '2.5%',
    paddingTop: '8%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontFamily: "WorkSans-Light",  
    color: '#000000',
    fontSize: 16,
    lineHeight: 22
  },
  formInput:{ 
    width:'100%', 
    flexWrap: 'wrap', 
    color:'#12c1a2', 
    fontSize:16, 
    fontFamily: "WorkSans-Light",
    letterSpacing:0.4
  },
  topFormInput:{
    paddingBottom: '6%'
  },
  transactionFee : {
    fontFamily: "WorkSans-Light",
    fontSize: 9,
    letterSpacing: 0.3,
    paddingLeft: '7%',
    paddingTop: '2.5%'
  },
  qr: {
    marginLeft: 5,
    marginTop: 10
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  button: {
    width: '100%'
  },
  footerGrandparentContainer : {
    alignItems:'center'
  },
  footerParentContainer :{ 
      alignItems:'center'
  },
  textFooter : {
      fontFamily: "WorkSans-Regular",
      fontSize: 11,      
      marginTop: '3.5%',      
      color: '#c0c0c0'
  }
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
