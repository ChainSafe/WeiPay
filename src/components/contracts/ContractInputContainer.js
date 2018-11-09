import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import ContractInput from './ContractInput';
import ClearButton from '../linearGradient/ClearButton';

class ContractInputContainer extends Component {
  render() {
    const { inputs, signature, item } = this.props;

    return (
       <View>
        <View style={styles.inputContainer}>
          {
            inputs.map((inputObject, x) =>
              <ContractInput
                 key={x}
                inputItem={inputObject}
                processContractInput={this.props.processInput}
                signature={signature}
              />)
          }
        </View>
        <View style={styles.btnContainer}>
          <ClearButton
            buttonText= {`Call ${item.property}`}
            onClickFunction={() => this.props.contractExecution(item) }
            customStyles={styles.btnFunctionInput}
          />
        </View>
      </ View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 2,
  },
  btnContainer: {
    flex: 1,
    paddingTop: '5%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: '5%',
  },
  btnFunctionInput: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.82,
  },
});

export default ContractInputContainer;
