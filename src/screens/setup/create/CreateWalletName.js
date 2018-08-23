import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text, Keyboard, Platform, Dimensions, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FormInput, Card } from 'react-native-elements';
import { newWalletCreation, newWalletNameEntry } from '../../../actions/ActionCreator';
import LinearButton   from '../../../components/LinearGradient/LinearButton'
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard'
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import RF from "react-native-responsive-fontsize"

const ethers = require('ethers');

/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * a new wallet has been created
 */
class CreateWalletName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
    };
  }

    /**
     * Method is used to save the newly generated wallet (via ethers.js) in the global state
     * variable and to navigate to the "generatePassphrase" screen
     */
    navigate = () => {
      const wallet = ethers.Wallet.createRandom();
      this.props.newWalletCreation(wallet);
      const navigateToPassphrase = NavigationActions.navigate({ routeName: 'generatePassphrase' });
      this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Executes the action "newWalletNameEntry" with "name" as the parameter
     * in order to update the name of the wallet in the global state variable
     * @param {String} name
     */
    getWalletName(name) {
      this.props.newWalletNameEntry(name);
      if (name !== '') {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    }

    /**
     * Main Component
     * Returns the form required for the user to set the name of their wallet
     */
    render() {
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer} >
              <View style={styles.navContainer}>
                <BackWithMenuNav
                  showMenu={false}
                  showBack={true}
                  navigation={this.props.navigation}
                  backPage={'createOrRestore'}
                />
              </View>
              <Text style={styles.textHeader} >Wallet Name</Text>
              <View style={styles.boxShadowContainer}>
                <View style={styles.contentContainer}>
                  <BoxShadowCard>
                    <Text style={styles.cardText}>
                      Create a name for your wallet, for example: My Wallet
                    </Text>
                    <View style={styles.formInputContainer}>
                      <FormInput
                        placeholder={'Ex. My Wallet'}
                        onChangeText={this.getWalletName.bind(this)}
                        inputStyle={styles.txtWalletName}
                      />
                    </View>
                  </BoxShadowCard>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <LinearButton
                  onClickFunction={this.navigate}
                  buttonText="Next"
                  customStyles={styles.button}
                  buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
                />
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
        backgroundColor: '#fafbfe'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fafbfe',
        width: '100%',
    },
    navContainer: {
        flex: 0.65,
    },
    boxShadowContainer: {
        alignItems: 'center',
        flex: 2.5,
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
        flex: 1,
        width: '82%',
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
    txtWalletName: {
        width: '100%',
        flexWrap: 'wrap',
        color: '#12c1a2',
        letterSpacing: 0.4,
        fontSize: 16,
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
    defaultGreenColor: {
        color: '#12c1a2'
    },
})

/**
 * This method is not being used here
 * @param {Object} param
 */
const mapStateToProps = ({ newWallet }) => {
  const { walletName } = newWallet;
  const debugMode = newWallet.debugMode
  return { walletName, debugMode };
};

export default connect(mapStateToProps, { newWalletNameEntry, newWalletCreation })(CreateWalletName);
