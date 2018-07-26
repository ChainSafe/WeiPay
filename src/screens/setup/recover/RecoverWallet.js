import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, Platform } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';
import { newWalletCreation } from '../../../actions/ActionCreator';
import provider from '../../../constants/Providers';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
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
        routeName: "enableTokens",
      });

      try {
        /*
                Hardcoded to private key for testing
                var mnemonic, wallet;\
                mnemonic = this.state.mnemonic.trim();
                wallet = ethers.Wallet.fromMnemonic(mnemonic);
            */
        const wallet = new ethers.Wallet("0x923ed0eca1cee12c1c3cf7b8965fef00a2aa106124688a48d925a778315bb0e5");
        wallet.provider = provider;
        this.props.newWalletCreation(wallet); //pass state to redux to save it
        this.props.navigation.dispatch(navigateToTokens);
      }
      catch (err) {
        Alert.alert(
          'Mnemonic Error',
          'Your mnemonic was invalid, please re-enter.',
          [
            { text: 'OK', onPress: () => this.inputMnemonic.clearText() },
          ],
          { cancelable: false }
        )
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
      };
    }

    /**
     * Updates the local state with the latest mnemonic that was inputted in the input field 
     * @param {String} mnemonicInput
     */
    renderRecoveryKey(mnemonicInput) {
      this.setState({ value: mnemonicInput.toLowerCase() })
      this.setState({ mnemonic: mnemonicInput.toLowerCase() });
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
            <View style={mainContainer}>
                <BackWithMenuNav
                    showMenu={false}
                    showBack={true}
                    navigation={this.props.navigation}
                    backPage={'createWalletNameRecovered'}
                />
                <Text style={textHeader} >Recovery Passphrase</Text>   
                <View style={contentContainer} >
                    <Card containerStyle={cardContainer}>
                        <Text style={cardText}>
                            Enter your 12 word recovery passphrase to recover your wallet.
                        </Text>
                        <FormInput
                            placeholder={'Ex. man friend love long phrase ... '}
                            onChangeText={this.renderRecoveryKey.bind(this)}
                            inputStyle={txtMnemonic}
                         />
                    </Card>
                </View>
                <View style={btnContainer}>
                    <LinearButton
                        onClickFunction={this.navigate }
                        buttonText= 'Recover'
                        customStyles={button}
                    />
                </View>
                <View style={footerGrandparentContainer}>
                    <View style={footerParentContainer}>
                        <Text style={textFooter} >Powered by ChainSafe </Text>
                    </View>
                </View>
            </View>
      );
    }
}

/**
 * Styles used in the RecoverWallet screen
 */
const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    paddingTop: '5%',
    backgroundColor: '#fafbfe',
    width: '100%',
    height: '100%',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: 24,
    paddingLeft: '9%',
    paddingBottom: '3%',
    color: '#1a1f3e',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  cardContainer: {
    width: '82%',
    height: '55%',
    borderRadius: 7.5,
    shadowOpacity: 0.5,
    shadowRadius: 1.3,
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 1, height: 2 },
  },
  cardText: {
    paddingBottom: '20%',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
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
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    width: '82%',
  },
  footerGrandparentContainer: {
    alignItems: 'center',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
    marginTop: '3.5%',
    color: '#c0c0c0',
  },
});

export default connect(null, { newWalletCreation })(RecoverWallet);
