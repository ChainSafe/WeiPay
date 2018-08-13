import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView } from 'react-native';
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

    const {
      safeAreaView,
      mainContainer,
      NavBarButton,
      tabNavContainer,
      coinListContainer,
      btnContainer,
      button,
      footerGrandparentContainer,
      footerParentContainer,
      textFooter,
    } = styles;

    return (
      <SafeAreaView style={safeAreaView}>
        <View style={mainContainer}>
          <View style={NavBarButton}>
            <BackWithMenuNav 
              showMenu={true}
              showBack={true}
              navigation={this.props.navigation}
              backPage={'mainStack'}
            />
          </View>          
          <View style={tabNavContainer}>
            <TwoTabNavigator
              leftTabScreen={'Coins'}
              leftTabText={'Coins'}
              rightTabScreen={'Tokens'}
              rightTabText={'Tokens'}
              Active={true}
              navigation={this.props.navigation}
            />
          </View>
          <View style={coinListContainer}>
            <ScrollView  >
                <CoinList type={'coins'} />
            </ScrollView>
          </View>

          <View style={btnContainer}>
            <LinearButton
              onClickFunction={this.navigate}
              buttonText='Add Coins'
              customStyles={button}
            />
            <View style={footerGrandparentContainer}>
                <View style={footerParentContainer} >
                    <Text style={textFooter} >Powered by ChainSafe </Text>
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
    flex: 0.65, 
    justifyContent: 'center',
    paddingBottom: '2%',
  },
  tabNavContainer: { 
    flex: 0.3, 
    justifyContent: 'center',
    marginBottom: '2%',
  },
  coinListContainer: {
    alignItems: 'stretch',
    marginLeft: '9%',
    marginRight: '9%',
    flex:5,
    paddingBottom: "2.5%",
    paddingTop: "2.5%",
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
});

export default Coins;
