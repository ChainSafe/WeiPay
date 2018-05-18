import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';

class CoinReceive extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'RECEIVE'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.barcode} source={require('../../../Assets/images/QR-CODE.png')} />
        <FormLabel> My Address </FormLabel>
        <FormInput />
        <FormLabel> Request Amount </FormLabel>
        <FormInput />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top: 40
  },
  barcode: {
    width: 165,
    height: 165
  }
})

export default CoinReceive
