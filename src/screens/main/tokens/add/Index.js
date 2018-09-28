import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TabNavigator from '../../../../components/customPageNavs/CustomTabNavigator';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import Coins from './Coins';
import Tokens from './Tokens';
import NewToken from './NewToken';

class Index extends Component {
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
              <View title="Tokens" style={styles.content}>
                <Coins />
              </View>
              {/* Second tab */}
              <View title="Search" style={styles.content}>
                  <Tokens />
              </View>
              {/* Third tab */}
              <View title="New Token" style={styles.content}>
                  <NewToken
                    navigation={this.props.navigation}
                  />
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

export default Index;
