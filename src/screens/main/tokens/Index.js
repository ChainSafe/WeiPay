import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TabNavigator from '../../../components/customPageNavs/CustomTabNavigator';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import CoinSend from './send/CoinSend';
import CoinActivity from './history/CoinActivity';
import CoinReceive from './receive/CoinReceive';

class TokenFunctionality extends Component {
  render() {
    return (
            <View style={styles.container}>
                <BackWithMenuNav
                    showMenu={true}
                    showBack={true}
                    navigation={this.props.navigation}
                    backPage={'mainStack'}
                />
                <TabNavigator tabs={3}>
                    {/* First tab */}
                    <View title="SEND" style={styles.content}>
                      <CoinSend />
                    </View>
                    {/* Second tab */}
                    <View title="ACTIVITY" style={styles.content}>
                        <CoinActivity />
                    </View>
                    {/* Third tab */}
                    <View title="RECEIVE" style={styles.content}>
                        <CoinReceive />
                    </View>
                </TabNavigator>
            </View>
    );
  }
}
const styles = StyleSheet.create({
  // App container
  container: {
    flex: 1, // Take up all screen
    backgroundColor: '#fafbfe', // Background color
  },
  // Tab content container
  content: {
    flex: 1, // Take up all available space
    backgroundColor: '#fafbfe', // Darker background for content area
  },
});

export default TokenFunctionality;
