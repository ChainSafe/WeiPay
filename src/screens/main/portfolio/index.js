import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import { NavigationActions } from "react-navigation";
import LinearButton from '../../../components/LinearGradient/LinearButton';
import { addTokenInfo } from '../../../actions/ActionCreator';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard';


/**
 * Screen is used to display the wallet portfolio of the user, which contains the
 * tokens and the balance of the wallet
 */
class Portfolio extends Component {

  state = {
    data: this.props.newWallet.tokens
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
 
  /**
   * Returns a ListItem component specific to the properties of the token parameter
   */
  renderRow = (token) => {
    return (
        <TouchableOpacity
          onPress={() => {
            this.props.addTokenInfo(token)
            this.props.navigation.navigate("coinSend")      
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
                    <Text style={styles.listItemCryptoValue}>0</Text>
                    <Text style={styles.listItemFiatValue}>$2444432</Text>
                  </View>
                </View>
              </View>
            </BoxShadowCard>
          </View>
        </TouchableOpacity >
    );
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
            <ScrollView >
                {/* <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false}/> */}
                <FlatList
                  data={this.state.data}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => this.renderRow(item)}
                />

            </ScrollView>
          </View>
          <View style={styles.btnContainer} >
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
    alignItems: "center"
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
    alignItems: 'stretch',
    width: '100%',
    justifyContent: 'flex-end',
    flex: 1,
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

export default connect(mapStateToProps, { addTokenInfo })(Portfolio);
