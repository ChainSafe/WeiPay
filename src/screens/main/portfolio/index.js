import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage, ListView, Image, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { List, ListItem, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';

/**
 * Screen is used to display the wallet portfolio of the user, which contains the 
 * tokens and the balance of the wallet
 */
class Portfolio extends Component {

  /**
   * Sets the title of the screen to be "Portfolio", and modifies the 
   * top bar to pull out the DrawerMenu
   */
  static navigationOptions = ({ navigation }) => {
    return {   
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: "#fafbfe"
      },   
      headerLeft: null,      
      headerRight: (
        <View style={{ paddingRight: 30, paddingTop: 15, backgroundColor: "#fafbfe", borderBottomWidth: 0 }}>
           <TouchableOpacity
                onPress={() => navigation.navigate('createOrRestore')} >
                <Image
                    source={require('../../../assets/icons/menu.png')}
                    style={{height:13, width:22}}
                /> 
            </TouchableOpacity>         
        </View>
      )
    }
  }

  /**
   * LifeCycle Method (executes before the component has been rendered)
   * Sets the list of tokens reterived from the global state variable as the
   * data source for the listView
   */
  componentWillMount() {
    let data = this.props.newWallet.tokens
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(data);
  }

  /**
   * Returns a ListItem component specific to the properties of the token parameter
   */
  renderRow = (token) => {
    return (
      <ListItem
        roundAvatar
        avatar={{ uri: token.avatar_url }}
        key={token.id}
        title={token.title}
        onPress={() => this.props.navigation.navigate(token.type)}
        containerStyle = {{
          borderRadius: 10, 
          width: '82%', 
          height: 63, 
          marginTop:'2.5%',
          backgroundColor: '#ffffff',
          borderBottomWidth: 0,
          borderColor: 'black',
          // borderBottomWidth: 0.2,
          shadowColor: '#000006',
          shadowOffset: { width: 1, height: 1},
          shadowOpacity:15,
          shadowRadius: 0.5,
        }}
      />
    )
  }

  /**
   * Returns a component that displays all the tokens that the user had selected.
   * The component also provides the option to add/delete tokens
   */
  render() {
    return (
      <View style={styles.mainContainer} >  

        <Text style={styles.textHeader} >Portfolio </Text>
        <Text style={styles.headerValue}>0$ USD</Text>            
       
        <View style={{alignItems:"stretch", flex:1, width:"100%", marginLeft: '9%'}}>
            <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false}  />
        </View>

        <View style={styles.btnContainer} >
          <Button
            title='Add Token or Coin'
            icon={{ size: 28 }}
            buttonStyle={{             
              backgroundColor: '#12c1a2',   
              borderRadius: 100, 
              width: '84%',
              height: 52,                                  
              alignItems: 'center', 
              justifyContent: 'center',                                  
              marginLeft: '7.5%'
            }}
            textStyle={{ 
              textAlign: 'center', 
              color: 'white', 
              fontSize: 16, 
              fontFamily:"Cairo-Regular" 
            }}
            onPress={() => this.props.navigation.navigate('AddToken')}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.textFooter} >Powered by ChainSafe </Text>
        </View>

      </View>
    )
  }
}

/**
 * Styles used in the "Portfolio" screen
 */
const styles = StyleSheet.create({
  mainContainer : {
    flex: 1,
    backgroundColor: "#fafbfe",
    width:"100%"
  },
  textHeader: {       
    fontFamily: "Cairo-Light",
    fontSize: 26,        
    // marginBottom:-15,
    marginLeft: '9%',
    color: '#1a1f3e'
  },
  headerValue : {   
    fontFamily: "WorkSans-Regular",  
    marginBottom: '2.5%',
    marginLeft: '9%',
    color: '#27c997',
    fontSize: 21
  },   
  btnContainer: {
    alignItems: 'stretch',
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: '3.5%',
    flex:1
  },
  footerContainer: {
    alignItems:"center"
  },
  textFooter : {
    fontFamily: "WorkSans-Regular",
    fontSize: 11,
    marginBottom: '5%',
    alignItems: 'center' ,
    color: '#c0c0c0'
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

export default connect(mapStateToProps)(Portfolio);
