import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CoinActivity extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'ACTIVITY'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>No Current Activity</Text>
      </View>
    )
  }
}

export default CoinActivity

const styles = StyleSheet.create({
  container: {
    top: 20,
    alignItems: 'center'
  }
})
