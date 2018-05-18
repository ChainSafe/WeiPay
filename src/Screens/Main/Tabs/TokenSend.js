import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

class TokenSend extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'SEND'
    }
  }

  render() {
    return (
      <View>
        <Text>Please deposit GAS to send NEP-5 tokens, no amount will be charged for this transaction</Text>
        <FormLabel> Send To </FormLabel>
        <FormInput />
        <FormLabel> Amount </FormLabel>
        <FormInput />
        <View style={styles.btnContainer}>
          <Button
            title='Reset'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: 'blue', borderRadius: 10, width: 150, height: 40
            }}

            textStyle={{ textAlign: 'center' }}
            onPress={console.log('sdf')} />
          <Button
            title='Next'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: 'blue', borderRadius: 10, width: 150, height: 40
            }}

            textStyle={{ textAlign: 'center' }}
            onPress={console.log('erf')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    top: 20,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  }
})

export default TokenSend
