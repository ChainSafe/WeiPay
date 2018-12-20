import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../../components/shadowCards/BoxShadowCard';
import LinearButton from '../../../../components/linearGradient/LinearButton';

// const ethers = require('ethers');

// unused
// const utils = ethers.utils;

// const navigate = () => {
//   const navigateToMenu = NavigationActions.reset({
//     index: 0,
//     actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
//   });
//   this.props.navigation.dispatch(navigateToMenu);
// };

/**
 * Screen is used to display the passphrase (mnemonic) of the wallet
 */
class BackupPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhraseSelected: false,
      // phrase: this.props.wallet.wallet.mnemonic,
      // phraseInDebug: this.props.wallet.wallet.privateKey, //TODO: Delete this and replace every call to phrase
      // mnemonic: this.props.wallet.wallet.mnemonic,
    };
  }

  /**
   * Method is used to  enable the local state variable which enable the screen
   * to display the passphrase
   */
  displayPassphrase() {
    this.setState({
      isPhraseSelected: true,
    });
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
              <Text style={styles.textHeader}>Backup Passphrase</Text>
              <View style={styles.boxShadowContainer}>
                <View style={styles.contentContainer}>
                    <BoxShadowCard>
                      {
                        this.state.isPhraseSelected
                        ?
                        <View>
                            <Text style={styles.cardText} >Please save this passphrase somewhere safe!</Text>
                            <Text style={styles.mnemonicText} >{this.props.wallet.wallet.mnemonic}</Text>
                        </View>
                        : <Text style={styles.cardText} >To view your recovery passphrase, select the button below</Text>
                      }

                    </BoxShadowCard>
                </View>
              </View>
            <View style={styles.btnContainer}>
                {
                    this.state.isPhraseSelected
                    ? null
                    : <LinearButton
                          onClickFunction={this.displayPassphrase.bind(this)}
                          buttonText= 'Show Recovery Passphrase'
                          customStyles={styles.button}
													// unnecessary
                          // buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
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
  boxShadowContainer: {
    alignItems: 'center',
    flex: 3,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
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
    flex: 2,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: '2.5%',
    marginTop: '2.5%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
});

const mapStateToProps = ({ newWallet, HotWallet }) => {
  const wallet = HotWallet.hotWallet;
  const debugMode = newWallet.debugMode;
  return { wallet, debugMode };
};

export default connect(mapStateToProps, null)(BackupPhrase);
