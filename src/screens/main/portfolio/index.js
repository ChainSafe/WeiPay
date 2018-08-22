import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import { NavigationActions } from "react-navigation";
import LinearButton from '../../../components/LinearGradient/LinearButton';
import { addTokenInfo, getTokenBalance } from '../../../actions/ActionCreator';
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
    balance: this.props.newWallet.balance,
    refresh: false,
  }

  /**
   * LifeCycle Method (executes before the component has been rendered)
   * Sets the list of tokens reterived from the global state variable as the
   * data source for the listView
   */
  componentWillMount() {
    const data = this.props.newWallet.tokens;
    console.log(this.props.newWallet.tokens);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {return r1 !== r2},
    });
    this.dataSource = ds.cloneWithRows(data);
  }

  navigate = () => {
    const navigateToAddToken = NavigationActions.navigate({ routeName: "Tokens" });
    this.props.navigation.dispatch(navigateToAddToken);
  };

  renderItemPress = () => {
    const navigateToAddToken = NavigationActions.navigate({ routeName: 'coinSend' });
    this.props.navigation.dispatch(navigateToAddToken);
  };

  getTokenBalance= async() => {

    let newData =   [
        {
            "id": 0,
            "balance": 0,
            "type": "PortfolioCoin",
            "selected": false,
            "symbol": "ETH",
            "address": "",
            "decimals": 18,
            "name": "Ethereum",
            "ens_address": "",
            "website": "",
            "logo": {
                "src": "https://pbs.twimg.com/profile_images/626149701189042177/LWpxKEv3_bigger.png",
                "width": "",
                "height": "",
                "ipfs_hash": ""
            },
            "support": {
                "email": "",
                "url": ""
            },
            "social": {
                "blog": "",
                "chat": "",
                "facebook": "",
                "forum": "",
                "github": "",
                "gitter": "",
                "instagram": "",
                "linkedin": "",
                "reddit": "",
                "slack": "",
                "telegram": "",
                "twitter": "",
                "youtube": ""
            }
        },
        {
            "id": 1,
            "balance": 0,
            "type": "ERC20",
            "selected": false,
            "symbol": "TRX",
            "address": "0xf230b790E05390FC8295F4d3F60332c93BEd42e2",
            "decimals": 6,
            "name": "Tron Lab Token",
            "ens_address": "",
            "website": "https://tronlab.com/en.html",
            "logo": {
                "src": "https://etherscan.io/token/images/tronlab_28.png",
                "width": "",
                "height": "",
                "ipfs_hash": ""
            },
            "support": {
                "email": "service@tronlab.com",
                "url": ""
            },
            "social": {
                "blog": "",
                "chat": "",
                "facebook": "https://www.facebook.com/TronFoundation-144555002795817",
                "forum": "",
                "github": "",
                "gitter": "",
                "instagram": "",
                "linkedin": "",
                "reddit": "",
                "slack": "https://tronfoundation.slack.com",
                "telegram": "https://t.me/joinchat/GIjGvkK7dhnO8gapCPfqew",
                "twitter": "https://twitter.com/tronfoundation",
                "youtube": ""
            }
        },
        {
            "id": 2,
            "balance": 0,
            "type": "ERC20",
            "selected": false,
            "symbol": "BNB",
            "address": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
            "decimals": 18,
            "name": "BNB",
            "ens_address": "",
            "website": "https://www.binance.com",
            "logo": {
                "src": "https://etherscan.io/token/images/binance_28.png",
                "width": 28,
                "height": 28,
                "ipfs_hash": ""
            },
            "support": {
                "email": "support@binance.zendesk.com",
                "url": ""
            },
            "social": {
                "blog": "",
                "chat": "",
                "facebook": "https://www.facebook.com/binance2017",
                "forum": "",
                "github": "",
                "gitter": "",
                "instagram": "",
                "linkedin": "",
                "reddit": "https://www.reddit.com/r/binance",
                "slack": "",
                "telegram": "",
                "twitter": "https://twitter.com/binance_2017",
                "youtube": ""
            }
        },
        {
            "id": 3,
            "balance": 0,
            "type": "ERC20",
            "selected": false,
            "symbol": "SUB",
            "address": "0x12480E24eb5bec1a9D4369CaB6a80caD3c0A377A",
            "decimals": 2,
            "name": "Substratum",
            "ens_address": "",
            "website": "https://substratum.net",
            "logo": {
                "src": "https://etherscan.io/token/images/substratum2_28.png",
                "width": "",
                "height": "",
                "ipfs_hash": ""
            },
            "support": {
                "email": "",
                "url": ""
            },
            "social": {
                "blog": "",
                "chat": "",
                "facebook": "",
                "forum": "",
                "github": "",
                "gitter": "",
                "instagram": "",
                "linkedin": "",
                "reddit": "https://www.reddit.com/r/SubstratumNetwork",
                "slack": "http://x.co/SubSlack",
                "telegram": "",
                "twitter": "https://twitter.com/SubstratumNet",
                "youtube": ""
            }
        },
        {
            "id": 4,
            "balance": 0,
            "type": "ERC20",
            "selected": false,
            "symbol": "SUB1",
            "address": "0x12480E24eb5bec1a9D4369CaB6a80caD3c0A377A",
            "decimals": 2,
            "name": "Substratum",
            "ens_address": "",
            "website": "https://substratum.net",
            "logo": {
                "src": "https://etherscan.io/token/images/substratum2_28.png",
                "width": "",
                "height": "",
                "ipfs_hash": ""
            },
            "support": {
                "email": "",
                "url": ""
            },
            "social": {
                "blog": "",
                "chat": "",
                "facebook": "",
                "forum": "",
                "github": "",
                "gitter": "",
                "instagram": "",
                "linkedin": "",
                "reddit": "https://www.reddit.com/r/SubstratumNetwork",
                "slack": "http://x.co/SubSlack",
                "telegram": "",
                "twitter": "https://twitter.com/SubstratumNet",
                "youtube": ""
            }
        },
        {
            "id": 5,
            "balance": 0,
            "type": "ERC20",
            "selected": false,
            "symbol": "SUB2",
            "address": "0x12480E24eb5bec1a9D4369CaB6a80caD3c0A377A",
            "decimals": 2,
            "name": "Substratum",
            "ens_address": "",
            "website": "https://substratum.net",
            "logo": {
                "src": "https://etherscan.io/token/images/substratum2_28.png",
                "width": "",
                "height": "",
                "ipfs_hash": ""
            },
            "support": {
                "email": "",
                "url": ""
            },
            "social": {
                "blog": "",
                "chat": "",
                "facebook": "",
                "forum": "",
                "github": "",
                "gitter": "",
                "instagram": "",
                "linkedin": "",
                "reddit": "https://www.reddit.com/r/SubstratumNetwork",
                "slack": "http://x.co/SubSlack",
                "telegram": "",
                "twitter": "https://twitter.com/SubstratumNet",
                "youtube": ""
            }
        },
        {
            "id": 6,
            "balance": 0,
            "type": "ERC20",
            "selected": false,
            "symbol": "SUB2",
            "address": "0x12480E24eb5bec1a9D4369CaB6a80caD3c0A377A",
            "decimals": 2,
            "name": "Substratum",
            "ens_address": "",
            "website": "https://substratum.net",
            "logo": {
                "src": "https://etherscan.io/token/images/substratum2_28.png",
                "width": "",
                "height": "",
                "ipfs_hash": ""
            },
            "support": {
                "email": "",
                "url": ""
            },
            "social": {
                "blog": "",
                "chat": "",
                "facebook": "",
                "forum": "",
                "github": "",
                "gitter": "",
                "instagram": "",
                "linkedin": "",
                "reddit": "https://www.reddit.com/r/SubstratumNetwork",
                "slack": "http://x.co/SubSlack",
                "telegram": "",
                "twitter": "https://twitter.com/SubstratumNet",
                "youtube": ""
            }
        },
        {
            "id": 7,
            "balance": 0,
            "type": "ERC20",
            "selected": false,
            "symbol": "SUB2",
            "address": "0x12480E24eb5bec1a9D4369CaB6a80caD3c0A377A",
            "decimals": 2,
            "name": "Substratum",
            "ens_address": "",
            "website": "https://substratum.net",
            "logo": {
                "src": "https://etherscan.io/token/images/substratum2_28.png",
                "width": "",
                "height": "",
                "ipfs_hash": ""
            },
            "support": {
                "email": "",
                "url": ""
            },
            "social": {
                "blog": "",
                "chat": "",
                "facebook": "",
                "forum": "",
                "github": "",
                "gitter": "",
                "instagram": "",
                "linkedin": "",
                "reddit": "https://www.reddit.com/r/SubstratumNetwork",
                "slack": "http://x.co/SubSlack",
                "telegram": "",
                "twitter": "https://twitter.com/SubstratumNet",
                "youtube": ""
            }
        }
        ]



    const token = this.state.data[0]
    console.log('Checking');
    
    console.log(this.state.data[0]);
    console.log('Checking');
    

    try {
      const currentWallet = await this.props.newWallet.wallet;
    console.log(currentWallet.address);
    console.log(token.symbol);
    try {
      if (token.address === '') {
        const balance = await Provider.getBalance(currentWallet.address)
        console.log('Getting Balance');
        const check = String(utils.formatEther(balance))
        console.log(check);
        
        await this.props.getTokenBalance(check)
        this.setState({ refresh: false, data: newData})

    }
  }
    catch(err) {
      console.log(err)
    }
  }
    catch(e) {
      console.log(e)
    }
  }
    // if (token.address === '') {
    //   await Provider.getBalance(currentWallet.address).then((balance) => {
    //     console.log('Getting Balance');
    //     const check = String(utils.formatEther(balance))
    //     console.log(check);
        
    //     this.props.getTokenBalance(check)
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    //}

    // ---- This code works when the wallet provider have been changed to the mainnetwork
    // const contract = new ethers.Contract(token.address, ERC20ABI, currentWallet)
    // contract.balanceOf(currentWallet.address).then(function(balance) {
    // var text = ethers.utils.formatEther(balance);
    // console.log("Balance Before:", text);
    // return text
    // })
    // return 'NA';

  //}

 
  /**
   * Returns a ListItem component specific to the properties of the token parameter
   */
  renderRow = (token) => {
    return (
        <TouchableOpacity
          onPress={() => {
            this.props.addTokenInfo(token)
            //this.props.navigation.navigate("coinSend")
            this.getTokenBalance(token)      
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
                    <Text style={styles.listItemCryptoValue}>{this.state.balance}</Text>
                    <Text style={styles.listItemFiatValue}>$2444432</Text>
                  </View>
                </View>
              </View>
            </BoxShadowCard>
          </View>
        </TouchableOpacity >
    );
  }

  handleListRefresh = () => {
    this.setState({ 
      refresh: true},
    () =>{
      this.getTokenBalance()
    }
    )
  }

  /**
   * Returns a component that displays all the tokens that the user had selected.
   * The component also provides the option to add/delete tokens
   */
  render() {
    console.log('In render');
    console.log(this.props.newWallet.balance);
    console.log(this.props.newWallet.tokens);
    
    console.log('In render');
    
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
          <Text style={styles.textHeader} onPress={() => {console.log(this.props.newWallet.balance);
          }}>Holdings</Text>
          <View style={styles.accountValueHeader}>
              <Text style={styles.headerValue}>0$</Text>
              <Text style={styles.headerValueCurrency}> USD</Text>
          </View>
          <View style={styles.scrollViewContainer}>
            <FlatList
              data={this.state.data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => this.renderRow(item)}
              keyExtractor={item => String(item.id)}
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
    fontSize: RF(3),
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
    fontFamily: "Cairo-Light",
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
    alignItems: "center",
  },
  headerValue: {
    fontFamily: 'WorkSans-Medium',
    marginLeft: '9%',
    color: '#27c997',
    fontSize: RF(3),  
  },   
  headerValueCurrency : {
    fontSize:11,
    fontFamily: "WorkSans-Regular", 
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
    letterSpacing: 0.5
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
})

/**
 * Method is used  to reterive the newWallet object
 * from the global state variable.
 * Returns an object containing that reterived object
 * @param {Object} param0
 */
function mapStateToProps({ newWallet }) {
  return { newWallet };
}

export default connect(mapStateToProps, { addTokenInfo, getTokenBalance })(Portfolio);
