import React, { Component } from 'react';
import {
  View, TouchableWithoutFeedback, StyleSheet, Text, Keyboard, Dimensions, SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import { FormInput } from 'react-native-elements';
import * as actions from '../../../actions/AppConfig';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import ClearButton from '../../../components/LinearGradient/ClearButton';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';


const ethers = require('ethers');

/**
 * Initial pin screen. encrypts a new wallet
 * 
 * By default the hotWallet will reference this wallet
 */
class PinPage extends Component {
  /**
   * A new wallet is created, the wallet name is passed in along with usersWallets, which will be an 
   * empty array when user initially creates a wallet in setup.
   */
  constructor(props) {
    super(props);
    this.state = {
      walletObjecet: {},     
      password: "",
      isValidLength: false,
    }
  }

  /**
 * this.props.isInSetupScreens will be false if the user has not entered the main page and completed
 * the app setup. This will be an indication on whether we are going to be decrypting wallet from the 
 * state or will be passed a unencrypted wallet from the previous page.
 * 
 * After the user initializes the app, set isInSetupScreen to false - this will persist
 * 
 * If true -> take wallet from nav param & encrypt with password from state, initiali wallets with this
 *  - setHotWallet with unencrypted wallet, public key in action creator, and wallet name
 *  - set isInSetupScreens to false so we dont repeat this process when app loads again 
 * 
 * If false -> need to get wallet & decrypt & save to hot wallet
 */
setPin = async () => {
    if (this.state.password.length >= 4) {
      const userWallets = this.props.wallets;
      let walletNameCheck;
      if(this.props.debugMode) {
        walletNameCheck = this.props.testWalletName;
      } else {
        walletNameCheck = this.props.tempWalletName;
      }    
      if(this.props.isInSetupScreens) {
        const { nextScreenToNavigate, wallet } = this.props.navigation.state.params;
        await this.setState({ walletObjecet: wallet });
        var utf8BytesPassword = ethers.utils.toUtf8Bytes(this.state.password);
        var hashed = ethers.utils.keccak256(utf8BytesPassword);
        this.props.setAppPassword(hashed);
        const walletInHotReducer = { wallet, name: walletNameCheck };
        this.props.setHotWallet(walletInHotReducer);
        this.props.initializeAppWallet(wallet, walletNameCheck, userWallets);
        this.props.exitSetup(false);
        // this.props.setSecurityFlag(true);
        const navigateToNextScreen = NavigationActions.navigate({
          routeName: nextScreenToNavigate,
        });
        this.props.navigation.dispatch(navigateToNextScreen);
      } else {
        var utf8BytesPasswordToDecrypt = ethers.utils.toUtf8Bytes(this.state.password);
        var hashedInput = ethers.utils.keccak256(utf8BytesPasswordToDecrypt);
        if(this.props.hashedPassword === hashedInput) {
          const walletInHotReducerDecrypted = { wallet: this.props.wallets[0].hdWallet, name: walletNameCheck };
          this.props.setHotWallet(walletInHotReducerDecrypted);          
          const navigateToMain = NavigationActions.navigate({
            routeName: 'mainStack',
          });
          this.props.navigation.dispatch(navigateToMain);
        }
      } 
    } 
  };

  /**
   * The wallet name is stored in a temporary state.
   */
  setPassword(password) {
    this.setState({ password: password });
  }

  render() {
    return (
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer} >
              <View style={styles.navContainer}>
                <BackWithMenuNav
                  showMenu={false}
                  showBack={false}
                  navigation={this.props.navigation}
                  backPage={'createOrRestore'}
                />
              </View>
              {
                this.props.isInSetupScreens
                ? 
                <View style={{flex:3.5}}> 
                  <Text style={styles.textHeader}>Choose Wallet Security</Text>
                    <View style={styles.boxShadowContainer}>
                      <View style={styles.contentContainer}>
                        <BoxShadowCard>
                          <Text style={styles.option}>
                          Option 1: Max Security - 10x longer to unlock wallet
                          </Text>
                          <Text style={styles.cardText}>
                            Create a password for wallet, minimum length of 4.
                          </Text>
                          <View style={styles.formInputContainer}>
                            <FormInput
                              placeholder={'1234'}
                              onChangeText={this.setPassword.bind(this)}
                              inputStyle={styles.txtWalletName}
                              secureTextEntry={true}
                            />
                          </View>
                          <View style={styles.btnNextContainer}>
                            <ClearButton
                              onClickFunction={this.setPin}
                              buttonText="Set Pin"
                              customStyles={styles.btnNext}
                              buttonStateEnabled= { this.props.testWalletName === null && this.props.tempWalletName === null }
                            />
                          </View>
                        </BoxShadowCard>
                      </View>
                    </View>
                  </View>
                : null
              }
              {
                this.props.isInSetupScreens === false
                ?  
                <View style={{flex:1.5}}> 
                  <Text style={[styles.textHeader, {marginBottom:'2.5%'}]}>Wallet Password</Text>
                    <View style={styles.boxShadowContainer}>
                      <View style={styles.contentContainer}>
                        <BoxShadowCard>
                          <Text style={[styles.cardText, { marginTop:'10%' }]}>
                            Enter Pin
                          </Text>
                          <View style={styles.formInputContainer}>
                            <FormInput
                              placeholder={'1234'}
                              onChangeText={this.setPassword.bind(this)}
                              inputStyle={styles.txtWalletName}
                              secureTextEntry={true}
                            />
                          </View>
                          <View style={styles.btnNextContainer}>
                            <LinearButton
                                onClickFunction={this.setPin}
                                buttonText="Enter"
                                customStyles={styles.btnNext}
                                buttonStateEnabled= { this.props.testWalletName === null && this.props.tempWalletName === null }
                            />
                          </View>
                        </BoxShadowCard>
                      </View>
                    </View>
                  </View>
                : null
              }
              <View style={styles.btnContainer}>
                <View style={styles.footerGrandparentContainer} >
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

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fafbfe',
    width: '100%',
  },
  navContainer: {
    flex: 0.3,
  },
  boxShadowContainer: {
    alignItems: 'center',
    flex: 3.5,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.5,
  },
  contentContainer: {
    flex: 1,
    width: '82%',
  },
  option: {
    paddingBottom: '5%',
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    lineHeight: RF(3.9),
    color: '#000000',
    fontSize: RF(2.5),
    fontWeight: '500',
  },
  cardText: {
    // paddingBottom: '15%',
    // paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    lineHeight: RF(3.9),
    color: '#000000',
    fontSize: RF(2.4),
  },
  txtWalletName: {
    width: '100%',
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    borderBottomWidth: 0.001,
  },
  formInputContainer: {
    width: '90%',
    marginLeft: '5%',
  },
  btnContainer: {
    flex: 0.5,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '100%',
  },
  btnNextContainer: {
    paddingTop: '5%',
  },
  btnNext: {
    width: '82%',
    height: Dimensions.get('window').height * 0.05,
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
  defaultGreenColor: {
    color: '#12c1a2',
  },
});

/**
 * This method is not being used here
 * @param {Object} param
 */
const mapStateToProps = ({ Debug, Wallet }) => {
  const { debugMode, testWalletName } = Debug;
  const { wallets, tempWalletName, isInSetupScreens, hashedPassword } = Wallet;
  return { debugMode, wallets, tempWalletName, testWalletName, isInSetupScreens, hashedPassword };
};

export default connect(mapStateToProps, actions)(PinPage);
