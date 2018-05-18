import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';

class CoinSend extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'SEND'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel> Send To </FormLabel>
        <FormInput />
        <FormLabel> Amount </FormLabel>
        <FormInput />
        <Text style={styles.transactionFee}>
          Transaction Fee
          Total  0 BTC 0 USD
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  transactionFee: {
    top: 4
  }
})

export default CoinSend
