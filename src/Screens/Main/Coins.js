import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import CoinList from '../../Components/CoinList';

class Coins extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Enable Tokens',
      tabBarLabel: 'Coins'
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={[
            {key: 'Bitcoin'},
            {key: 'Ethereum'},
            {key: 'Neo'},
            {key: 'Gas'},
            {key: 'EOX'}
          ]}
          renderItem={({item}) =>
            <Text
              onPress={() => this.props.navigation.navigate('PortfolioCoins')}
              style={styles.item}>
              {item.key}
            </Text>
          }
        />
        <CoinList />
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

export default Coins
