import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import CoinList from '../../../../components/tokens/CoinList';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import TwoTabNavigator from '../../../../components/customPageNavs/TwoTabNavigatior';
import LinearButton from '../../../../components/LinearGradient/LinearButton';

/**
 * React Component
 * Creates a button like component that can be used
 * to initiate a search on list
 */
class CustomButton extends Component {
  navigate = () => {
    this.props.navigation.navigate('DrawerOpen');
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
    );
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
      tabBarLabel: 'Coins',
    };
  }

  /**
   * Allows you to navigate to the navigation drawer
   */
  navigate = () => {
    const navigateToPassphrase = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'portfolioScreen' })],
    });
    this.props.navigation.dispatch(navigateToPassphrase);
  };

  /**
   * Contains tha CoinList Component
   */
  render() {
    return (
      
      <View style={styles.mainContainer}>

        <View style={styles.NavBarButton}>
          <BackWithMenuNav 
            showMenu={true}
            showBack={true}
            navigation={this.props.navigation}
            backPage={'mainStack'}
          />
        </View>
        
        <View style={styles.tabNavContainer}>
          <TwoTabNavigator
            leftTabScreen={'AddCoin'}
            leftTabText={'Coins'}
            rightTabScreen={'AddToken'}
            rightTabText={'Tokens'}
            navigation={this.props.navigation}
          />
        </View>
        
        <View style={styles.listContainer}>
          <CoinList type={'tokens'} />
        </View>

        <View style={styles.btnContainer}>
          <LinearButton
            onClickFunction={this.navigate}
            buttonText='Add Tokens'
            customStyles={styles.button}
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.textFooter}>Powered by ChainSafe </Text> 
        </View>


      </View>
    );
  }
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  
  mainContainer: {
    flex: 1 ,
    backgroundColor: '#fafbfe',
  },
  NavBarButton: {
    flex: 0.5, 
    justifyContent: 'center',
    paddingBottom: '2%',
  },
  tabNavContainer: { 
    flex: 0.5, 
    justifyContent: 'center', 
    marginBottom: '2%', 
  },
  listContainer: { 
    flex: 6 ,
    paddingLeft: '9%',
    //alignItems: 'stretch',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,  
  },
  footerContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    paddingBottom: '5%',
    justifyContent: 'center', 
    alignItems: 'center',
    color: '#c0c0c0',
  },
});

export default Coins;
