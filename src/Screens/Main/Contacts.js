import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { NavigationActions } from "react-navigation";
import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class Contacts extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Contacts',
      headerRight: (
        <Icon
          name="menu"
          onPress={() => navigation.navigate('DrawerOpen')}
          title="SideMenu"
        />
      )
    }
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer} >
          <View style={styles.form} >
            <FormLabel>Full Name</FormLabel>
            <FormInput style={styles.formInputElement} placeholder={"Full Name"}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start'
  },
  contentContainer: {
    marginTop: 25
  },
  form: {
    width: 340
  },
  btnContainer: {
    flex: 1, justifyContent: 'flex-end', alignItems: 'center'
  },
})

export default Contacts;
