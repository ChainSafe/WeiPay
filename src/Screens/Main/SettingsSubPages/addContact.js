import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import AddContactList from '../../../Components/AddContactList';
import { Card } from '../../../Components/common/Card';
import { CardSection } from '../../../Components/common/CardSection';




class addContact extends Component {

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 3 }}>
        <TextInput textAlign={'center'} placeholder="Enter Contact Name" style={styles.NameInputStyle} />

        <AddContactList />
        <View style={styles.btnContainer} >
          <Button
            title='Add Contact'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
              justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
            }}
            textStyle={{ textAlign: 'center' }}
            onPress={this.navigate}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'column',
    backgroundColor: 'red'
  },
  btnContainer: {
    alignItems: 'center', height: 60, paddingTop: 10, paddingBottom: 10, justifyContent: "center"
  },

  NameInputStyle: {
    paddingTop: 10,
    paddingLeft: 2,
    paddingRight: 2,
    fontWeight: 'bold',
    fontSize: 15,
    width: '100 %', backgroundColor: 'white'
  }

});

export default addContact;
