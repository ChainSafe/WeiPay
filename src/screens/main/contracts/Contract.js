import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView, TextInput,
} from 'react-native';
import { FormInput } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import RF from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/shadowCards/BoxShadowCard';
import {
  processContractByAddress, processFunctionCall2,
} from '../../../scripts/contracts/contractHelper';
import {
  executeNonPayableNoParams,
  executeNonPayableWithParams,
  executePayableNoParams,
  executePayableWithParams,
} from '../../../scripts/contracts/contractValidation';
import LinearButton from '../../../components/linearGradient/LinearButton';
import ClearButton from '../../../components/linearGradient/ClearButton';
import getNetworkProvider from '../../../constants/Providers';

/**
 * Screen is used to display the passphrase (mnemonic) of the wallet - 0xcD361f7173C439BB76F3E1206446e9D183B82787
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
        await processFunctionCall2(this.state.wallet, functionNameForContract, inputs, this.state.contract, this.state.provider);
        Toast.show('Success', Toast.LONG);
      }
    } else if (!isFunctionPayable && hasFunctionParameters) {
      if (executeNonPayableWithParams(functionName, inputs, allFunctionDetails, isFunctionPayable)) {
        await processFunctionCall2(this.state.wallet, functionNameForContract, inputs, this.state.contract, this.state.provider);
        Toast.show('Success', Toast.LONG);
      }
    } else if (isFunctionPayable && !hasFunctionParameters) {
      if (executePayableNoParams(functionName, {}, allFunctionDetails, isFunctionPayable)) {
        await processFunctionCall2(this.state.wallet, functionNameForContract, inputs, this.state.contract, this.state.provider);
        Toast.show('Success', Toast.LONG);
      }
    } else if (isFunctionPayable && hasFunctionParameters) {
      if (executePayableWithParams(functionName, inputs, allFunctionDetails, isFunctionPayable)) {
        await processFunctionCall2(this.state.wallet, functionNameForContract, inputs, this.state.contract, this.state.provider);
        Toast.show('Success', Toast.LONG);
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
      contractFunctionsFormatted.push({ arrayLength, property, functionSignature, fInputs, payable });
    }

    return (
      <View>
        {
          contractFunctionsFormatted.map((item) =>
            <View key={`${item.arrayLength}${item.functionSignature}`} style={styles.functionContainer }>
              <BoxShadowCard>
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
                      />
                    </View>
                  : null
                }

                {
                  (item.fInputs.length != 0)
                  ? <View>
                    {
                      item.fInputs.map((inputObject) =>
                        <View key={`${item.arrayLength}${inputObject.uniquekey}${inputObject.inputName}`}>
                          <View style={styles.functionInputContainer}>
                            <Text>input name: {inputObject.inputName} </Text>
                          </View>
                          <View style={styles.functionInputContainer}>
                            <FormInput
                              placeholder={inputObject.type}
                              onChangeText={(text)=> this.processFunctionInput(text, inputObject.inputName, inputObject.type, item.functionSignature)}
                              inputStyle={styles.functionInputStyle}
                            />
                          </View>
                      </View>,)
                  }
                    <ClearButton
                      buttonText= {`Call ${item.property}`}
                      onClickFunction={() => this.contractFuncCheck(item) }
                      customStyles={styles.btnFunctionInput}
                    />
                </View>
              :
                <View>
                  <ClearButton
                      buttonText= {`Call ${item.functionSignature}`}
                      onClickFunction={() => this.contractFuncCheck(item.functionSignature) }
                      customStyles={styles.btnFunctionInput}
                    />
                </View>
              }
              </BoxShadowCard>
            </View>,
          )
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
                <View style={styles.footerGrandparentContainer}>
                    <View style={styles.footerParentContainer} >
                        <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                    </View>
                </View>
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
    backgroundColor: '#fafbfe',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    justifyContent: 'center',
    width: '100%',
  },
  navContainer: {
    flex: 0.75,
  },
  boxShadowContainer: {
    alignItems: 'center',
    flex: 3,
  },
  functionContainer: {
    flex: 1,
  },
  functionInputContainer: {
    width: '92%',
    marginLeft: '9%',
  },
  btnFunctionInput: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.82,
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
  topFormInput: {
    flex: 5,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '5%',
  },
  scrollViewContainer: {
    flex: 5,
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
  },
  scrollView: {
    height: '100%',
  },
  loadButton: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
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
  btnFlex: {
    marginTop: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textDescription: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(3),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
  },
  contentContainer: {
    width: '82%',
    flex: 1,
  },
  cardText: {
    paddingBottom: '7.5%',
    paddingTop: '7.5%',
    paddingLeft: '7.5%',
    paddingRight: '7.55%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    letterSpacing: 0.4,
    fontSize: RF(2.4),
    lineHeight: RF(2.8),
  },
  mnemonicText: {
    paddingTop: '2.5%',
    paddingLeft: '7.5%',
    paddingRight: '7.55%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    color: '#12c1a2',
    fontSize: RF(2.2),
    lineHeight: RF(3),
  },
  btnContainer: {
    width: '100%',
    flex: 1.25,
    marginTop: '2.5%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '5%',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(1.7),
    color: '#c0c0c0',
    letterSpacing: 0.5,
  },
});

const mapStateToProps = ({ HotWallet, Wallet }) => {
  const { hotWallet } = HotWallet;
  const { network } = Wallet;
  return { hotWallet, network };
};

export default connect(mapStateToProps, null)(Contract);
