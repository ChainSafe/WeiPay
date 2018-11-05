import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView, Platform, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import { NavigationActions } from 'react-navigation';
import LinearButton from '../../../components/linearGradient/LinearButton';
import { setWalletTokenBalances, fetchCoinData, calculateWalletBalance } from '../../../actions/FetchCoinData';
import { saveTokenDataForTransaction, saveAllTokenQuantities } from '../../../actions/AppConfig';
import processAllTokenBalances from '../../../scripts/tokens/tokenBalances'; //here
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/shadowCards/BoxShadowCard';
import getNetworkProvider from '../../../constants/Providers';

/**
 * Screen is used to display the wallet portfolio of the user, which contains the
 * tokens and the balance of the wallet
 */
class Portfolio extends Component {
  state = {
    provider: null,
    data: this.props.tokens,
    pricesLoaded: false,
    refresh: false,
    currencyIndex: 0,
    walletBalance: {},
    currency: this.props.currencyOptions,
    apiRequestString: '',
    tokenBalances: {},
    tokenAmounts: null,
    tokenPrices: [],
    completeTokenObject: null,
    currentWallet: this.props.hotWallet.wallet,
    currentWalletName: this.props.wallets[0].name,
  }

  /**
   * On initial app set up -> data will be default eth being loaded from default config
   * on subsequent launches it will pull from whatever tokens you have in the new wallet reducer - this data source will be removed
   * Based on the tokens in the reducer you will get a concatenated string for the api request that will return a matrix of tokens and their price arrays
   * fetch coin data then stores this data in the Balance Reducer tokenConversions array (Balance will be renamed to Wallet and newWalletReducer will be removed)
   * This array will have the following structure -> //  { ETH: {USD: 209.5, CAD: 285.32, ETH: 1, BTC: 0.03264, EUR: 178.06} SUB: {USD: 0.112, CAD: 0.1535, ETH: 0.000534, BTC: 0.00001743, EUR: 0.09506} }
   * The format tokens function takes our list of tokens and formats them in such a way to achieve 2 goals
   * 1) The concatenated api request url to get all prices
   * 2) Generates an array of Token objects that contain a symbol and contract address, ETH will have a null address and this allows us to distibguish which balance method we use.
   *  - This setup will allow us to pass lists of tokens along with the private key of the current wallet to manage multiple user wallets.
   * ProcessAllTokenBalances(privateKey, tokenObjectList) takes this data and returns { 'tokenSymbolString' : tokenApiRequestString, 'tokenBalances' : allBalances };
   * tokenApiRequestString is the concatenated URL string that is dynamically created whenever a user adds or removes a coin.
   * tokenBalances holds an array of objects -> [ { symbol: 'yourTokenSymbol', amount: 'How many tokens your wallet has' } ... ]
   * This logic is in scripts/tokenBalances
   *   - This will allow additional token support to added in a modular way with minimal config changes. (Additional ABI import and object flag)
   * Once we have all this data, we can invoke calculateWalletBalance(tokenBalances, this.props.Balance.tokenConversions);
   * This actionCreator will do 2 things
   *  1) Calculate the overall wallet balance given every token you have with the current api prices with your amount of tokens
   *  2) It will track all individual tokens a user has and how much their token holding is worth relative to USD, CAD, EUR, BTC, and ETH
   * The Balance (soon to be Wallet) reducer then updates state -> { ...state, walletBalance: walletBalanceObject, tokenBalances: individualTokens };
   */
  async componentDidMount() {
    const provider = await getNetworkProvider(this.props.network);
    this.setState({ provider });
    if (this.props.walletBalance == null) {
      await this.balanceCalculations();
    } else {
      await this.setState({
        walletBalance: this.props.walletBalance,
        tokenPrices: this.props.tokenBalances,
        tokenAmounts: this.props.tokenQuantities,
      });
      this.showTokens();
    }
  }

  balanceCalculations = async () => {
    const { tokenSymbolString, tokenBalances } = await this.formatTokens(this.state.data);
    this.props.saveAllTokenQuantities(tokenBalances);
    await this.props.fetchCoinData(tokenSymbolString);
    await this.props.calculateWalletBalance(tokenBalances, this.props.tokenConversions);
    await this.setState({
      apiRequestString: tokenSymbolString,
      walletBalance: this.props.walletBalance,
      tokenPrices: this.props.tokenBalances,
      tokenAmounts: tokenBalances,
    });
    this.showTokens();
  }
  /**
   * tokens are passed into the function where their symbols and addresses are parsed out and stored in an array,
   * which is then passed to processAllTokenBalances. The return is the concatenated string of symbols in wallet, and the amount
   * of each token the user has for a given private key.
   */
  formatTokens = async (tokenList) => {
    let tokenObjectList = [];
    for (let i = 0; i < tokenList.length; i++) {
      let tokenObj = {};
      tokenObj.symbol = tokenList[i].symbol;
      tokenObj.contractAddress = tokenList[i].address;
      tokenObj.decimals = tokenList[i].decimals;
      tokenObjectList.push(tokenObj);
    }
    const privateKey =  this.state.currentWallet.privateKey;
    return { tokenSymbolString, tokenBalances } = await processAllTokenBalances(privateKey, tokenObjectList, this.state.provider);
  }

  /**
   * After all price data has loaded, a new array will be created with all token info -> amount of tokens, price matrix of tokens,
   * and token info. This will be the data source for the flat list.
   */
  showTokens = () => {
    if (Object.prototype.hasOwnProperty.call(this.state.walletBalance, 'USD')) this.setState({ pricesLoaded: true });
    let cTokenObjectList = [];
    for(let i = 0; i < this.props.tokens.length; i++) {
      let cto = {};
      cto.tokenInfo = this.props.tokens[i];
      cto.tokenPriceInfo = this.props.tokenBalances[i];
      cto.tokenAmounts = this.state.tokenAmounts[i];
      cTokenObjectList.push(cto);
    }
    this.setState({ completeTokenObject: cTokenObjectList });
  }

  navigate = () => {
    const navigateToAddToken = NavigationActions.navigate({ routeName: 'AddTokenFunctionality' });
    this.props.navigation.dispatch(navigateToAddToken);
  };

  renderItemPress = () => {
    const navigateToAddToken = NavigationActions.navigate({ routeName: 'coinSend' });
    this.props.navigation.dispatch(navigateToAddToken);
  };

  renderRow = (token) => {
    const { tokenInfo, tokenPriceInfo, tokenAmounts } = token;

    if (tokenInfo.selected) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.saveTokenDataForTransaction(tokenAmounts.amount, tokenInfo.symbol, tokenInfo.address);
            this.props.navigation.navigate('TokenFunctionality');
          }}
          style={styles.listItemParentContainer}
          key={ `${tokenInfo.address}${tokenInfo.symbol}` }
        >
          <View>
            <BoxShadowCard customStyles={styles.boxShadowContainer}>
              <View style={[styles.contentContainer]}>
                <View style={styles.imgMainContainer} >
                  <View style={styles.imageContainer} >
                    <Image
                      style={styles.img}
                      source={ { uri: tokenInfo.logo } }
                    />
                  </View>
                </View>
                <View style={styles.listItemTextComponentContainer}>
                  <View style={ styles.listItemTextComponent }>
                    <View style={styles.mainTitleContainer}>
                      <Text style={styles.mainTitleText}> {tokenInfo.symbol} </Text>
                    </View>
                    <View style={styles.subtitleContainer}>
                      <Text style={styles.subTitleText}> {tokenInfo.name} </Text>
                    </View>
                  </View>
                </View>
                <View style={ styles.listItemValueContainer }>
                  <View style={ styles.listItemValueComponent }>
                    <Text style={styles.listItemCryptoValue}>
                      {
                        tokenAmounts == null ? 0 : tokenAmounts.amount
                      }
                    </Text>
                    <Text style={styles.listItemFiatValue}>
                      {
                        tokenAmounts == null ? 'NA' : (tokenPriceInfo)[this.props.currencyOptions[this.state.currencyIndex]]
                      }
                    </Text>
                  </View>
                </View>
              </View>
            </BoxShadowCard>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  handleListRefresh = async () => {
    await this.balanceCalculations();
  }

  handleCurrencyTouch = async () => {
    let currentIndex = this.state.currencyIndex;
    if (currentIndex === 4) {
      await this.setState({ currencyIndex: 0 });
    } else {
      let index = currentIndex += 1;
      await this.setState({ currencyIndex: index });
    }
  }

  /**
   * Returns a component that displays all the tokens that the user had selected.
   * The component also provides the option to add/delete tokens
   */

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer} >
          <View style={styles.navBar}>
            <BackWithMenuNav
              showMenu={true}
              showBack={false}
              navigation={this.props.navigation}
            />
          </View>
          <Text style={styles.textHeader}>
            {
              this.props.debugMode
                ? this.props.testWalletName
                : this.state.currentWalletName
            }
          </Text>
          <View style={styles.touchableCurrencyContainer}>
            <TouchableOpacity onPress={this.handleCurrencyTouch}>
              <View style={styles.accountValueHeader}>
                  <Text style={styles.headerValue}>
                    {
                      this.state.pricesLoaded
                        ? (this.state.walletBalance)[this.props.currencyOptions[this.state.currencyIndex]]
                        : 'Balance Loading ...'
                    }
                  </Text>
                  <Text style={styles.headerValueCurrency}>
                  {
                    this.state.pricesLoaded
                      ? ' ' + this.state.currency[this.state.currencyIndex] + " (" + this.props.network + ")"
                      : null
                  }
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.scrollViewContainer}>
            {
              this.state.completeTokenObject == null
                ? null
                :
                <FlatList
                  data={this.state.completeTokenObject}
                  showsVerticalScrollIndicator={false}
                  renderItem= {({ item }) => { return this.renderRow(item); }}
                  keyExtractor= {(item) => {
                    return `${item.tokenInfo.address}${item.tokenInfo.name}`
                  }}
                  refreshing={this.state.refresh}
                  onRefresh={this.handleListRefresh}
                  extraData={this.props}
                />
            }
          </View>
          <View style={styles.btnContainer}>
            <LinearButton
              onClickFunction={this.navigate}
              buttonText="Add Token or Coin"
              customStyles={styles.button}
              buttonStateEnabled={!this.state.pricesLoaded}
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

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  containerSelected: {
    borderWidth: 1,
    borderColor: 'black',
    width: '84%',
  },
  containerDeselect: {
    width: '84%',
  },
  boxShadowContainer: {
    flex: 1,
  },
  listItemParentContainer: {
    height: Dimensions.get('window').height * 0.1,
    flex: 1,
  },
  listItemTextComponent: {
    justifyContent: 'center',
    flex: 1,
  },
  listItemValueContainer: {
    flex: 3,
    justifyContent: 'center',
    paddingBottom: '1.5%',
    paddingTop: '1.5%',
    paddingRight: '5%',
  },
  listItemValueComponent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  imgMainContainer: {
    flex: 1.25,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    height: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.0524 : Dimensions.get('window').height * 0.057,
    width: Dimensions.get('window').width * 0.093,
    justifyContent: 'center',
  },
  listItemTextComponentContainer: {
    flex: 3,
  },
  mainTitleContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    paddingTop: '2.5%',
  },
  mainTitleText: {
    fontSize: RF(3),
    fontFamily: 'Cairo-Regular',
    letterSpacing: 0.5,
    color: 'black',
  },
  subtitleContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    paddingBottom: '1.5%',
  },
  subTitleText: {
    fontSize: RF(2),
    fontFamily: 'Cairo-Regular',
    letterSpacing: 0.5,
  },
  listItemFiatValue: {
    alignItems: 'flex-end',
    fontSize: RF(2),
    fontFamily: 'WorkSans-Light',
    paddingRight: '1.75%',
    letterSpacing: 0.4,
  },
  listItemCryptoValue: {
    alignItems: 'flex-end',
    fontSize: RF(1.5),
    fontFamily: 'Cairo-Regular',
    letterSpacing: 0.5,
    color: 'black',
    paddingRight: '1.75%',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
  },
  navBar: {
    flex: 0.75,
    paddingBottom: '2%',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.75,
    letterSpacing: 0.8,
    justifyContent: 'center',
  },
  touchableCurrencyContainer: {
    flex: 0.5,
  },
  accountValueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerValue: {
    fontFamily: 'WorkSans-Medium',
    marginLeft: '10%',
    color: '#27c997',
    fontSize: RF(3),
  },
  headerValueCurrency: {
    fontSize: 11,
    fontFamily: 'WorkSans-Regular',
    color: '#27c997',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    alignItems: 'stretch',
    width: '100%',
    paddingLeft: '9%',
    paddingRight: '9%',
    flex: 6,
  },
  btnContainer: {
    flex: 1.5,
    paddingTop: '3%',
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
    letterSpacing: 0.5,
  },
});

function mapStateToProps({ Wallet, Debug, HotWallet }) {
  const { hotWallet } = HotWallet;
  const {
    currencyOptions,
    tokens,
    wallets,
    tokenConversions,
    tokenBalances,
    walletBalance,
    tokenQuantities,
    network,
  } = Wallet;
  const {
    debugMode, testWalletName,
  } = Debug;
  return {
    hotWallet,
    currencyOptions,
    tokens,
    debugMode,
    testWalletName,
    wallets,
    tokenConversions,
    walletBalance,
    tokenBalances,
    tokenQuantities,
    network,
  };
}

export default connect(mapStateToProps, {
  setWalletTokenBalances,
  fetchCoinData,
  calculateWalletBalance,
  saveTokenDataForTransaction,
  saveAllTokenQuantities,
})(Portfolio);
