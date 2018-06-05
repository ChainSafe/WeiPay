import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'

class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search',
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
        <SearchBar />
      </View>
    )
  }
}

export default Search
