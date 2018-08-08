import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import CoinList from '../../../components/tokens/CoinList';
import LinearButton from '../../../components/LinearGradient/LinearButton'
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import RF from "react-native-responsive-fontsize"

/**
 * Screen used to aquire the tokens/coins that the user wants to use
 * in their portfolio
 */
class EnableCrypto extends Component {
    state = {
      tokenList: this.props.tokenList,
      changeState: true,
    }

    /**
     * Method used to navigate to the main portfolio Screen
     */
    navigate = () => {
      const navigateToPassphrase = NavigationActions.navigate({ routeName: 'mainStack' });
      this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Main Component
     * Contains the CoinList Component and button.
     * Where the button is simply acting as navigating button (going from one screen to another)
     * which stays disabled until at least one coin/token has been selected.
     */
    render() {
      const {
        safeAreaView,
        mainContainer,
        headerContainer,
        textHeader,
        coinListContainer,
        btnContainer,
        button,
        footerGrandparentContainer,
        footerParentContainer,
        textFooter
      } = styles;

      return (
        <SafeAreaView style={safeAreaView}>
            <View style={mainContainer}>
              <View style={headerContainer}>
                 <Text style={textHeader}>Enable Tokens </Text>
              </View>
              <View style={coinListContainer}>
                  <ScrollView >
                      <CoinList />
                  </ScrollView>
              </View>
              <View style={btnContainer} >
                <LinearButton
                    onClickFunction={this.navigate}
                    buttonText= 'Add'
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
 * Styles used in the EnableTokens screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  headerContainer: {
    flex:1,
    justifyContent:"flex-end"
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    marginLeft: '9%',
    color: '#1a1f3e',
  },
  coinListContainer: {
    alignItems: 'stretch',
    marginLeft: '9%',
    marginRight: '9%',
    flex: 4,
    paddingBottom: "2.5%",
  },
  btnContainer: {
    flex: 1,
    width: '100%',
    flex:1
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    // backgroundColor:"yellow",
    marginBottom: '2.5%',
    marginTop: '2.5%'
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
  // footerContainer: {
  //   alignItems: 'center',
  // },
  // textFooter: {
  //   fontFamily: 'WorkSans-Regular',
  //   fontSize: 11,
  //   marginBottom: '3.5%',
  //   alignItems: 'center',
  //   color: '#c0c0c0',
  // },
});

/**
 * Reterives the list of tokens that have been selected by the user.
 * Method returns an object which contains the token list
 * @param {Object} state
 */
const mapStateToProps = state => ({
  tokenList: state.newWallet.tokens,
});

export default connect(mapStateToProps)(EnableCrypto);
