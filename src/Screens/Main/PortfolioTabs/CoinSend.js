import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
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
      value: 0
    }
  }

  renderAddress(addressInput) {
    console.log(addressInput)
    this.setState({ toAddress: addressInput });
  }

  renderValue(valueInput) {
    if (!isNaN(valueInput)) {
      console.log("is a number " + valueInput)
      this.setState({ value: valueInput });
      //is a number 
    } else {
      //not a number
      console.log("not a number " + valueInput)
      this.setState({ value: 0 });
    }
  }


  sendTransaction = () => {

    /* Create Fake account to send ether too just for testrpc purposes */
    var walletRandom = ethers.Wallet.createRandom();
    walletRandom.provider = provider;
    console.log("Address: " + walletRandom.address);

    //amount using the state input as a string 
    var amount = ethers.utils.parseEther(this.state.value.toString());

    // current wallet stuff
    const currentWallet = this.props.wallet;
    currentWallet.provider = provider;

    var sendPromise = currentWallet.send(walletRandom.address, amount);

    sendPromise.then(function (transactionHash) {
      console.log(transactionHash);

      provider.getBalance(currentWallet.address).then(function (balance) {
        var etherString = utils.formatEther(balance);
        console.log("currentWallet Balance: " + etherString);
      });

      provider.getBalance(walletRandom.address).then(function (balance) {
        var etherString = utils.formatEther(balance);
        console.log("wallet random Balance: " + etherString);
      });
    });

  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer} >
          <View style={styles.form} >
            <FormLabel> Send To </FormLabel>
            <FormInput style={styles.formInputElement}
              onChangeText={this.renderAddress.bind(this)}
            />
            <FormLabel> Amount </FormLabel>
            <FormInput style={styles.formInputElement}
              onChangeText={this.renderValue.bind(this)}
            />
            <FormLabel>
              Transaction Fee
              Total  0 BTC 0 USD
            </FormLabel>
          </View>
          <View style={styles.btnContainer} >
            <Button
              title='Reset'
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
                justifyContent: 'center', marginBottom: 5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center' }}
              onPress={console.log('sdf')} />
            <Button
              title='Next'
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
                justifyContent: 'center', marginBottom: 30, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center' }}
              onPress={() => this.sendTransaction()}
            />
          </View>
        </View>
      </View>
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
    wallet: state.newWallet.wallet
  }
}

export default connect(mapStateToProps, null)(CoinSend);
