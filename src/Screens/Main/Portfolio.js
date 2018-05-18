import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Coins from './Coins'

class Portfolio extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Portfolio',
      headerLeft: null,
      headerLeft: (
        <Icon
          name="menu"
          onPress={() => navigation.navigate('DrawerOpen')}
          title="SideMenu"
          style={{paddingLeft: 20}}
        />
      )
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={[
            {key: 'Bitcoin', type: 'PortfolioCoin'},
            {key: 'Ethereum', type: 'PortfolioCoin'},
            {key: 'Neo', type: 'PortfolioCoin'},
            {key: 'Gas', type: 'PortfolioCoin'},
            {key: 'EOS', type: 'PortfolioCoin'},
            {key: 'ACAT', type: 'PortfolioToken'},
            {key: 'Bitcoin Forks', type: 'PortfolioToken'}
          ]}
          renderItem={({item}) =>
            <Text
              onPress={() => this.props.navigation.navigate(item.type)}
              style={styles.item}>
              {item.key}
            </Text>
          }
        />
        <Icon name="add" onPress={() => this.props.navigation.navigate('AddToken')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default Portfolio;
