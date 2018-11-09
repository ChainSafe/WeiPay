import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import RF from 'react-native-responsive-fontsize';
import { FormInput } from 'react-native-elements'

class ContractInput extends Component {
  render() {
    const { inputItem, signature } = this.props;
    const { name, type, inputName } = inputItem;

    return (
       <View>
         <Text style={styles.text}> {name} </Text>
         <FormInput
            placeholder={type}
            onChangeText={
              (text) => {
                return this.props.processContractInput(text, inputName, type, signature);
              }}
            inputStyle={styles.functionInputStyle}
            />
      </ View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(2.2),
    letterSpacing: 0.8,
    paddingLeft: '5%',
    color: '#1a1f3e',
  },
  functionInputStyle: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.82,
  },
});

export default ContractInput;
