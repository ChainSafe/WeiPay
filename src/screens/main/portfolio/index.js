import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView, Platform, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import { NavigationActions } from 'react-navigation';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import { addTokenInfo, updateTokenBalance } from '../../../actions/ActionCreator';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard';
import ERC20ABI from '../../../constants/data/json/ERC20ABI.json';
import Provider from '../../../constants/Providers';


const ethers = require('ethers');

const utils = ethers.utils;

/**
 * Screen is used to display the wallet portfolio of the user, which contains the
 * tokens and the balance of the wallet
 */
class Portfolio extends Component {
  state = {
    data: this.props.newWallet.tokens,
    refresh: false,
  }

  navigate = () => {
    const navigateToAddToken = NavigationActions.navigate({ routeName: 'AddTokenFunctionality' });
    this.props.navigation.dispatch(navigateToAddToken);
  };

  renderItemPress = () => {
    const navigateToAddToken = NavigationActions.navigate({ routeName: 'coinSend' });
    this.props.navigation.dispatch(navigateToAddToken);
  };

  tokenBalanceLoop = async () => {
    const tokenLen = this.props.newWallet.tokens.length;
    for (let i = 0; i < (tokenLen); i += 1) {
      this.getTokenBalance(i);
    }
  }

  getTokenBalance = async (tokenIndex) => {

    const token = this.state.data[tokenIndex];
    try {
      const currentWallet = this.props.newWallet.wallet;
      try {
        if (token.address === '') {
          const balance = await Provider.getBalance(currentWallet.address);
          const check = String(utils.formatEther(balance));
          await this.props.updateTokenBalance(tokenIndex, check);
          this.setState({ refresh: false });
        } else if (token.address !== '') {
          const contract = new ethers.Contract(token.address, ERC20ABI, currentWallet);
          const balance = await contract.balanceOf(currentWallet.address);
          await this.props.updateTokenBalance(tokenIndex, String(balance));
        }
      } catch (err) {
        this.props.updateTokenBalance(tokenIndex, '0.0');
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Returns a ListItem component specific to the properties of the token parameter
   */
  renderRow = (token) => {
    return (
        <TouchableOpacity
          onPress={() => {
            this.props.addTokenInfo(token);
            this.props.navigation.navigate("TokenFunctionality")
          }}
          style={styles.listItemParentContainer}
        >
          <View>
            <BoxShadowCard customStyles={styles.boxShadowContainer}>
              <View style={[styles.contentContainer]}>
                <View style={styles.imgMainContainer} >
                  <View style={styles.imageContainer} >
                    <Image
                      style={styles.img}
                      source={ { uri: token.logo.src } }
                    />
                  </View>
                </View>
                <View style={styles.listItemTextComponentContainer}>
                  <View style={ styles.listItemTextComponent }>
                    <View style={styles.mainTitleContainer}>
                      <Text style={styles.mainTitleText}> {token.symbol} </Text>
                    </View>
                    <View style={styles.subtitleContainer}>
                      <Text style={styles.subTitleText}> {token.name} </Text>
                    </View>
                  </View>
                </View>
                <View style={ styles.listItemValueContainer }>
                  <View style={ styles.listItemValueComponent }>
                    <View style={{ flex: 1, paddingTop: '0%',}}>
                      <Text style={styles.listItemCryptoValue}>{token.balance}</Text>
                    </View>
                    <View style={{ flex: 1, paddingBottom: '5%',}}>
                      <Text style={styles.listItemFiatValue}>$2444432</Text>
                    </View>
                  </View>
                </View>
              </View>
            </BoxShadowCard>
          </View>
        </TouchableOpacity>
    );
  }

  handleListRefresh = () => {
    this.setState({ refresh: true },
      () => {
        this.tokenBalanceLoop();
      });
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
          <Text style={styles.textHeader}>Holdings</Text>
          <View style={styles.accountValueHeader}>
            <Text style={styles.headerValue}>0$</Text>
            <Text style={styles.headerValueCurrency}> USD</Text>
          </View>
          <View style={styles.scrollViewContainer}>
            <FlatList
              data={this.state.data}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => { return this.renderRow(item); }}
              keyExtractor={(item) => { return String(item.id); }}
              refreshing={this.state.refresh}
              onRefresh={this.handleListRefresh}
              extraData={this.props}
            />
          </View>
          <View style={styles.btnContainer}>
            <LinearButton
              onClickFunction={this.navigate}
                buttonText="Add Token or Coin"
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
 * Styles used in the "Portfolio" screen
 */
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
    paddingTop: '7%',
  },
  mainTitleText: {
    fontSize: RF(2.4),
    fontFamily: 'Cairo-Regular',
    letterSpacing: 0.5,
    color: '#061f46',
  },
  subtitleContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    paddingBottom: '11%',
    paddingLeft: '2%'
  },
  subTitleText: {
    fontSize: RF(1.6),
    paddingLeft: '.5%',
    fontFamily: 'Cairo-Regular',
    color: '#061f46',
    letterSpacing: 0.5,
  },
  listItemFiatValue: {
    alignItems: 'flex-end',
    fontSize: RF(1.7),
    fontFamily: 'WorkSans-Light',
    paddingRight: '1.75%',
    letterSpacing: 0.4,
  },
  listItemCryptoValue: {
    alignItems: 'flex-end',
    fontSize: RF(2.7),
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
  accountValueHeader: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
  },
  headerValue: {
    fontFamily: 'WorkSans-Medium',
    marginLeft: '9%',
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
  // footerContainer: {
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   flex: 1,
  // },
  // textFooter : {
  //   fontFamily: "WorkSans-Regular",
  //   fontSize: RF(1.7),
  //   marginBottom: '5%',
  //   alignItems: 'center' ,
  //   color: '#c0c0c0',
  //   letterSpacing: 0.5
  // }
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

export default connect(mapStateToProps, { addTokenInfo, updateTokenBalance })(Portfolio);
