import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * React Component
 * Contains a local history of all the transactions that have been occured
 * using the current wallet address
 */
class CoinActivity extends Component {

  /**
   * Sets the Tab header to "ACTIVITY"
   */
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'ACTIVITY'
    }
  }

  /**
   * Returns a component holding a list of transactions that have been occured
   */
  render() {
    return (
      <View style={styles.container}>
        <Text>No Current Activity</Text>
      </View>
    )
  }
}

export default CoinActivity

/**
 * Style
 */
const styles = StyleSheet.create({
  container: {
    // top: 20,
    // alignItems: 'center'
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
})
