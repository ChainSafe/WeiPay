import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import CoinList from '../../Components/CoinList';

class CustomButton extends Component {
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
      headerLeft: (
        <CustomButton navigation={navigation}/>
      )
    }
  }

  render() {
    return (
      <View>
        <Icon name="add" onPress={() => alert('Would Like to Access the Camera to Scan barcodes')} />
        <CoinList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  NavBarButton: {
    flex: 1,
    flexDirection: 'row',
    padding: '5%'
  }
})

export default Tokens
