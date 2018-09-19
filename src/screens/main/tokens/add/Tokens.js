import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView, RefreshControl
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/ActionCreator';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';
import CoinList from '../../../../components/tokens/CoinList';
import LinearButton from '../../../../components/LinearGradient/LinearButton';

/**
 * React Screen Component
 * Screen to add more coins to the portfolio
 */
class Coins extends Component {

  constructor(props){
    super(props);

    console.log(this.props.newWallet.tokens);
    

    this.state={
      tokens: this.props.newWallet.allTokens,
      searchedTokenName: "",
      refreshing: false,
    }
  }
  


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

 

  handleChangeText(input){
    try {
      console.log("----------");
      console.log(this.state.tokens[input]);
      this.setState({ searchedTokenName: input })
      console.log("----------");
      
    } catch (error) {
      console.log("DNE");
    }
  }

  addCustomToken = () => {
    //debugger;
    this.props.addTokenFromList(this.state.searchedTokenName, this.state.tokens[this.state.searchedTokenName])
    this.setState({ searchedTokenName: "", refreshing: true })
  }
  
  generateTokenList() {
    this.setState({ refreshing: false })
    return (
      <CoinList type={'tokens'} />
    );
  }

  /**
   * Contains tha CoinList Component
   */
  render() {
    //0.95
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          
          <View style={{ flex: 1 }}>
            <SearchBar
              value={this.state.searchedTokenName}
              lightTheme
              clearIcon
              searchIcon
              containerStyle={{backgroundColor: '#fafbfe' }}
              onChangeText={this.handleChangeText.bind(this)}
              placeholder='Enter token symbol' />
          </View>

          <View style={{flex: 1}}>
            <Text>{this.state.searchedTokenName}</Text>
          </View>
          <View style={{flex: 1}}>
            <LinearButton
              onClickFunction={this.addCustomToken}
              buttonText='Add this token'
              customStyles={styles.button}
            />
          </View>
          <View style={styles.coinListContainer}>
            <ScrollView  
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.generateTokenList}
                  />
                 }
            >
                <CoinList type={'tokens'} />
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
    backgroundColor: '#fafbfe',
  },
  mainContainer: {
    flex: 1,
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
    letterSpacing: 0.5,
  },
});

/**
 * Method is used  to reterive the newWallet object
 * from the global state variable.
 * Returns an object containing that reterived object
 * @param {Object} param0
 */
function mapStateToProps({ newWallet }) {
  return { newWallet };
}

export default connect(mapStateToProps, actions )(Coins);
