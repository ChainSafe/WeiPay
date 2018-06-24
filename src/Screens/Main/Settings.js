import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import { Icon, List, ListItem } from 'react-native-elements';


class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
    }
  }

  navigateToSubSetting = (listId) => {
    const navigateToSub = NavigationActions.navigate({
      routeName: listId,
      params: { name: "Shubhnik" }
    });
    this.props.navigation.dispatch(navigateToSub);
  };

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

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexGrow: 1,
  }
})

export default Settings;
