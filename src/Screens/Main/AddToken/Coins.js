import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import CoinList from '../../../components/CoinList';

/**
 * React Component
 * Creates a button like component that can be used
 * to initiate a search on list
 */
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
      </View>
    )
  }
}
/**
 * React-Component
 * This component is not being used anywhere
 */
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

/**
 * React Screen Component
 * Screen to add more coins to the portfolio
 */
class Coins extends Component {
  /**
   * Opens up the Drawer Navigator that allows you to navigate and select
   * new coins to add
   * 
   */
  static navigationOptions = ({ navigation }) => {
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

  /**
   * Allows you to navigate to the navigation drawer
   */
  navigate = () => {
    const navigateToPassphrase = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
    });
    this.props.navigation.dispatch(navigateToPassphrase);
  };

  /**
   * Contains tha CoinList Component
   */
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CoinList type={'coins'} />
      </View>
    )
  }
}

/**
 * Styles
 */
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
    alignItems: 'center',
    height: 60,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center"
  }
})

export default Coins
