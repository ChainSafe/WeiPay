import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { NavigationActions } from "react-navigation";
import { getQRCodeData } from '../../../../actions/ActionCreator';
import provider from '../../../../constants/Providers';
import { qrScannerInvoker } from '../../../../actions/ActionCreator'
const ethers = require('ethers');
const utils = ethers.utils;

/**
 * React Component
 * Screen used to conduct negative transactions (sending coins/tokens)
 */
class CoinSend extends Component {
  /**
   * Sets the Tab header to "SEND"
   */
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'SEND'
    }
  }

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
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer} >
          <View style={styles.form} >
            <FormLabel>Send To </FormLabel>
            <View style={{ flexDirection: 'row' }}>
              <Button
                title='QR'
                onPress={() => this.navigate()}
                style={styles.qr}
              />
              <FormInput style={styles.formInputAddress}
                onChangeText={this.renderAddress.bind(this)}
                value={this.props.addressData}
                ref={ref => this.inputAddress = ref}
                containerStyle={{ width: "65%", marginTop: 0, marginBottom: 0 }}
              />
            </View>
            <FormLabel>Amount </FormLabel>
            <FormInput style={styles.formInputElement}
              onChangeText={this.renderValue.bind(this)}
              ref={ref => this.inputAmount = ref}
            />
            <FormLabel>
              Transaction Fee
              Total  {this.state.value} ETH 0 USD
            </FormLabel>
          </View>
          <View style={styles.btnContainer} >
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
              onPress={() => this.sendTransaction()}
            />
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
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  contentContainer: {
    marginTop: 25
  },
  form: {
    width: 340
  },
  qr: {
    marginLeft: 5,
    marginTop: 10
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    addressData: state.newWallet.QrData
  }
}

export default connect(mapStateToProps, { getQRCodeData, qrScannerInvoker })(CoinSend);
