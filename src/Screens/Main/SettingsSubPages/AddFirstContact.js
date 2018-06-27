import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

/**
 * React-Native
 * Temporary Screen used until a contact is added
 */
class AddFirstContact extends Component {

  /**
   * Returns a full screen component with a button that navigates the user
   * to the addContact form
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fontStyle}>
          You can save your friend's cryptocurrency addresses for fast, easy transactions
        </Text>
        <Button
          title='Add your first contact'
          icon={{ size: 28 }}
          buttonStyle={{
            backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
            height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 5, marginTop: 5.5
          }}
          textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
          onPress={() => this.props.navigate('addContact')}
        />
      </View>
    )
  }
}

/**
 * Styles used in the temporary screen used before any contact has been added
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontStyle: {
    fontSize: 17,
    padding: 5,
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
    justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
  }
})

export default AddFirstContact
