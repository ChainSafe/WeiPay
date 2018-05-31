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
        <Icon
          name="search"
          onPress={() => this.props.navigation.navigate('search')}
        />
        <Icon
          name="menu"
          onPress={() => this.navigate()}
          title="SideMenu"
        />
      </View>
    )
  }
}

class Coins extends Component {
    // navigate = () => {
    //     const navigateToPassphrase = NavigationActions.reset({
    //       index: 0,
    //       actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
    //     });
    //     this.props.navigation.dispatch(navigateToPassphrase);
    // };

  static navigationOptions = ({ navigation }) => {

    const navigateToPassphrase = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
    });
    debugger
    console.log('Navigation ACtions', NavigationActions)
    return {
      title: 'Enable Tokens',
      headerLeft:
        <Icon
          name='chevron-left'
          size={35}
          color='#007AFF'
          onPress={() => navigation.navigate(navigateToPassphrase)}
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
        {/* <FlatList
          data={[
            { key: 'Bitcoin' },
            { key: 'Ethereum' },
            { key: 'Neo' },
            { key: 'Gas' },
            { key: 'EOX' }
          ]}
          renderItem={({ item }) =>
            <Text
          onPress={() => this.props.navigation.navigate('PortfolioCoins')}
          style={styles.item}>
          {item.key}
            </Text>
          }
        /> */}

        <CoinList type={'coins'}/>

        {/* <View style={styles.btnContainer} >
          <Button
            title='Add'
            icon={{ size: 28 }}
            buttonStyle={{
          backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
          justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
            }}
            textStyle={{ textAlign: 'center' }}
            onPress={this.navigate}
          />
        </View> */}


      </View>
    )
  }
}

const styles = StyleSheet.create({
  NavBarButton: {
    flex: 1,
    flexDirection: 'row',
    padding: '5%'
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
