import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TabNavigator from '../../../../components/customPageNavs/CustomTabNavigator';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import Coins from './Coins';
import Tokens from './Tokens';
import NewToken from './NewToken';

class Index extends Component {
  constructor(props){
    super(props);
    var active = 0;
    let refreshRoute = null;
    try {
      refreshRoute = this.props.navigation.state.params.tab;
      // console.log({refreshRoute});
    } catch (err) {
      // console.log({err});
    }

		// routing error was getting caught here
    if (refreshRoute) {
      this.state = {
        setActiveTab: refreshRoute,
      }
    } else {
      try {
        active = this.props.navigation.state.params.activeTab;
      } catch (error) {
        active = 0;
      }
      this.state = {
        setActiveTab: active,
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <BackWithMenuNav
              showMenu={false}
              showBack={true}
              navigation={this.props.navigation}
              backPage={'mainStack'}
          />
          <TabNavigator tabs={3} activeTab={ this.state.setActiveTab }>
              {/* First tab */}
              <View title="Tokens" style={styles.content}>
                <Coins navigation={this.props.navigation} />
              </View>
              {/* Second tab */}
              <View title="Search" style={styles.content}>
                  <Tokens navigation={this.props.navigation} />
              </View>
              {/* Third tab */}
              <View title="New Token" style={styles.content}>
                  <NewToken navigation={this.props.navigation} />
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
    paddingTop: getStatusBarHeight(),
  },
  // Tab content container
  content: {
    flex: 1, // Take up all available space
    backgroundColor: '#fafbfe', // Darker background for content area
  },
});

export default Index;
