import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import { Icon, List, ListItem } from 'react-native-elements';

/**
 * Screen used to display all the wallet settings options that the user can select from
 */
class Settings extends Component {

  /**
   * Sets the title to "Settings"
   */
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
    }
  }

  /**
   * Method is used to navigate to the specific setting represented by the 
   * parameter "listId"
   * 
   * @param {String} listId
   */
  navigateToSubSetting = (listId) => {
    const navigateToSub = NavigationActions.navigate({
      routeName: listId,
    });
    this.props.navigation.dispatch(navigateToSub);
  };

  /**
   * Returns a component that shows the touchable list of all the setting options
   */
  render() {
    const list = [
      {
        "title": "Password Change",
        "id": "changePassword"
      },
      {
        "title": "Language Change",
        "id": "languageChange"
      },
      {
        "title": "Currency Change",
        "id": "changeCurrency"
      },
      {
        "title": "Wallet Name Change",
        "id": "changeWalletName"
      },
      {
        "title": "Remove Wallet",
        "id": "removeWallet"
      }
    ];

    return (
      <View>
        <List style={styles.list} containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }} >
          {
            list.map((item, i) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => this.navigateToSubSetting(item.id)}
              >
                <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{ name: item.icon }}
                />
              </TouchableOpacity>
            ))
          }
        </List>
      </View>
    )
  }
}

/**
 * Styles used in the settings screen
 */
const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexGrow: 1,
  }
})

export default Settings;
