'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';

import TokenList from '../../../Components/TokenList';

import CoinList from '../../../Components/CoinList';
import Layout from '../../../constants/Layout'
import { NavigationActions } from "react-navigation";


class CustomButton extends Component {
  navigate = () => {
      const navigateToPassphrase = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'DrawerOpen' })]
      });
      this.props.navigation.dispatch(navigateToPassphrase);
  };

  render() {
    return (
      <View style={styles.NavBarButton}>
        <Icon
          name="search"
          onPress={() => this.props.navigation.navigate('search')}
        />
        <Icon
          name="menu"
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="SideMenu"
        />
      </View>
    )
  }
}


class Tokens extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Enable Tokens',
      tabBarLabel: 'Tokens',
      headerLeft: <Button onPress={() => navigation.navigate('DrawerOpen')}/>,
      headerRight: (
        <CustomButton navigation={navigation} />
      )
    }
  }

  navigate = () => {
      const navigateToPassphrase = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
      });
      this.props.navigation.dispatch(navigateToPassphrase);
  };

  onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        <CoinList type={'tokens'} />
        {/* <View style={styles.btnContainer} >
          <Button
            title='Add'
            icon={{ size: 28 }}
            buttonStyle={{
          backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
          justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
            }}
            textStyle={{ textAlign: 'center' }}
            onPress={() => this.navigate()}
          />
        </View> */}
      </View>
    )
  }
}

const scannerSize = Layout.window.width - 60
const styles = StyleSheet.create({
  NavBarButton: {
    flex: 1,
    flexDirection: 'row',
    padding: '5%'
  },
  btnContainer: {
    alignItems: 'center', height: 60, paddingTop: 10, paddingBottom: 10, justifyContent: "center"
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  scanner: {
    height: scannerSize,
    width: scannerSize
  }
})

export default Tokens
