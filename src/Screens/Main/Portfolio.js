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
      title: 'Portfolio',
      headerLeft: null,
      headerRight: (
        <View style={{ paddingRight: 15 }}>
          <Icon
            name="menu"
            onPress={() => navigation.navigate('DrawerOpen')}
            title="SideMenu"
            style={{ paddingLeft: 20 }}
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
      />
    )
  }

  /**
   * Returns a component that displays all the tokens that the user had selected.
   * The component also provides the option to add/delete tokens
   */
  render() {
    return (
      <View style={{ flex: 1 }} >
        <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
        <View style={styles.btnContainer} >
          <Button
            title='Add Token or Coin'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
              height: 50, padding: 10, alignItems: 'center', justifyContent: 'center'
            }}
            textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
            onPress={() => this.props.navigation.navigate('AddToken')}
          />
        </View>
      </View>
    )
  }
}

/**
 * Styles used in the "Portfolio" screen
 */
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  btnContainer: {
    alignItems: 'center',
    height: 80,
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
