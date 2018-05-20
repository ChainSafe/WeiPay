import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';

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
      <View style={{ flex: 1 }}>
        {/* <FlatList
          data={[
            { key: 'Bitcoin' },
            { key: 'Ethereum' },
            { key: 'Neo' },
            { key: 'Gas' },
            { key: 'EOX' }
          ]}
          renderItem={({ item }) =>
            <Text
              onPress={() => this.props.navigation.navigate('PortfolioCoins')}
              style={styles.item}>
              {item.key}
            </Text>
          }
        /> */}

        <CoinList />

        <View style={styles.btnContainer} >
          <Button
            title='Add'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
              justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
            }}
            textStyle={{ textAlign: 'center' }}
            onPress={this.navigate}
          />
        </View>


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
  btnContainer: {
    alignItems: 'center', height: 60, paddingTop: 10, paddingBottom: 10, justifyContent: "center"
  }
})

export default Coins
