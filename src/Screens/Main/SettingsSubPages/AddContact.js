import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import AddContactList from '../../../Components/AddContactList';
import addContactAction from '../../../Actions/actionCreator';
import { Card } from '../../../Components/common/Card';
import { CardSection } from '../../../Components/common/CardSection';


class AddContact extends Component {


  render() {
    console.log(this.props);

    return (
      <View style={{ flex: 1, paddingTop: 3 }}>


        <AddContactList />


        <View style={styles.btnContainer} >
          <View style={{ flexDirection: 'row' }}>
            <Button
              title='Add Contact'
              icon={{ size: 20 }}
              buttonStyle={{
                backgroundColor: 'blue', flex: 1, width: 150, borderRadius: 10, height: 40,
                justifyContent: 'center', alignItems: 'center', marginBottom: 5.5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center' }}
              onPress={this.navigate}
            />
            <Button
              title='Clear'
              icon={{ size: 20 }}
              buttonStyle={{
                backgroundColor: 'blue', flex: 1, width: 150, borderRadius: 10, height: 40,
                justifyContent: 'center', alignItems: 'center', marginBottom: 5.5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center' }}
              onPress={this.navigate}
            />
          </View>
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



export default AddContact;
