import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import ClearButton from '../linearGradient/ClearButton';

class ContractInputConstant extends Component {
  state = {
    result: null,
  };
  render() {
    const { item } = this.props;
    const { result } = this.state;     
    return (
       <View style={{marginTop: 15}}>
         <View style={styles.callResult}>
          <Text style={styles.text}>Constant Method Call</Text>
          {
            result !== null ? <Text style={styles.text}>{result} </Text> : null
          }
         </View>
         <View style={styles.btnContainer}>
          <ClearButton
              buttonText= {`Call ${item.functionSignature}`}
              onClickFunction={async () => {
                const methodResult = await this.props.contractExecution(item.functionSignature);
                await this.setState({ result: methodResult});
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
  text: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(2.2),
    letterSpacing: 0.8,
    paddingLeft: '5%',
    color: '#1a1f3e',
  },
  btnContainer: {
    marginTop: '5%',
    flex: 2,
    marginRight: '5%',
  },
  btnFunctionInput: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.82,
  },
});

export default ContractInputConstant;
