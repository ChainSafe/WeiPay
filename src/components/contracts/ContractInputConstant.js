import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import ClearButton from '../linearGradient/ClearButton';

class ContractInputConstant extends Component {
  state = {
    result: null,
  };
  render() {
    const { item } = this.props;
    const { result } = this.state; 
    console.log({item});
    
    return (
       <View>
         <View style={styles.callResult}>
          {
            result !== null ? <Text> {result} </Text> : null
          }
         </View>
         <View style={styles.btnContainer}>
          <ClearButton
              buttonText= {`Call ${item.functionSignature}`}
              onClickFunction={async () => {
                const methodResult = await this.props.contractExecution(item.functionSignature);
                // con
                console.log(methodResult);
                await this.setState({ result: methodResult});
                console.log('after set');
                
                console.log(this.state);
                
              }}
              customStyles={styles.btnFunctionInput}
          />
         </View>
      </ View>
    );
  }
}

const styles = StyleSheet.create({
  callResult: {
    flex: 1,
  },
  btnContainer: {
    flex: 2,
  },
  btnFunctionInput: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.82,
  },
});

export default ContractInputConstant;
