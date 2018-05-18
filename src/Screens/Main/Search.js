import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SearchBar } from 'react-native-elements'

class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search'
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
