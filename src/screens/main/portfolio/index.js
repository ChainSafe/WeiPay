import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity, ScrollView, Platform, Dimensions, SafeAreaView } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { List, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import { NavigationActions } from "react-navigation";
import {addTokenInfo} from '../../../actions/ActionCreator';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard';
import RF from "react-native-responsive-fontsize"

/**
 * Screen is used to display the wallet portfolio of the user, which contains the 
 * tokens and the balance of the wallet
 */
class Portfolio extends Component {

  /**
   * LifeCycle Method (executes before the component has been rendered)
   * Sets the list of tokens reterived from the global state variable as the
   * data source for the listView
   */
  componentWillMount() {
    let data = this.props.newWallet.tokens
    console.log(this.props.newWallet.tokens);    
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(data);
  }

  navigate = () => {
    const navigateToAddToken = NavigationActions.navigate({ routeName: "AddCoin" });
    this.props.navigation.dispatch(navigateToAddToken);
  };

  /**
   * Returns a ListItem component specific to the properties of the token parameter
   */
  renderRow = (token) => {
    return (
      <View style={styles.listItemContainer}>
        <BoxShadowCard>
          <ListItem
            roundAvatar
            avatar={{ uri: token.avatar_url }}
            key={token.id}
            title= {
              <View style={styles.listItemSymbolRowContiner}>
                <Text style={styles.listItemSymbolText}>
                  {token.symbol}
                </Text>
                <Text style={styles.listItemCoinCount}> 
                  23 
                </Text>
              </View>
            }      
            onPress={() => {
              this.props.addTokenInfo(token)
              if(token.type === "PortfolioToken") {
                this.props.navigation.navigate("coinSend")
              }
              else {
                this.props.navigation.navigate("coinSend")
              }
            }
            }
            subtitle={
              <View style={styles.listItemSubtitleContainer}>
                <Text style={styles.lisItemSubtitleName}>
                  {token.title}
                </Text>
                <Text style={styles.listItemSubtitleValue}> 
                    $2444 
                  </Text>
              </View>
            }
            containerStyle = {styles.listItem}
            avatarStyle = {styles.avitarStyle}
          />
        </BoxShadowCard>
      </View>
    )
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
          <Text style={styles.textHeader} >DIGI WALLET []-[]</Text>
          <View style={styles.accountValueHeader}>
              <Text style={styles.headerValue}>0$</Text>   
              <Text style={styles.headerValueCurrency}> USD</Text> 
          </View>
          <View style={styles.scrollViewContainer}>
            <ScrollView style={styles.scrollView} >
                <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false}  />
            </ScrollView>
          </View>
          <View style={styles.btnContainer} >
              <LinearButton 
                onClickFunction={this.navigate}
                buttonText="Add Token or Coin"
                customStyles={styles.button}
              />         
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.textFooter} >Powered by ChainSafe </Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

/**
 * Styles used in the "Portfolio" screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: '#fafbfe'
  },
  mainContainer : {
    flex: 1,
    backgroundColor: "#fafbfe",
    width:"100%", 
  },
  navBar: {
    flex: 0.75,
    paddingBottom: '2%'
  },
  textHeader: {       
    fontFamily: "Cairo-Light",
    fontSize: 26,        
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.75,
    justifyContent: 'center',
  },
  accountValueHeader:{
    flexDirection: 'row',
    flex: 0.5,
  },
  headerValue : {   
    fontFamily: "WorkSans-Medium",  
    marginLeft: '9%',
    color: '#27c997',
    fontSize: 21,  
  },   
  headerValueCurrency : {
    fontSize:11,
    fontFamily: "WorkSans-Regular", 
    color: '#27c997',
    justifyContent:'center', 
  },
  scrollViewContainer:{
    alignItems:"stretch", 
    width:"100%", 
    paddingLeft: '9%',
    paddingRight: '9%',
    flex: 6,
  },
  scrollView:{
    flex: 1,
  },
  listItemContainer:{
    flex: 1,
    alignItems: 'stretch',
    height: Dimensions.get('window').height * 0.1,
    marginTop: '5%',
  },
  listItem:{      
    backgroundColor: '#ffffff',
    justifyContent:"center",
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  listItemSymbolRowContiner:{
    flexDirection:'row', 
    justifyContent:"center", 
    marginLeft:'5%'
  },
  listItemSymbolText:{
    fontSize:16,
    fontFamily: "Cairo-Regular",  
    alignItems:"flex-start",
    flex:1,
    width:'90%',
    letterSpacing: 0.5,  
    top: '1%'    
  },
  listItemCoinCount:{
    alignItems:"flex-end",
    fontSize:16,
    fontFamily: "WorkSans-Regular",   
    letterSpacing: 0.5,  
    top: '3.5%'   
  },
  listItemSubtitleContainer:{
    flexDirection:'row', 
    justifyContent:"center", 
    marginLeft:'5%'
  },
  lisItemSubtitleName:{
    fontSize:11, 
    fontFamily: "Cairo-Light",             
    alignItems:"flex-start",
    flex:1,
    width:'90%',  
    letterSpacing: 0.4,     
  },
  listItemSubtitleValue:{
    alignItems:"flex-end",
    fontSize:11,
    fontFamily: "WorkSans-Light",            
    paddingRight: '1.75%',
    letterSpacing: 0.4,     
  },
  btnContainer: {
    alignItems: 'stretch',
    width: '100%',
    justifyContent: 'flex-end',
    flex:1,
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  footerContainer: {
    alignItems:"center",
    justifyContent: 'flex-end',
    flex: 0.5,
  },
  textFooter : {
    fontFamily: "WorkSans-Regular",
    fontSize: RF(1.7),
    marginBottom: '3.5%',
    alignItems: 'center' ,
    color: '#c0c0c0',
    letterSpacing: 0.5
  }
})

/**
 * Method is used  to reterive the newWallet object
 * from the global state variable.
 * Returns an object containing that reterived object
 * @param {Object} param0 
 */
function mapStateToProps({ newWallet }) {
  return { newWallet }
}

export default connect(mapStateToProps, {addTokenInfo})(Portfolio);