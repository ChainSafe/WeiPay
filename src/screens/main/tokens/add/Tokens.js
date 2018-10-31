import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text, SafeAreaView, RefreshControl, TextInput,
} from 'react-native';
import { FormLabel } from 'react-native-elements';
import SearchBar from 'react-native-material-design-searchbar';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';
import * as actions from '../../../../actions/ActionCreator';
import LinearButton from '../../../../components/LinearGradient/LinearButton';
import TokenConfig from '../../../../scripts/tokens/tokenConfig';
import { addNewToken } from '../../../../actions/AppConfig';

/**
 * React Screen Component
 * Screen to add more coins to the portfolio
 */
class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: this.props.allTokens,
      searchedTokenSym: '',
      searchedTokenName: '',
      searchedTokenNameAdd: '',
      refreshing: false,
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

  handleChangeText(input) {
    const inputUpperCase = input.toUpperCase();
    try {
      this.setState({ searchedTokenSym: inputUpperCase });
      if (this.state.tokens[inputUpperCase] != null) {
        this.setState({  buttonEnabled: true , searchedTokenName: 'NA', searchedTokenNameAdd: this.state.tokens[inputUpperCase]['contract_address'] });
        if (this.state.tokens[inputUpperCase]['name'] != null) {
          this.setState({ searchedTokenName: this.state.tokens[inputUpperCase]['name'], tokenLoaded: true});       
        }
      } else {
        this.setState({ buttonEnabled: false, searchedTokenName: '', searchedTokenNameAdd: '' });
      }
    } catch (error) {
      console.log('DNE');
    }
  }

  addCustomToken = () => {
    try {
      const token = this.state.tokens[this.state.searchedTokenSym];
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
              placeholder={'Search...'}
              autoCorrect={false}
              padding={5}
              returnKeyType={'search'}
            />
            {
              this.state.tokenLoaded 
              ?
                <View style={styles.inputContainer}>
                  <FormLabel style={styles.displayText}>Name</FormLabel>

                  <View style={styles.formInputContainer}>
                    <TextInput style={styles.textInput} value={this.state.searchedTokenName} editable={false} />
                  </View>
                  <FormLabel style={styles.displayText}>Contract Address</FormLabel>
                  <View style={styles.formInputContainer}>
                    <TextInput style={styles.textInput} value={this.state.searchedTokenNameAdd} editable={true} />
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
})(Coins);
