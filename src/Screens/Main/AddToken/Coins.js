import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import CoinList from '../../../Components/CoinList';


class CustomButton extends Component {
  navigate = () => {
    this.props.navigation.navigate('DrawerOpen')
  }

  render() {
    return (
      <View style={styles.NavBarButton}>
        <View style={{ paddingRight: 5 }}>
          <Icon
            name="search"
            onPress={() => this.props.navigation.navigate('search')}
          />
        </View>
        {/*
        <Icon
          name="menu"
          onPress={() => this.navigate()}
          title="SideMenu"
        /> */}
      </View>
    )
  }
}

class BackButton extends Component {
  navigate = () => {
    debugger
    const navigateToPassphrase = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
    });
    this.props.navigation.dispatch(navigateToPassphrase);
  };

  render() {
    return (
      <Icon
        name='chevron-left'
        size={35}
        color='#007AFF'
        onPress={() => this.props.navigate('Drawer')}
      />
    )
  }
}
{/* <BackButton navigation={navigation} /> */ }
class Coins extends Component {


  static navigationOptions = ({ navigation }) => {

    console.log('Navigation ACtions', NavigationActions)
    return {
      title: 'Enable Tokens',
      headerLeft:
        <Icon
          name='chevron-left'
          size={35}
          color='#007AFF'
          onPress={() => navigation.navigate('Drawer')}
        />
      ,
      headerRight: (
        <CustomButton navigation={navigation} />
      ),
      tabBarLabel: 'Coins'
    }
  }

  navigate = () => {
    const navigateToPassphrase = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
    });
    this.props.navigation.dispatch(navigateToPassphrase);
  };



  render() {
    return (
      <View style={{ flex: 1 }}>
        <CoinList type={'coins'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  NavBarButton: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
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
