import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView, RefreshControl
} from 'react-native';
// import { SearchBar } from 'react-native-elements';
import SearchBar from 'react-native-material-design-searchbar';
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
  constructor(props) {
    super(props);
    this.state = {
      tokens: this.props.newWallet.allTokens,
      searchedTokenSym: '',
      searchedTokenName: '',
      searchedTokenNameAdd: '',
      refreshing: false,
    };
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

  handleChangeText(input) {
    try {
      this.setState({ searchedTokenSym: input});
      if (this.state.tokens[input] != null) {
        this.setState({searchedTokenName: 'NA', searchedTokenNameAdd: this.state.tokens[input]['contract_address']  });
        if (this.state.tokens[input]['name'] != null) {
          this.setState({ searchedTokenName: this.state.tokens[input]['name']});
        }
      }else {
        this.setState({ searchedTokenName: '', searchedTokenNameAdd: '' });
      }
    } catch (error) {
      console.log('DNE');
    }
  }

  addCustomToken = () => {
    try {
      const token = this.state.tokens[this.state.searchedTokenSym];
      if (token != null) {
        if (token['name'] != null) {
          this.props.addTokenFromList(token['name'] ,this.state.searchedTokenSym, token['contract_address']);
        }else {
          this.props.addTokenFromList('NA' ,this.state.searchedTokenSym, token['contract_address']);
        }
        this.setState({ searchedTokenSym: '', searchedTokenName: '', searchedTokenNameAdd: ''});
      }
    } catch (error) {
      console.log('DNE');
    }
  }

  //fafbfe
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <View style={styles.searchComponent}>
            <SearchBar
              onSearchChange={() => this.handleChangeText.bind(this)}
              height={50}
              onFocus={() => console.log('On Focus')}
              onBlur={() => console.log('On Blur')}
              placeholder={'Search...'}
              autoCorrect={false}
              padding={5}
              returnKeyType={'search'}
            />
            {/* <SearchBar
              value={this.state.searchedTokenSym}
              lightTheme
              round
              clearIcon
              searchIcon
              containerStyle={{ backgroundColor: 'green', }}             
              inputStyle={{ backgroundColor: '#ffffff', color: '#12c1a2', }}
              onChangeText={this.handleChangeText.bind(this)}
              placeholder='Enter token symbol' /> */}
          </View>
          <View style={styles.sizeComponent}>
            <Text style={styles.displayText}>Name : {this.state.searchedTokenName}</Text>
            <Text style={styles.displayText}>Address:
              <Text style={{fontSize: RF(2.0)}}>{this.state.searchedTokenNameAdd}</Text>
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <LinearButton
              onClickFunction={this.addCustomToken}
              buttonText='Add this token'
              customStyles={styles.button} />
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
    // backgroundColor: '#fafbfe',
    backgroundColor: 'purple',
  },
  searchComponent: {
    flex: 1,
    marginLeft: '9%',
    marginRight: '9%',
    marginTop: '5%',
    backgroundColor: 'blue',
  },
  sizeComponent: {
    flex: 1,
    marginLeft: '9%',
    marginRight: '9%'
  },

  displayText: {
    fontSize: RF(4),
    color: '#000000',
     fontFamily: 'Cairo-Regular'
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
