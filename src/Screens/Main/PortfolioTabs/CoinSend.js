import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { NavigationActions } from "react-navigation";
import { getQRCodeData } from '../../../Actions/actionCreator'
const ethers = require('ethers');
var utils = ethers.utils;
import provider from '../../../constants/Providers'; //this gives us access to the local test rpc network to test

class CoinSend extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'SEND'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      toAddress: "",
      value: 0,
      resetInput: false,
      inputValue: ""
    }


    provider.getBalance(this.props.wallet.address).then(function (balance) {
      var etherString = utils.formatEther(balance);
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

    /*
      Send money from testrpc to current wallet just to make sure there are funds for transactions.
      If you have no money in your current wallet then you need to uncomment this and adjust privat key
    */

    // const privateKey = "0x1e1a9de3455f77edf5aaa0342766c9bcb65e8d6b6e868bda0f34fac118d1419f";
    // const walletToFundCurrentWallet = new ethers.Wallet(privateKey);
    // const currentWallet = this.props.wallet;

    // walletToFundCurrentWallet.provider = provider;
    // currentWallet.provider = provider;

    // var amount = ethers.utils.parseEther('5.0');
    // var sendPromise = walletToFundCurrentWallet.send(currentWallet.address, amount);

    // sendPromise.then(function (transactionHash) {
    //   console.log(transactionHash);
    //   provider.getBalance(walletToFundCurrentWallet.address).then(function (balance) {
    //     var etherString = utils.formatEther(balance);
    //     console.log("walletToFundCurrentWallet Balance: " + etherString);
    //   });
    //   provider.getBalance(currentWallet.address).then(function (balance) {
    //     var etherString = utils.formatEther(balance);
    //     console.log("currentWallet Balance: " + etherString);
    //   });
    // });
  }
  componentWillMount() {

    if (this.props.navigation.state.params) {
      let contactAddress = this.props.navigation.state.params.address
      if (contactAddress) {
        this.setState({ inputValue: contactAddress })
      }
    }

  }

  renderAddress(addressInput) {
    var add = addressInput.trim();
    console.log(add)
    this.setState({ inputValue: add })
    this.setState({ toAddress: add });
  }

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
  sendTransaction = () => {
    /*
      this.props.wallet is either the recovered wallet or new wallet, in either case we have sent 5 ether in the constructor
      to this wallet by using a testrpc private key. If we are recvoering a wallet, this does nothing, but if we are creating
      a new wallet, we will never have funds in our test environemnt, so this is just a test setup.
    */
    const amountString = '' + this.state.value + '';
    const receivingAddress = this.state.toAddress;
    var amount = ethers.utils.parseEther(amountString);
    const currentWallet = this.props.wallet;
    currentWallet.provider = provider;
    var sendPromise = currentWallet.send(receivingAddress, amount);

    sendPromise.then(function (transactionHash) {
      console.log(transactionHash);

      provider.getBalance(currentWallet.address).then(function (balance) {
        var etherString = utils.formatEther(balance);
        console.log("currentWallet Balance: " + etherString);
      });

      provider.getBalance(receivingAddress).then(function (balance) {
        var etherString = utils.formatEther(balance);
        console.log("receiving account Balance: " + etherString);
      });

    });
  }

  resetFields = () => {
    console.log("logged");
    this.inputAddress.clearText();
    this.inputAmount.clearText();
  }

  navigate = () => {
    const navigateToEnableTokens = NavigationActions.navigate({
      routeName: "QCodeScanner",
      params: { name: "Shubhnik" }
    });
    this.props.navigation.dispatch(navigateToEnableTokens);
  };


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
              />
              <FormInput style={styles.formInputElement}
                onChangeText={this.renderAddress.bind(this)}
                value={this.props.addressData}
                ref={ref => this.inputAddress = ref}
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
                backgroundColor: 'white', borderColor: '#2a2a2a', borderWidth: 2, borderRadius: 10,
                width: 300, height: 50, padding: 10, alignItems: 'center',
                justifyContent: 'center', marginBottom: 5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a' }}
              onPress={() => this.resetFields()} />
            <Button
              title='Next'
              disabled={this.state.toAddress === "" || this.state.value == 0}
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'white', borderColor: '#2a2a2a', borderWidth: 2, borderRadius: 10,
                width: 300, height: 50, padding: 10, alignItems: 'center',
                justifyContent: 'center', marginBottom: 30, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a' }}
              onPress={() => this.sendTransaction()}
            />
          </View>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start'
  },
  contentContainer: {
    marginTop: 25
  },
  form: {
    width: 340
  },
  btnContainer: {
    flex: 1, justifyContent: 'flex-end', alignItems: 'center'
  },
})

const mapStateToProps = state => {
  return {
    wallet: state.newWallet.wallet,
    addressData: state.newWallet.QrData
  }
}

export default connect(mapStateToProps, { getQRCodeData })(CoinSend);
