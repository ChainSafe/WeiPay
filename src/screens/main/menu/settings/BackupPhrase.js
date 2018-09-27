import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { encrypt, decrypt } from 'react-native-simple-encryption';
import BackWithMenuNav from "../../../../components/customPageNavs/BackWithMenuNav"
import BoxShadowCard from '../../../../components/ShadowCards/BoxShadowCard'
import LinearButton from '../../../../components/LinearGradient/LinearButton'
import RF from "react-native-responsive-fontsize"

const navigate = () => {
  const navigateToPassphrase = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
  });
  this.props.navigation.dispatch(navigateToPassphrase);
};

/**
 * Screen is used to display the passphrase (mnemonic) of the wallet
 */
class BackupPhrase extends Component {

  constructor(props) {
    super(props);
    const mn = decrypt(this.props.wallet.privateKey, this.props.mnemonic);
    
    this.state = { 
      isPhraseSelected: false,
      phrase: mn
    };
  }

  /**
   * Method is used to  enable the local state variable which enable the screen
   * to display the passphrase
   */
  displayPassphrase() {
    this.setState({
      isPhraseSelected: true
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
                    showMenu={true}
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
                            <Text style={styles.mnemonicText} >{this.state.phrase}</Text>
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
                          buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
                      />
                }
                <View style={styles.footerGrandparentContainer}>
                    <View style={styles.footerParentContainer} >
                        <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                    </View>
                </View>
            </View>            
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    )
  }
}

/**
 * Styles used in the BackupPhrase screen
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
})

const mapStateToProps = ({ newWallet }) => {
  const mnemonic = newWallet.mnemonic;
  const debugMode = newWallet.debugMode;
  const wallet = newWallet.wallet;
  return { mnemonic, debugMode, wallet }
}

export default connect(mapStateToProps, null)(BackupPhrase)
