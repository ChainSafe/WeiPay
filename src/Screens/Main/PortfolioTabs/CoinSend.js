import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
const ethers = require('ethers');
import Provider from '../../../constants/Providers'; //this gives us access to the local test rpc network to test

//import { recoverPassphrase } from '../../Actions/actionCreator';

/* 
  THE ASSUMPTION IS THAT WE ARE using the 
*/
class CoinSend extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'SEND'
    }
  }

  renderAddress(addressInput) {
    console.log(addressInput)
  }

  renderValue(valueInput) {

    if (!isNaN(valueInput)) {
      console.log("is a number " + valueInput)
      //is a number 
    } else {
      //not a number
      console.log("not a number " + valueInput)
    }
  }

  check = () => {
    console.log("hello");
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


//should return the passphrase from redux
//export default connect(null, { recoverPassphrase })(CoinSend);

export default CoinSend;
