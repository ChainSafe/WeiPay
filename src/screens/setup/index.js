import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { restoreWallet } from '../../actions/ActionCreator';
import LinearButton from '../../components/LinearGradient/LinearButton';
import ClearButton from '../../components/LinearGradient/ClearButton';
import RF from "react-native-responsive-fontsize"

/**
 * Initial setup screen used to allow the user to either restore a previously
 * generated wallet or to create a new one.
 */
class CreateOrRestore extends Component {
    /**
     * Method is used to navigate to the "createWalletName" if and only if the
     * user decides to create a new wallet
     */
    navigateCreate = () => {
      const navigateToWalletName = NavigationActions.navigate({
        routeName: 'createWalletName',
      });
      this.props.navigation.dispatch(navigateToWalletName);
    };

    /**
     * Method is used to navigate to the "createWalletNameRecovered" if and only if the
     * user decides to recover thier wallet
     */
    navigateRestore = () => {
      const navigateToRecover = NavigationActions.navigate({
        routeName: 'createWalletNameRecovered',
      });
      this.props.restoreWallet();
      this.props.navigation.dispatch(navigateToRecover);
    };

    /**
     * Returns a full screen component which presents the user with the choices in the form of
     * buttons
     */
    render() {
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.mainContainer}>
              <Text style={styles.textHeader}>WeiPay</Text>
              <Text style={styles.textHeaderDescription}>ERC20 Token Wallet </Text>
              <View style={styles.btnContainer} >
                  <View style={styles.btnCreate}>
                      <LinearButton
                          onClickFunction={this.navigateCreate}
                          buttonText= 'Create Wallet'
                          customStyles={styles.button}
                      />
                  </View>           
                  <ClearButton
                      onClickFunction={this.navigateRestore}
                      buttonText= 'Restore Wallet'
                      customStyles={styles.button}
                      unlockButton={true}
                  />              
              </View>
              <View style={styles.footerGrandparentContainer}>
                  <View style={styles.footerParentContainer} >
                    <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                  </View>
              </View>
          </View>
        </SafeAreaView>
      );
    }
}

/**
 * Styles used in the "CreateOrRestore" setup screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    backgroundColor: '#fafbfe',
    width: '100%',
    paddingTop: '45%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(5.3),
    marginBottom: '-2%',
    letterSpacing: 1.1,
    color: '#1a1f3e',
  },
  textHeaderDescription: {
    color: '#1a1f3e',
    fontFamily: 'Cairo-Regular',
    fontSize: RF(2.1),
    letterSpacing: 2.5,
  },
  btnContainer: {
    alignItems: 'stretch',
    width: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,  
  },
  btnCreate: {
    marginBottom: '3.5%',
    marginTop: '7.5%',
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: '5%',
    flex: 1.25,
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

export default connect(null, { restoreWallet })(CreateOrRestore);
