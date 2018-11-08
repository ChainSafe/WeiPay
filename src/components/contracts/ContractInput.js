import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import { FormInput } from 'react-native-elements'

class ContractInput extends Component {
  render() {
    const { inputItem, signature } = this.props;
    const { name, type, inputName } = inputItem;

    return (
       <View>
         <Text> {name} </Text>
         <FormInput
            placeholder={type}
            onChangeText={
              (text) => {
                return this.props.processInput(text, inputName, type, signature);
              }}
            inputStyle={styles.functionInputStyle}
            />
      </ View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.82,
  },
});

export default ContractInput;
