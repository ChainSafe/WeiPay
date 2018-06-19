import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class AddFirstContact extends Component {
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
            backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
            justifyContent: 'center', marginBottom: 30, marginTop: 5.5
          }}
          textStyle={{ textAlign: 'center' }}
          onPress={() => this.props.navigate('AddContact')}
        />
      </View>
    )
  }
}



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
  buttonStyle:   { backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
    justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5 }
})

export default AddFirstContact
