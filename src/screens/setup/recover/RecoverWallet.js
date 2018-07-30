import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FormInput, Card } from 'react-native-elements';
import { newWalletCreation } from '../../../actions/ActionCreator';
import provider from '../../../constants/Providers';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard';

const ethers = require('ethers');

/**
 * Screen used to recover a previously generated wallet
 */
class RecoverWallet extends Component {

    /**
     * Navigates the state to view the enableTokens screen if the mnemonic entered
     * is valid otherwise an error is displayed
     */
    navigate = () => {
      const navigateToTokens = NavigationActions.navigate({
        routeName: 'enableTokens',
      });

      try {
        /*
                Hardcoded to private key for testing
                var mnemonic, wallet;\
                mnemonic = this.state.mnemonic.trim();
                wallet = ethers.Wallet.fromMnemonic(mnemonic);
            */
        const wallet = new ethers.Wallet('0x923ed0eca1cee12c1c3cf7b8965fef00a2aa106124688a48d925a778315bb0e5');
        wallet.provider = provider;
        this.props.newWalletCreation(wallet); //pass state to redux to save it
        this.props.navigation.dispatch(navigateToTokens);
      } catch (err) {
        Alert.alert(
          'Mnemonic Error',
          'Your mnemonic was invalid, please re-enter.',
          [
            { text: 'OK', onPress: () => this.inputMnemonic.clearText() },
          ],
          { cancelable: false },
        );
      }
    };

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
        contentContainer,
        cardContainer,
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
                <View style={{flex: 0.75}}>        
                  <BackWithMenuNav
                      showMenu={false}
                      showBack={true}
                      navigation={this.props.navigation}
                      backPage={'createWalletNameRecovered'}
                  />
                </View>
                <Text style={textHeader} >Recovery Passphrase</Text>
                <View style={{alignItems: 'center', flex: 3}}>
                  <View style={contentContainer} >
                      <BoxShadowCard>
                          <Text style={cardText}>
                              Enter your 12 word recovery passphrase to recover your wallet.
                          </Text>
                          <FormInput
                              placeholder={'Ex. man friend love long phrase ... '}
                              onChangeText={this.renderRecoveryKey.bind(this)}
                              inputStyle={txtMnemonic}
                          />
                      </BoxShadowCard>
                  </View>
                </View>
                <View style={btnContainer}>
                  <LinearButton
                      onClickFunction={this.navigate }
                      buttonText= 'Recover'
                      customStyles={button}
                      buttonStateEnabled={this.state.buttonDisabled}
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
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: 26,
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.75,
  },
  contentContainer: {
    width: '82%',
    flex: 1,
  },
  cardText: {
    paddingBottom: '20%',
    paddingTop: '7.5%',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    fontSize: 16,
  },
  txtMnemonic: {
    width: '100%',
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Regular',
  },
  btnContainer: {
    flex: 2,
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
    fontSize: 11,   
    color: '#c0c0c0',
  },
});

export default connect(null, { newWalletCreation })(RecoverWallet);
