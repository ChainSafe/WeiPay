import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'

class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search',
      headerRight: (
        <View style={{ paddingRight: 15 }}>
          <Icon
            name="menu"
            onPress={() => navigation.navigate('DrawerOpen')}
            title="SideMenu"
          />
        </View>
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
