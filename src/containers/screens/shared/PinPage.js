import React, { Component } from 'react';
import {
  View, TouchableWithoutFeedback, StyleSheet, Text, Keyboard, Dimensions, SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import ethers from 'ethers';
import RF from 'react-native-responsive-fontsize';
import { FormInput } from 'react-native-elements';
import * as actions from '../../store/actions/creators/AppConfig';
import LinearButton from '../../components/linearGradient/LinearButton';
import BoxShadowCard from '../../components/shadowCards/BoxShadowCard';
import BackWithMenuNav from '../../components/customPageNavs/BackWithMenuNav';

class PinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletObjecet: {},
      password: '',
      isValidLength: false,
      error: null,
      resetInitiated: false,
      resetConfirmed: false,
    };
  }

  navigate = (route) => {
    const navigateToNextScreen = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateToNextScreen);
  }

  navigateReset = () => {
    const navigateToStart = NavigationActions.navigate({
      routeName: 'terms',
    });
    this.props.navigation.dispatch(navigateToStart);
  }

  checkPasswordLength = () => {
    return this.state.password.length >= 4;
  };

  getWalletName = () => {
    return this.props.debugMode ? this.props.testWalletName : this.props.tempWalletName;
  }

  checkProcess = () => {
    return this.props.isInSetupScreens;
  }

  encryptSerializedWallet = (wallet) => {
    const { password } = this.state;
    const ciphertext = CryptoJS.AES.encrypt(wallet, password);
    const ciphertextString = ciphertext.toString();
    this.props.encryptSerializedWallet(ciphertextString);
    return ciphertextString;
  }

  decryptKey = () => {
    const ciphertext = this.props.encryptedWallet;
    const { password } = this.state;
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }

  /**
   * If the next route is not generatePassphrase, you must obtain the wallet from
   * the recoverMnemonic page. You need to create the wallet in that page in order
   * to enforce a valid mnemonic entry.
   */
  setupEncyrptionProcess = async (walletName, userWallets) => {
    const { nextScreenToNavigate } = this.props.navigation.state.params;
    const isCreateStream = nextScreenToNavigate === 'generatePassphrase';
    let wallet;
    if (isCreateStream) {
      wallet = await ethers.Wallet.createRandom();
    } else {
      wallet = this.props.navigation.state.params.wallet;
    }
    const serialialedWallet = JSON.stringify(wallet);
    const encrypted = this.encryptSerializedWallet(serialialedWallet);
    const hotWalletObj = { wallet, name: walletName };
    this.props.setHotWallet(hotWalletObj);
    this.props.initializeAppWallet(encrypted, walletName, userWallets);
    this.props.exitSetup(false);
    this.navigate(nextScreenToNavigate);
  }

  appDecyprtionProcess = (walletName) => {
    const wallet = JSON.parse(this.decryptKey());
    if (Object.prototype.hasOwnProperty.call(wallet, 'privateKey')) {
      const hotWalletObj = { wallet, name: walletName };
      this.props.setHotWallet(hotWalletObj);
      this.navigate('mainStack');
    }
  }

  setPin = async () => {
    const isPasswordValid = this.checkPasswordLength();
    const walletName = this.getWalletName();
    const inSetup = this.checkProcess();
    const userWallets = this.props.wallets;
    if (isPasswordValid) {
      if (inSetup) {
        this.setupEncyrptionProcess(walletName, userWallets);
      } else {
        this.appDecyprtionProcess(walletName);
      }
    }
  };

  setPassword = (password) => {
    this.setState({ password });
  }

  resetApp = () => {
    this.props.nukeHotWallet();
    this.props.nukeNewWallet();
    this.props.nukeWallet();
    this.props.nukeContacts();
    this.props.nukeQr();
    this.navigateReset();
  }

  render() {
    const { resetInitiated } = this.state;
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
            <View style={styles.pinContainer} >
              <Text style={styles.textHeader}> { this.props.isInSetupScreens ? 'Choose Wallet Security' : 'Wallet Password' }</Text>
                <View style={styles.boxShadowContainer}>
                  <View style={styles.contentContainer}>
                    <BoxShadowCard>
                      <View style={styles.formFlexContainer}>
                        <View style={styles.inputFlexContainer}>
                          <Text style={resetInitiated ? styles.option : null}>
                            { resetInitiated ? 'Are you sure you want to reset' : null }
                          </Text>
                          {
                            resetInitiated
                              ? null
                              : <View>
                                <Text style={styles.cardText}>
                                  { this.props.isInSetupScreens
                                    ? 'Create a password for wallet, minimum length of 4.'
                                    : 'Enter Password'
                                  }
                                </Text>
                                <View style={styles.formInputContainer}>
                                  <FormInput
                                    placeholder={'1234'}
                                    onChangeText={this.setPassword.bind(this)}
                                    inputStyle={styles.txtWalletName}
                                    secureTextEntry={true}
                                    selectionColor={'#12c1a2'}
                                  />
                                </View>
                              </View>
                          }
                        </View>
                        {
                          this.props.isInSetupScreens
                            ? null
                            : <View style={styles.forgotContainer}>
                                <TouchableWithoutFeedback onPress={() => {
                                  return this.setState({ resetInitiated: true });
                                }}>
                                <View>
                                { resetInitiated ? null : <Text style={styles.forgotText}>Forgot Password </Text> }
                                </View>
                              </TouchableWithoutFeedback>
                            </View>
                        }
                        {
                          resetInitiated
                            ? <View style={styles.forgotContainer}>
                              <TouchableWithoutFeedback onPress={() => {
                                return this.setState({ resetInitiated: false });
                              }}>
                              <View>
                                <Text style={styles.forgotText}> Cancell Reset </Text>
                              </View>
                            </TouchableWithoutFeedback>
                            </View>
                            : null
                        }
                      </View>
                    </BoxShadowCard>
                  </View>
                </View>
                <View style={styles.btnNextContainer}>
                    <LinearButton
                      onClickFunction={ resetInitiated ? this.resetApp : this.setPin }
                      buttonText= {resetInitiated ? 'Reset Wallet' : 'Enter Pin' }
                      customStyles={styles.btnNext}
                      buttonStateEnabled= { this.props.testWalletName === null && this.props.tempWalletName === null }
                    />
                </View>
              </View>
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
    backgroundColor: '#f4f7f9',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f7f9',
    width: '100%',
  },
  navContainer: {
    flex: 0.65,
  },
  pinContainer: {
    flex: 5.65,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    paddingBottom: '5%',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.11,
  },
  boxShadowContainer: {
    alignItems: 'center',
    flex: 0.44,
  },
  contentContainer: {
    flex: 1,
    width: '82%',
  },
  formFlexContainer: {
    flex: 1,
  },
  inputFlexContainer: {
    flex: 3,
  },
  option: {
    paddingBottom: '5%',
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'Cairo-Light',
    letterSpacing: 0.4,
    fontSize: RF(2.4),
    color: '#000000',
  },
  cardText: {
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingBottom: '5%',
    paddingTop: '10%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    fontSize: RF(2.4),
    color: '#000000',
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
  forgotContainer: {
    flex: 0.75,
  },
  forgotText: {
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    lineHeight: RF(2.1),
    color: '#12c1a2',
    fontSize: RF(2.1),
    justifyContent: 'flex-end',
    display: 'flex',
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
    flex: 0.44,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '100%',
  },
  btnNext: {
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

const mapStateToProps = ({ Debug, Wallet }) => {
  const { debugMode, testWalletName } = Debug;
  const {
    wallets, tempWalletName, isInSetupScreens, encryptedWallet,
  } = Wallet;
  return {
    debugMode, wallets, tempWalletName, testWalletName, isInSetupScreens, encryptedWallet,
  };
};

export default connect(mapStateToProps, actions)(PinPage);
