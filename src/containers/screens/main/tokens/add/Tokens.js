import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text, SafeAreaView, RefreshControl, TextInput,
} from 'react-native';
import { FormLabel } from 'react-native-elements';
import SearchBar from 'react-native-material-design-searchbar';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';
import * as actions from '../../../../store/actions/ActionCreator';
import LinearButton from '../../../../components/linearGradient/LinearButton';
import TokenConfig from '../../../../../scripts/tokens/tokenConfig';
import { addNewToken } from '../../../../store/actions/creators/AppConfig';

/**
 * React Screen Component
 * Screen to add more coins to the portfolio
 */
class Tokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tokens: this.props.allTokens,
      searchedTokenSym: '',
      searchedTokenName: '',
      searchedTokenNameAdd: '',
      // refreshing: false,
      tokenLoaded: false,
      buttonEnabled: false,
    };
  }

  /**
   * Allows you to navigate to the navigation drawer
   */
  navigate = () => {
    const navigateToMain = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'portfolioScreen' })],
    });
    this.props.navigation.dispatch(navigateToMain);
  };

  refresh = () => {
    const refreshPage = NavigationActions.navigate({
      routeName: 'searchToken',
      params: { tab: 1 },
    });
    this.props.navigation.dispatch(refreshPage);
  }

  handleChangeText(input) {
    const inputUpperCase = input.toUpperCase();
    this.setState({ searchedTokenSym: inputUpperCase });
    
    try {
      if (this.props.allTokens[inputUpperCase] != null) {
	this.setState({ 
          buttonEnabled: true, tokenLoaded: true, 
	  searchedTokenName: this.props.allTokens[inputUpperCase].name ? this.props.allTokens[inputUpperCase].name : 'NA', 
	  searchedTokenNameAdd: this.props.allTokens[inputUpperCase]['contract_address'], 
	});

        // if (this.props.allTokens[inputUpperCase]['name'] != null) {
        //   this.setState({ searchedTokenName: this.props.allTokens[inputUpperCase]['name'], 
				// 								tokenLoaded: true});
        // }
      } else {
        this.setState({ buttonEnabled: false, searchedTokenName: '', searchedTokenNameAdd: '' });
      }
    } catch (error) {
      console.log('DNE');
    }
  }

  addCustomToken = () => {
    try {
      const token = this.props.allTokens[this.state.searchedTokenSym];
      let tokenName;
      if (token != null) {
        if (token['name'] != null) {
          tokenName = token['name'];
        } else {
          tokenName = 'NA';
        }
        const newTokenObj = TokenConfig('addNew', {
          "name": tokenName,
          "address": token['contract_address'],
          "symbol": this.state.searchedTokenSym,
          "id": this.props.tokens.length,
          "decimals": token['decimals'],
        });
        this.props.addNewToken(newTokenObj, this.props.tokens);
        this.setState({ buttonEnabled: false ,searchedTokenSym: '', searchedTokenName: '', searchedTokenNameAdd: ''});
      }
    } catch (error) {
      console.log('DNE');
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <View style={styles.searchComponent}>
            <SearchBar
              onSearchChange={(text) => { this.handleChangeText(text); }}
              height={50}
              onFocus={() => console.log('On Focus')}
              onBlur={() => console.log('On Blur')}
              placeholder={'Search ticker...'}
              autoCorrect={false}
              padding={5}
              returnKeyType={'search'}
              onClose={ ()=> {
                this.refresh();
              }}
              // onBackPress= { () => {
              //   this.refresh();
              // }}
            />
            {
              this.state.tokenLoaded
              ?
                <View style={styles.inputContainer}>
                  <FormLabel style={styles.displayText}>Name</FormLabel>

                  <View style={styles.formInputContainer}>
                    <TextInput style={styles.textInput} value={this.state.searchedTokenName} 
												editable={false} />
                  </View>
                  <FormLabel style={styles.displayText}>Contract Address</FormLabel>
                  <View style={styles.formInputContainer}>
                    <TextInput style={styles.textInput} value={this.state.searchedTokenNameAdd} 
															editable={true} />
                  </View>
              </View>
              : null
            }
          </View>
          <View style={styles.btnContainer}>
            <LinearButton
              onClickFunction={this.addCustomToken}
              buttonText='Add this token'
              buttonStateEnabled={!this.state.buttonEnabled}
              customStyles={styles.button} />
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
  navBar: {
    flex: 0.75,
    paddingBottom: '2%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  formInputContainer: {
    width: '92%',
    marginLeft: '5%',
  },
  inputContainer: {
    marginTop: '5%',
  },
  searchComponent: {
    flex: 1,
    marginLeft: '9%',
    marginRight: '9%',
    marginTop: '5%',
  },
  textInput: {
    width: '100%',
    flexDirection: 'column',
    fontSize: RF(2.4),
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Regular',
    borderBottomWidth: 0.0001,
  },
  displayText: {
    fontSize: RF(4),
    color: '#000000',
    fontFamily: 'Cairo-Regular',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    marginBottom: '2.5%',
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
function mapStateToProps({ Wallet }) {
  const { tokens, allTokens } = Wallet;
  return { tokens, allTokens };
}

export default connect(mapStateToProps, {
  actions, addNewToken,
})(Tokens);
