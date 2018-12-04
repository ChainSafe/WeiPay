import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Dimensions, SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';
import LinearButton from '../../components/linearGradient/LinearButton';
import ClearButton from '../../components/linearGradient/ClearButton';

class CreateOrRestore extends Component {
  navigateCreate = () => {
    const navigateToCreate = NavigationActions.navigate({
      routeName: 'createWalletName',
    });
    this.props.navigation.dispatch(navigateToCreate);
  };

  navigateRestore = () => {
    const navigateToMenmonic = NavigationActions.navigate({
      routeName: 'recoverWallet',
    });
    this.props.navigation.dispatch(navigateToMenmonic);
  };

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
        </View>
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
    backgroundColor: '#f4f7f9',
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
});

export default CreateOrRestore;
