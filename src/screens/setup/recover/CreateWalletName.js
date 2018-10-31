import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import { setTempWalletName } from '../../../actions/AppConfig';
import LinearButton from '../../../components/linearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/shadowCards/BoxShadowCard';


/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * the wallet has been recovered
 */
class CreateWalletName extends Component {
    /**
     * Method is used to navigate back to the recoverWallet screen.
     */
    navigate = () => {
      const navigateToPassphrase = NavigationActions.navigate({ 
        routeName: 'password',
        params: { 'nextScreenToNavigate' : 'mainStack', 'wallet': this.props.navigation.state.params.wallet },
      });
      this.props.navigation.dispatch(navigateToPassphrase);
    };

    getWalletName(name) {
      this.props.setTempWalletName(name);
    }

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
                      backPage={'createOrRestore'}
                    />
                </View>
                <Text style={styles.textHeader}>Wallet Name</Text>
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
                        onClickFunction={ this.navigate }
                        buttonText= 'Next'
                        customStyles={styles.button}
                        buttonStateEnabled= { this.props.testWalletName === null && this.props.tempWalletName === null }
                    />
                    <View style={styles.footerGrandparentContainer}>
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
    flex: 0.65,
  },
  boxShadowContainer: {
    alignItems: 'center', 
    flex: 2.5
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: 'black',
    flex: 0.65, 
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
  txtWalletName: {
    width: '100%',
    fontSize: RF(2.4),
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Regular',  
    borderBottomWidth: 0.0001,
  },
  formInputContainer: {
    width: '92%',
    marginLeft: '5%',
  },
  btnContainer: {
    flex:2.5,
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
    color: '#12c1a2',
    marginLeft: 50
  },
});

const mapStateToProps = ({ Debug, Wallet }) => {
  const { debugMode, testWalletName } = Debug;
  const { wallets, tempWalletName } = Wallet;
  return { debugMode, wallets, tempWalletName, testWalletName };
};

export default connect(mapStateToProps, { setTempWalletName })(CreateWalletName);
