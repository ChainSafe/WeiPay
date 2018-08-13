import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import CoinList from '../../../../components/tokens/CoinList';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import TwoTabNavigator from '../../../../components/customPageNavs/TwoTabNavigatior';
import LinearButton from '../../../../components/LinearGradient/LinearButton';
import RF from "react-native-responsive-fontsize"

/**
 * React Screen Component
 * Screen to add more coins to the portfolio
 */
class Coins extends Component {
  /**
   * Allows you to navigate to the navigation drawer
   */
  navigate = () => {
    const navigateToPassphrase = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'portfolioScreen' })],
    });
    this.props.navigation.dispatch(navigateToPassphrase);
  };

  /**
   * Contains tha CoinList Component
   */
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <View style={styles.NavBarButton}>
            <BackWithMenuNav
              showMenu={true}
              showBack={true}
              navigation={this.props.navigation}
              backPage={'mainStack'}
            />
          </View>
          <View style={styles.tabNavContainer}>
            <TwoTabNavigator
              leftTabScreen={'AddCoin'}
              leftTabText={'Coins'}
              rightTabScreen={'AddToken'}
              rightTabText={'Tokens'}
              navigation={this.props.navigation}
            />
          </View>
          <View style={styles.coinListContainer}>
            <ScrollView  >
                <CoinList type={'tokens'} />
                {/* <CoinList /> */}
            </ScrollView>
          </View>
          <View style={styles.btnContainer}>
            <LinearButton
              onClickFunction={this.navigate}
              buttonText='Add Tokens'
              customStyles={styles.button}
            />
            <View style={styles.footerGrandparentContainer}>
                <View style={styles.footerParentContainer} >
                    <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1 ,
    backgroundColor: '#fafbfe',
  },
  NavBarButton: {
    flex: 0.5,
    justifyContent: 'center',
    paddingBottom: '2%',
  },
  tabNavContainer: {
    flex: 0.5,
    justifyContent: 'center',
    marginBottom: '2%',
  },
  coinListContainer: {
    alignItems: 'stretch',
    marginLeft: '9%',
    marginRight: '9%',
    flex: 5,
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
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

export default Coins;
