import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

class AddWallet extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Wallet',
      headerRight: (
        <Icon
          name="menu"
          onPress={() => navigation.navigate('DrawerOpen')}
          title="SideMenu"
        />
      )
    }
  }

  render() {
    return (
      <View>
        <Text>AddWallet</Text>
        <Text>AddWallet</Text>
        <Text>AddWallet</Text>
        <Text>AddWallet</Text>
        <Text>AddWallet</Text>
        <Text>AddWallet</Text>
      </View>
    )
  }
}

export default AddWallet
