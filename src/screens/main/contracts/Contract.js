import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import RF from 'react-native-responsive-fontsize';
import {processContractByAddress, processFunctionCall} from '../../../scripts/contracts/contractHelper';
import ClearButton from '../../../components/LinearGradient/ClearButton';
import Toast from 'react-native-simple-toast';

/**
 * Screen is used to display the passphrase (mnemonic) of the wallet
 */
class Contract extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contractLoaded: false,
      address: '',
      hardCodedAddress: '0x46f2C84f05599BD86080af4cFA06D7e0db6730C0',
      wallet: this.props.wallets[0].hdWallet,
      contractEvents: null,
      contractFunctions: null,
      contract: null,
      functions: [],
      currentInput: {funcName: null, inputName: null, inputType: null, input: null},
    };
  }

  getContract = async () => {
    this.setState({contractFunctions: null});
    const { contractFunctions, contractEvents, contract } = await processContractByAddress(this.state.wallet, this.state.hardCodedAddress);
    this.setState({contractEvents, contractFunctions, contract });
  }

  /**
   * Needs to be implemented
   * x : input text
   * inputName: pram Name
   * inputType: pram type
   * obj: function
   */
  processFunctionInput = (x, inputName, inputType, obj) => {
    
    const c = {
      funcName: obj,
      inputName: inputName,
      inputType: inputType,
      input: x
    };
    this.setState({currentInput: c});
    
    // console.log(inputName + " " + inputType + " : ");
    // console.log(x);
    // console.log("-----------------Contract-----------");
    
    // console.log(this.state.contract);
    // console.log("----------item--------------");
    // console.log(obj);
    
    
    
    
    
  }

  /**
   * Needs to be implemented
   */
  executeContractFunction = async (x, inputName, inputType, obj) => {
    
    await processFunctionCall(this.state.wallet ,this.state.currentInput, this.state.contract);
    Toast.show('Success');
  }

  /**
   * 
   */
   parseFunctions = () => {
    let contractFunctionsFormatted = []; //holds all the functions
    for (var property in this.state.contractFunctions) {
      let contractFunctionObj = {};
      if (this.state.contractFunctions.hasOwnProperty(property)) {        
        let functionDescription = property;
        let functionObject = this.state.contractFunctions[property];
        let functionName = this.state.contractFunctions[property].name; 
        let functionSignature = this.state.contractFunctions[property].signature;
        let functionInputs = this.state.contractFunctions[property].inputs;     
        let fInputs = [];
        for(let i = 0; i < functionInputs.names.length; i++) {
          let inputObj = {};
          inputObj.inputName = functionInputs.names[i];
          inputObj.type = functionInputs.types[i];
          const uniqueKeyHelper = contractFunctionsFormatted.length * 2;
          inputObj.uniquekey = `${uniqueKeyHelper}${functionInputs.names[i]}${functionInputs.types[i]}`;           
          fInputs.push(inputObj);
        }              
        const arrayLength = contractFunctionsFormatted.length;
        contractFunctionsFormatted.push({arrayLength, property, functionSignature, fInputs});
      }
    }

    return (
      <View>
        {
          contractFunctionsFormatted.map((item) =>
            <View key={item.arrayLength} style={styles.functionContainer}>   
              <View style={styles.functionInputContainer}>                       
                <Text>Signature: {item.functionSignature} </Text>
              </View>
              {
                item.fInputs.map((inputObject) =>
                <View key={`${item.arrayLength}${inputObject.uniquekey}`}>
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
                   <ClearButton
                        buttonText= {`update ${inputObject.inputName}`}
                        onClickFunction={(text) => this.executeContractFunction(text, inputObject.inputName, inputObject.type, item.functionSignature)}
                        customStyles={styles.btnFunctionInput}
                      />
                </View>
              )
              }        
            </View>
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
                    showMenu={true}
                    showBack={true}
                    // navigation={this.props.navigation}
                  />
              </View>
              <Text style={styles.textHeader}>Contract Interaction</Text>
                {
                  this.state.contractFunctions === null
                    ?
                    <View style={styles.topFormInput}>
                      <Text style={styles.textDescription}>Load contract address</Text>                       
                        <FormInput
                          placeholder={'Contract Address'}
                          onChangeText={(add) => { return this.setState({ address: add }); }}
                          inputStyle={styles.inputContactName}
                          placeholderTextColor={'#b3b3b3'}
                          value={this.state.address}
                        />
                        <View style={styles.btnFlex}>
                          <ClearButton
                            buttonText='Load Contract'
                            onClickFunction={() => this.getContract(this)}
                            customStyles={styles.loadButton}
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
    flex: 2,
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  scrollViewContainer: {
    flex: 7,
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
  },
  scrollView: {
    height: '100%',
  },
  loadButton: {
    height: Dimensions.get('window').height * 0.082,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.75,
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
    // flex: 1,
  },
  textDescription: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(3),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.3,
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
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '100%',
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

const mapStateToProps = ({ Wallet }) => {
  const { wallets } = Wallet;
  return { wallets };
}

export default connect(mapStateToProps, null)(Contract);
