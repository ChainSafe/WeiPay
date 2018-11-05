import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert, Dimensions, Keyboard, TouchableWithoutFeedback, SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import { initializeAppWallet } from '../../../actions/AppConfig';
import getNetworkProvider from '../../../constants/Providers';
import LinearButton from '../../../components/linearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/shadowCards/BoxShadowCard';

const ethers = require('ethers');

class RecoverWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      value: '',
      buttonDisabled: true,
    };
  }

    /**
     * A new wallet is initialized and created with a wallet name.
     */
    navigate = async () => {
      try {       
        if (this.props.debugMode === true) {        
          const wallet = new ethers.Wallet('0x923ed0eca1cee12c1c3cf7b8965fef00a2aa106124688a48d925a778315bb0e5');        
          const navigateToCreateWalletName = NavigationActions.navigate({
            routeName: 'createWalletNameRecovered',
            params: { 'wallet': wallet },
          });
          this.props.navigation.dispatch(navigateToCreateWalletName);
        } else {
          const mnemonic = this.state.mnemonic.trim();  
          currentWalletName = this.props.tempWalletName;
          const provider = await getNetworkProvider(this.props.network);
          const wallet = ethers.Wallet.fromMnemonic(mnemonic);
          wallet.provider = provider;
          console.log({wallet});
          
          const navigateToCreateWalletName = NavigationActions.navigate({
            routeName: 'createWalletNameRecovered',
            params: { 'wallet': wallet },
          });
          this.props.navigation.dispatch(navigateToCreateWalletName);
        }     
      } catch (err) {
        Alert.alert(
          'Mnemonic Error',
          'Your mnemonic was invalid, please re-enter.',
          [ 
            { text: 'OK', onPress: () => console.log('error')},           
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
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.mainContainer}>
                <View style={styles.navContainer}>        
                  <BackWithMenuNav
                      showMenu={false}
                      showBack={true}
                      navigation={this.props.navigation}
                      backPage={'createWalletNameRecovered'}
                  />
                </View>
                <Text style={styles.textHeader} >Recovery Passphrase</Text>
                <View style={styles.boxShadowContainer}>
                  <View style={styles.contentContainer} >
                      <BoxShadowCard>
                          <Text style={styles.cardText}>
                              Enter your 12 word recovery passphrase to recover your wallet.
                          </Text>
                          <View style={styles.formInputContainer}>
                            <FormInput
                                placeholder={'Ex. man friend love long phrase ... '}
                                onChangeText={this.renderRecoveryKey.bind(this)}
                                inputStyle={styles.txtMnemonic}
                            />
                          </View>
                      </BoxShadowCard>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <LinearButton
                      onClickFunction={this.navigate }
                      buttonText= 'Recover'
                      customStyles={styles.button}
                      buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
                  />
                  <View style={styles.footerGrandparentContainer}>
                      <View style={styles.footerParentContainer}>
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
  boxShadowContainer: {
    alignItems: 'center',
    flex: 2.5,
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
    borderBottomWidth: 0.001,
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
    letterSpacing: 0.5,
  },
});

/**
 * This method is not being used here
 * @param {Object} param
 */
const mapStateToProps = ({ Debug, Wallet }) => {
  const { debugMode, testWalletName } = Debug;
  const { wallets, tempWalletName, appPassword, network, } = Wallet;
  return { debugMode, testWalletName, wallets, tempWalletName, appPassword, network };
};

export default connect(mapStateToProps, { initializeAppWallet })(RecoverWallet);
