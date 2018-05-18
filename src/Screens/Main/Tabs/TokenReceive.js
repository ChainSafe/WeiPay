import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';

class TokenReceive extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'RECEIVE'
    }
  }

  render() {
    return (
      <View style={{alignItems: 'center', top: 20}}>
        <Image style={styles.barcode} source={require('../../../Assets/images/QR-CODE.png')} />
        <FormLabel> My Address </FormLabel>
        <FormInput />
        <FormLabel> Request Amount </FormLabel>
        <FormInput />
      </View>
    )
  }
}

export default TokenReceive

const styles = StyleSheet.create({
  barcode: {
    width: 165,
    height: 165
  }
})
