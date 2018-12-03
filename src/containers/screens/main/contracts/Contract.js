import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView, TextInput,
} from 'react-native';
import { FormInput, Card } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import RF from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import {
  processContractByAddress, processFunctionCall2,
} from '../../../../scripts/contracts/contractHelper';
import {
  executeNonPayableNoParams,
  executeNonPayableWithParams,
  executePayableNoParams,
  executePayableWithParams,
} from '../../../../scripts/contracts/contractValidation';
import LinearButton from '../../../components/linearGradient/LinearButton';
import getNetworkProvider from '../../../../constants/Providers';
import ContractInputContainer from '../../../components/contracts/ContractInputContainer';
import ContractInputConstant from '../../../components/contracts/ContractInputConstant';

/**
 * Screen is used to display the passphrase (mnemonic) of the wallet - 0xcD361f7173C4
 * 39BB76F3
 * E1206446e9D183
 * B82787
 */
class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractLoaded: false,
      provider: null,
      address: '',
      wallet: this.props.hotWallet.wallet,
      contractEvents: null,
      contractFunctions: null,
      contract: null,
      withInputs: null,
      payable: null,
      functions: [],
      currentInput: {},
    };
  }

  componentDidMount = async () => {
    const provider = await getNetworkProvider(this.props.network);  
    this.setState({ provider }); 
  }

  getContract = async () => {  
    const {
      contractFunctions, contractEvents, contract, withInputs,
    } = await processContractByAddress(this.state.wallet, this.state.address, this.state.provider, this.props.network);
    this.setState({
      contractEvents, contractFunctions, contract, withInputs,
    });
  }

  processFunctionInput = (x, inputName, inputType, funcName) => {
    let c = Object.assign({}, this.state.currentInput);
    if (c[funcName] == null) {
      c[funcName] = {};
    }
    if (inputType == "string") {
      c[funcName][inputName] = "'" + x + "'";
    } else {
      c[funcName][inputName] = x;
    }
    this.setState({ currentInput: c });
  }

  /**
   * Need to check if contract method has no parameters, if it has paramaters, if is payable.
   */
  contractFuncCheck = async (name) => {
    const isFunctionPayable = Object.prototype.hasOwnProperty.call(name, 'payable');
    const hasFunctionParameters = Object.prototype.hasOwnProperty.call(name, 'property');
    const allFunctionDetails = this.state.withInputs;
    let functionName;
    let functionNameForContract;
    let inputs;
    if (hasFunctionParameters) {
      functionName = name.property;
      functionNameForContract = name.property;
      inputs = this.state.currentInput[name.functionSignature];
    } else {
      functionName = name.split("(")[0];
      functionNameForContract = name;
      inputs = {};
    }
    if (!isFunctionPayable && !hasFunctionParameters) {
      if (executeNonPayableNoParams(functionName, {})) {
        Toast.show('Success', Toast.LONG);
        const result = await processFunctionCall2(this.state.wallet, functionNameForContract, inputs, this.state.contract, this.state.provider);
        return result;
      }
    } else if (!isFunctionPayable && hasFunctionParameters) {
      if (executeNonPayableWithParams(functionName, inputs, allFunctionDetails, isFunctionPayable)) {
        Toast.show('Success', Toast.LONG);
        const result = await processFunctionCall2(this.state.wallet, functionNameForContract, inputs, this.state.contract, this.state.provider);
        return result;
      }
    } else if (isFunctionPayable && !hasFunctionParameters) {
      if (executePayableNoParams(functionName, {}, allFunctionDetails, isFunctionPayable)) {
        Toast.show('Success', Toast.LONG);
        const result = await processFunctionCall2(this.state.wallet, functionNameForContract, inputs, this.state.contract, this.state.provider);
        return result;
      }
    } else if (isFunctionPayable && hasFunctionParameters) {
      if (executePayableWithParams(functionName, inputs, allFunctionDetails, isFunctionPayable)) {
        Toast.show('Success', Toast.LONG);
        const result = await processFunctionCall2(this.state.wallet, functionNameForContract, inputs, this.state.contract, this.state.provider);
        return result;
      }
    }
  }

  parseFunctions = () => {
    let contractFunctionsFormatted = [];
    const allFunctionsWithInputs = this.state.withInputs;
    for (let i = 0; i < allFunctionsWithInputs.length; i++) {
      const arrayLength = contractFunctionsFormatted.length;
      const functionSignature = allFunctionsWithInputs[i].signature;
      const property = functionSignature.split('(')[0];
      const fInputs = allFunctionsWithInputs[i].inputs;
      const payable = allFunctionsWithInputs[i].payable;
      contractFunctionsFormatted.push({ arrayLength, i, property, functionSignature, fInputs, payable });
    }
    return (
      <View style={styles.contractInputContainer}>
        {
          contractFunctionsFormatted.map((item, i) =>
            <View key={i} style={styles.functionContainer} >
              <Card>
                <View style={styles.functionInputContainer}>
                  <Text>Signature: {item.functionSignature} </Text>
                </View>
                {
                  item.payable
                  ?
                    <View style={styles.functionInputContainer}>
                      <FormInput
                        placeholder= { this.state.payable ? this.state.payable.text : "Ether Value (Payable)" }
                        onChangeText={(text) => this.processFunctionInput(text, 'payable', 'payable', item.functionSignature)}
                        inputStyle={styles.functionInputStyle}
                        selectionColor={'#12c1a2'}
                      />
                    </View>
                  : null
                }
                {
                  (item.fInputs.length != 0)
                  ? 
                  <View style={styles.topInputContainer}>
                    <ContractInputContainer 
                        signature={item.functionSignature}
                        inputs={item.fInputs}
                        item={item}
                        processInput={this.processFunctionInput}
                        contractExecution={this.contractFuncCheck}
                    />
                </View>
              : 
                <View style={styles.topInputContainer}>
                  <ContractInputConstant 
                     contractExecution={this.contractFuncCheck}
                     item={item}
                  />
                </View>
              }
              </Card>
            </View>,)
        }
      </View>
    );
  }

  /**
   * Returns a component that allows the user to view the passphrase
   */
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
              <View style={styles.navContainer}>
                <BackWithMenuNav
                    showMenu={false}
                    showBack={true}
                    navigation={this.props.navigation}
                  />
              </View>
                {
                  this.state.contractFunctions === null
                    ?
                    <View style={styles.topFormInput}>
                      <Text style={styles.textHeader}>Contract Interaction</Text>
                      <Text style={styles.textDescription}>Load contract address</Text>
                      <View style={styles.addressField}>
                        <TextInput
                          placeholder={'Contract Address'}
                          onChangeText={(add) => { return this.setState({ address: add }); }}
                          inputStyle={styles.inputContactName}
                          placeholderTextColor={'#b3b3b3'}
                          value={this.state.address}
                        />
                      </View>
                    </View>
                    :
                    <View style={styles.scrollViewContainer} >
                      <ScrollView style={styles.scrollView}>
                         { this.parseFunctions() }
                       </ScrollView>
                    </View>
                }

            <View style={styles.btnContainer}>
                {
                   this.state.contractFunctions === null
                   ?
                    <LinearButton
                      buttonText='Load Contract'
                      onClickFunction={() => this.getContract(this)}
                      customStyles={styles.loadButton}
                    />
                 :  <LinearButton
                      buttonText='Reset Contract'
                      onClickFunction={() => this.getContract(this)}
                      customStyles={styles.loadButton}
                    />
                }
            </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    );
  }
}

/**
 * Styles used in the BackupPhrase screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f4f7f9',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f4f7f9',
    justifyContent: 'center',
    width: '100%',
  },
  navContainer: {
    flex: 0.75,
  },
  topFormInput: {
    flex: 5,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '5%',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    paddingTop: '2.5%',
    marginBottom: '5%',
  },
  textDescription: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(3),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
  },
  addressField: {
    marginLeft: '9%',
    marginTop: '5%',
  },
  inputContactName: {
    fontSize: RF(2.5),
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Light',
    borderBottomWidth: 0.0001,
  },
  scrollViewContainer: {
    flex: 5,
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
  },
  scrollView: {
    height: '100%',
  },
  contractInputContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  functionContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  functionInputContainer: {
    marginTop: '5%',
  },
  functionInputStyle: {
    width: '80%',
    fontSize: RF(2.4),
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Regular',
    borderBottomWidth: 0.0001,
  },
  topInputContainer: {
    flex: 1,
  },
  btnFunctionInput: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.82,
  },
  loadButton: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  btnContainer: {
    width: '100%',
    flex: 0.9,
    marginTop: '2.5%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
});

const mapStateToProps = ({ HotWallet, Wallet }) => {
  const { hotWallet } = HotWallet;
  const { network } = Wallet;
  return { hotWallet, network };
};

export default connect(mapStateToProps, null)(Contract);
