import React, { Component } from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';

class CoinSendTabNavigator extends Component {
    /**
     * Navigates to the coinHistory Page
     */
    navigateToHistory = () => {
      const navigateHistory = NavigationActions.navigate({
        routeName: 'coinHistory',
        params: { name: 'Shubhnik' },
      });
      this.props.navigation.dispatch(navigateHistory);
    }

    /**
     * Navigates to the coinSend Page
     */
    navigateToSend = () => {
      const navigateCoinSend = NavigationActions.navigate({
        routeName: 'coinSend',
        params: { name: 'Shubhnik' },
      });
      this.props.navigation.dispatch(navigateCoinSend);
    }

    /**
     * Navigates to the coinReceive Page
     */
    navigateToReceive = () => {
      const navigateCoinReceive = NavigationActions.navigate({
        routeName: 'coinReceive',
        params: { name: 'Shubhnik' },
      });
      this.props.navigation.dispatch(navigateCoinReceive);
    }

    /**
     * Component the contains the tab navigation for the main Wallet Functionality
     */
    render() {
      return (
        <View style={styles.tabHeader}>
            <TouchableOpacity
                style={styles.headerButton}
                onPress={this.navigateToSend} >
                <Text style={[styles.headerSend, styles.fullHeight , this.props.sendActive ? styles.greenShade : null ]}>Send</Text>
                <View style={this.props.sendActive ? styles.sendLine : null }></View>
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.headerButton}
                onPress={this.navigateToHistory}>
                <Text style={[styles.headerActivity, styles.fullHeight, this.props.activityActive ? styles.greenShade : null]}>Activity</Text>
                <View style={this.props.activityActive ? styles.activityLine : null}></View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.headerButton}
                onPress={this.navigateToReceive}>
                <Text style={[styles.headerReceive, styles.fullHeight, this.props.receiveActive ? styles.greenShade : null]} >Receive</Text>
                <View style={this.props.receiveActive ? styles.receiveLine : null}></View>
            </TouchableOpacity>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    width: '82%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
    paddingBottom: '3.5%',
    marginRight: '9%',
    marginLeft: '9%',
  },
  headerSend: {
    alignSelf: 'flex-start',
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Light',
    letterSpacing: 0.6,
  },
  headerActivity: {
    alignSelf: 'center',
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Light',
    letterSpacing: 0.6,
  },
  headerReceive: {
    alignSelf: 'flex-end',
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Light',
    letterSpacing: 0.6,
  },
  headerButton: {
    width: '33%',
  },
  fullHeight: {
    height: '100%',
  },
  greenShade: {
    color: '#12c1a2',
  },
  sendLine: {
    justifyContent: 'flex-end' ,
    borderBottomColor: '#12c1a2',
    borderBottomWidth: 1.5,
    width: '60%',
  },
  activityLine: {
    justifyContent: 'flex-end',
    borderBottomColor: '#12c1a2',
    borderBottomWidth: 1.5,
  },
  receiveLine: {
    justifyContent: 'flex-end',
    borderBottomColor: '#12c1a2',
    borderBottomWidth: 1.5,
    marginLeft: '20%',
  },
});

export default CoinSendTabNavigator;
