import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage, ListView } from 'react-native';
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
          <Icon
            name="menu"
            onPress={() => navigation.navigate('DrawerOpen')}
            title="SideMenu"
            style={{ paddingLeft: 35 }}
          />
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
          width:350, 
          height:65, 
          backgroundColor: '#ffffff',
          borderBottomWidth: 0,
          borderColor: '#dbdbdb',
          borderBottomWidth: 0,
          shadowColor: '#dbdbdb',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 1.3,
          elevation: 1,
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

         <View stlye={styles.headerContainer}>
            <Text style={styles.textHeader} >Portfolio </Text>
            <Text style={styles.headerValue}> 0$ USD</Text>            
        </View>
        <View style={styles.list}>
          <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false}  />
        </View>
        <View style={styles.btnContainer} >
          <Button
            title='Add Token or Coin'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: '#12c1a2', borderRadius: 100, width: 340,
              height: 60, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10
            }}
            textStyle={{ textAlign: 'center', color: 'white', fontSize: 20, fontFamily:"Cairo-Regular" }}
            onPress={() => this.props.navigation.navigate('AddToken')}
          />
          <Text style={styles.textFooter} >Powered by Chainsafe </Text>
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
    backgroundColor: "#fafbfe"
  },
  headerContainer : {
    flexDirection: 'row',
    alignItems: "center",  
    flex:1,   
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textHeader: {       
    fontFamily: "Cairo-Light",
    fontSize: 40,        
    marginBottom:-15,
    marginLeft: 30,
    color: '#1a1f3e'
  },
  headerValue : {   
    fontFamily: "WorkSans-Regular",  
    marginTop: 10,
    marginLeft: 30,
    color: '#27c997',
    fontSize: 20
  }, 
  textFooter : {
    fontFamily: "WorkSans-Regular",
    fontSize: 16,
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: 'center', 
    alignItems: 'center' ,
    color: '#c0c0c0'
},
  btnContainer: {
    alignItems: 'center',
    height: 150,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center"
  },
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
