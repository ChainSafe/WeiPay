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
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.form}>
            <FormLabel>Please deposit GAS to send NEP-5 tokens, no amount will be charged for this transaction </FormLabel>
            <FormLabel> Send To </FormLabel>
            <FormInput />
            <FormLabel> Amount </FormLabel>
            <FormInput />
          </View>
          <View style={styles.btnContainer}>
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
                justifyContent: 'center', marginBottom: 30, marginTop: 5
              }}
              textStyle={{ textAlign: 'center' }}
              onPress={console.log('erf')} />
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

export default TokenSend
