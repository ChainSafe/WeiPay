import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FormInput, Card } from 'react-native-elements';
import { newWalletCreation, newWalletNameEntry } from '../../../actions/ActionCreator';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard';
import RF from "react-native-responsive-fontsize"

/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * the wallet has been recovered
 */
class CreateWalletName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
    };
  }

    /**
     * Method is used to navigate back to the recoverWallet screen.
     */
    navigate = () => {
      const navigateToPassphrase = NavigationActions.navigate({ routeName: 'recoverWallet' });
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
      const {
        safeAreaView,
        mainContainer,
        navContainer,
        textHeader,
        boxShadowContainer,
        contentContainer,
        cardContainer,
        cardText,
        txtWalletName,
        btnContainer,
        button,
        footerGrandparentContainer,
        footerParentContainer,
        textFooter,
      } = styles;

      return (
        <SafeAreaView style={safeAreaView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={mainContainer}>
                <View style={navContainer}>        
                  <BackWithMenuNav
                      showMenu={false}
                      showBack={true}
                      navigation={this.props.navigation}
                      backPage={'createOrRestore'}
                    />
                </View>
                <Text style={textHeader}>Wallet Name</Text>
                <View style={boxShadowContainer}>
                  <View style={contentContainer}>
                      <BoxShadowCard>
                          <Text style={cardText}>
                              Create a name for your wallet, for example: My Wallet
                          </Text>
                          <FormInput
                              placeholder={'Ex. My Wallet'}
                              onChangeText={this.getWalletName.bind(this)}
                              inputStyle={txtWalletName}
                          />
                      </BoxShadowCard>
                  </View>
                </View>
              <View style={btnContainer}>
                  <LinearButton
                      onClickFunction={this.navigate }
                      buttonText= 'Next'
                      customStyles={button}
                      buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
                  />
                  <View style={footerGrandparentContainer}>
                      <View style={footerParentContainer} >
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
 * Styles used in the "CreateWalletNameRecovery" screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: '#fafbfe'
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
    flex: 3
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: 'black',
    flex: 0.75, 
  },
  contentContainer: {
    width: '82%',
    flex: 1,
  },
  cardContainer: {
    width: '82%',
  },
  cardText: {
    paddingBottom: '20%',
    paddingTop: '7.5%',
    paddingLeft: '7.5%',
    paddingRight: '7.55%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    color: '#000000',
    fontSize: RF(2.5),
  },
  txtWalletName: {
    width: '100%',
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Regular',  
  },
  btnContainer: {
    flex:2,
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
    marginBottom: '3%',
    marginTop: '3%',
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
  const { walletName } = newWallet;
  const { debugMode } = newWallet;

  return { walletName, debugMode };
};

export default connect(mapStateToProps, { newWalletNameEntry, newWalletCreation })(CreateWalletName);
