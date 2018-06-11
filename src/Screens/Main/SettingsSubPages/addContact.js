import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import AddContactList from '../../../Components/AddContactList';
import addContactAction from '../../../Actions/actionCreator';
import { Card } from '../../../Components/common/Card';
import { CardSection } from '../../../Components/common/CardSection';
import * as actions from '../../../Actions/actionCreator';

class AddContact extends Component {

  constructor(props) {
    super(props);
    this.renderAddContact = this.renderAddContact.bind(this);
    this.state = {
      disabled: true
    }
  }


  renderAddContact() {
    this.props.completeContact();
  }

  clear() {
    this.props.clearInput()
  }


  render() {


    console.log("DIASABLLEEDDDD", this.state.disabled)
    return (
      <View style={{ flex: 1, paddingTop: 3 }}>
        <AddContactList value={this.value} disableFalse={() => this.setState({ disabled: false })}/>
        <View style={styles.btnContainer} >
          <View style={{ flexDirection: 'row' }}>
            <Button
              disabled={this.state.disabled}
              title='Add Contact'
              icon={{ size: 20 }}
              buttonStyle={{
                backgroundColor: 'blue', flex: 1, width: 150, borderRadius: 10, height: 40,
                justifyContent: 'center', alignItems: 'center', marginBottom: 5.5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center' }}
              onPress={() => this.renderAddContact()}
            />
            <Button
              title='Clear'
              icon={{ size: 20 }}
              buttonStyle={{
                backgroundColor: 'blue', flex: 1, width: 150, borderRadius: 10, height: 40,
                justifyContent: 'center', alignItems: 'center', marginBottom: 5.5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center' }}
              onPress={() => this.clear()}
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

const mapStateToProps = state => {
  return {
    currenctContact: state.contacts.currenctContact
  }
}

export default connect(mapStateToProps, actions)(AddContact)
//export default AddContact;
