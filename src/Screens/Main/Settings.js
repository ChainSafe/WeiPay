import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import { Icon, List, ListItem } from 'react-native-elements';


class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      headerLeft: null,
      headerRight: (
        <Icon
          name="menu"
          onPress={() => navigation.navigate('DrawerOpen')}
          title="SideMenu"
        />
      )
    }
  }

  navigateToSubSetting = (listId) => {

    console.log(listId);
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
      <View style={styles.pageContainer}>
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
  pageContainer: {
    // backgroundColor: 'white',
    // height: Dimensions.get("window").height
  },
  list: {
    flex: 1,
    flexGrow: 1,
    // top: 0,
    // position: 'absolute',
    // backgroundColor: 'yellow',
    // left: 0,
    // right: 0,
    // marginTop: 0
  }
})

export default Settings;
