import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

class Contacts extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Contacts',
      headerLeft: (
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
        <Text>Contacts</Text>
        <Text>Contacts</Text>
        <Text>Contacts</Text>
        <Text>Contacts</Text>
        <Text>Contacts</Text>
        <Text>Contacts</Text>
      </View>
    )
  }
}

export default Contacts;
