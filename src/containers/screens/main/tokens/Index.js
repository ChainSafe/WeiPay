import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
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
            showMenu={false}
            showBack={true}
            navigation={this.props.navigation}
            backPage={'mainStack'}
        />
        <TabNavigator tabs={3}>
          <View title="SEND" style={styles.content}>
            <CoinSend navigation={this.props.navigation} />
          </View>
          <View title="ACTIVITY" style={styles.content}>
            <CoinActivity navigation={this.props.navigation} />
          </View>
          <View title="RECEIVE" style={styles.content}>
            <CoinReceive navigation={this.props.navigation} />
          </View>
        </TabNavigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfe',
    paddingTop: getStatusBarHeight(),
  },
  content: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
});

export default TokenFunctionality;
