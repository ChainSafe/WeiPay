import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import { newWalletCreation } from '../../../actions/ActionCreator';
import provider from '../../../constants/Providers';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard';
import RF from "react-native-responsive-fontsize"
import processAllTokenBalances from '../../../scripts/tokenBalances';

const ethers = require('ethers');

/**
 * Screen used to recover a previously generated wallet
 */
class RecoverWallet extends Component {

    /**
     * Set the local state to keep track of the mnemonic entered to recover the wallet
     * @param {Object} props
     */
    constructor(props) {
      super(props);
      this.state = {
        mnemonic: '',
        value: '',
        buttonDisabled: true,
      };
    }

    /**
     * Navigates the state to view the enableTokens screen if the mnemonic entered
     * is valid otherwise an error is displayed
     */
    navigate = async () => {
      const navigateToTokens = NavigationActions.navigate({
        routeName: 'mainStack',
       });

      try {
        // const wallet = new ethers.Wallet('0x923ed0eca1cee12c1c3cf7b8965fef00a2aa106124688a48d925a778315bb0e5');
        // wallet.provider = provider;
        if (this.props.debugMode === true) {
          const wallet = new ethers.Wallet('0x923ed0eca1cee12c1c3cf7b8965fef00a2aa106124688a48d925a778315bb0e5');
          wallet.provider = provider;
          console.log(wallet);
          processAllTokenBalances(wallet.privateKey, [{'ETH': 0}]); //pass initial ETH flag and quantity as placeholder         
          this.props.newWalletCreation(wallet);
          this.props.navigation.dispatch(navigateToTokens);
        }else {
          let mnemonic, wallet;
          mnemonic = this.state.mnemonic.trim();
          wallet = ethers.Wallet.fromMnemonic(mnemonic);
          wallet.provider = provider;
          this.props.newWalletCreation(wallet); //pass state to redux to save it
          this.props.navigation.dispatch(navigateToTokens);
        }
        
      } catch (err) {
        Alert.alert(
          'Mnemonic Error',
          'Your mnemonic was invalid, please re-enter.',
          [
            // { text: 'OK', onPress: () => this.inputMnemonic.clearText() },
            { text: 'OK', onPress: () => console.log("not good") },
          ],
          { cancelable: false },
        );
      }
    };



    /**
     * Updates the local state with the latest mnemonic that was inputted in the input field
     * @param {String} mnemonicInput
     */
    renderRecoveryKey(mnemonicInput) {
      const totalWords = mnemonicInput.split(' ');
      if (totalWords.length == 12) {
        this.setState({ value: mnemonicInput.toLowerCase() });
        this.setState({ mnemonic: mnemonicInput.toLowerCase() });
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    }

    /**
     * Returns the form required to recover the wallet
     */
    render() {
      const {
        mainContainer,
        textHeader,
        navContainer,
        contentContainer,
        boxShadowContainer,
        cardText,
        txtMnemonic,
        btnContainer,
        button,
        footerGrandparentContainer,
        footerParentContainer,
        textFooter,
      } = styles;
        
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={mainContainer}>
                <View style={navContainer}>        
                  <BackWithMenuNav
                      showMenu={false}
                      showBack={true}
                      navigation={this.props.navigation}
                      backPage={'createWalletNameRecovered'}
                  />
                </View>
                <Text style={textHeader} >Recovery Passphrase</Text>
                <View style={boxShadowContainer}>
                  <View style={contentContainer} >
                      <BoxShadowCard>
                          <Text style={cardText}>
                              Enter your 12 word recovery passphrase to recover your wallet.
                          </Text>
                          <View style={styles.formInputContainer}>
                            <FormInput
                                placeholder={'Ex. man friend love long phrase ... '}
                                onChangeText={this.renderRecoveryKey.bind(this)}
                                inputStyle={txtMnemonic}

                            />
                          </View>
                      </BoxShadowCard>
                  </View>
                </View>
                <View style={btnContainer}>
                  <LinearButton
                      onClickFunction={this.navigate }
                      buttonText= 'Recover'
                      customStyles={button}
                      buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
                  />
                  <View style={footerGrandparentContainer}>
                      <View style={footerParentContainer}>
                          <Text style={textFooter} >Powered by ChainSafe </Text>
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
 * Styles used in the RecoverWallet screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
  },
  navContainer: {
    flex: 0.65,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.65,
  },
  boxShadowContainer:{
    alignItems: 'center', 
    flex: 2.5
  },
  contentContainer: {
    width: '82%',
    flex: 1,
  },
  cardText: {
      paddingBottom: '15%',
      paddingTop: '10%',
      paddingLeft: '10%',
      paddingRight: '10%',
      fontFamily: 'WorkSans-Light',
      letterSpacing: 0.4,
      lineHeight: RF(3.9),
      color: '#000000',
      fontSize: RF(2.4),
  },
  txtMnemonic: {
    width: '100%',
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontSize: RF(2.4),
    fontFamily: 'WorkSans-Regular',
    borderBottomWidth: 0.001
  },
  formInputContainer: {
    width: '90%',
    marginLeft: '5%',
  },
  btnContainer: {
    flex: 2.5,
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
    letterSpacing: 0.5
  },
});

/**
 * This method is not being used here
 * @param {Object} param
 */
const mapStateToProps = ({ newWallet }) => {
  const { debugMode } = newWallet;
  return { debugMode };
};


export default connect(mapStateToProps, { newWalletCreation })(RecoverWallet);
