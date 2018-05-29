import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
const ethers = require('ethers');
var utils = ethers.utils;
import provider from '../../../constants/Providers'; //this gives us access to the local test rpc network to test

/* 
  THE ASSUMPTION IS THAT WE ARE using the 
*/
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

  check = () => {

    var privateKey = "0x9436a5c70623f162df33b93ca29f9430e55202d157b0355b7cd4761b121c3c4f";
    var wallet = new Wallet(privateKey);
    wallet.provider = provider;

    console.log(wallet);

    var walletRandom = Wallet.createRandom();
    walletRandom.provider = provider;
    console.log("Address: " + walletRandom.address);

    var amount = ethers.utils.parseEther('10.0');
    var sendPromise = wallet.send(walletRandom.address, amount);

    sendPromise.then(function (transactionHash) {
      console.log(transactionHash);

      provider.getBalance(wallet.address).then(function (balance) {
        var etherString = utils.formatEther(balance);
        console.log("first Balance: " + etherString);
      });

      provider.getBalance(walletRandom.address).then(function (balance) {
        var etherString = utils.formatEther(balance);
        console.log("random Balance: " + etherString);
      });
    });

    //console.log(this.props.wallet);
    //const currentWallet = this.props.wallet;
    //const currentWalletPublicKey = this.props.wallet.address;
    //const currentWAlletPrivateKey = this.props.privateKey;
    //console.log("current address: " + currentWalletPublicKey + " sending addres is : " + this.state.toAddress);
    //console.log(provider);
    // currentWallet.provider = provider;
    // var amount = ethers.utils.parseEther('5.0');
    // var address = "0x21eb2b8aafb2d1b5538e00eef8bdb8a197d8973e";
    // var sendPromise = currentWallet.send(address, amount);
    // sendPromise.then(function (transactionHash) {
    //   console.log(transactionHash);
    //   provider.getBalance(currentWallet.address).then(function (balance) {
    //     var etherString = utils.formatEther(balance);
    //     console.log("current Balance: " + etherString);
    //   });
    //   provider.getBalance(address).then(function (balance) {
    //     var etherString = utils.formatEther(balance);
    //     console.log("reciving Balance: " + etherString);
    //   });
    // });

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
              onPress={this.check()}
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
