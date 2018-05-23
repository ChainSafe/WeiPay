import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import TokenList from '../../../Components/TokenList';

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
      headerRight: (
        <CustomButton navigation={navigation} />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        <TokenList />
        <View style={styles.btnContainer} >
          <Button
            title='Add'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
              justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
            }}
            textStyle={{ textAlign: 'center' }}
            onPress={() => alert('Would Like to Access the Camera to Scan barcodes')}
          />
        </View>
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
  btnContainer: {
    alignItems: 'center', height: 60, paddingTop: 10, paddingBottom: 10, justifyContent: "center"
  }
})

export default Tokens
