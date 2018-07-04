import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AddContactList from '../../../components/AddContactList';
import { Card } from '../../../components/common/Card';
import { CardSection } from '../../../components/common/CardSection';
import addContactAction from '../../../actions/ActionCreator';
import * as actions from '../../../actions/ActionCreator';

/**
 * Is a full screen react component
 * This screen is used to add a new contact to the wallet contact list.
 * 
 */
class AddContact extends Component {

  /**
   * Initializes the current token list stored in state as the datasource 
   * for the scrollListView.
   * Also initializes the local state variable to keep track of the changes made to 
   * the text fields
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let contactAddress = {}
    this.props.tokens.map(token => contactAddress[token.title] = "")
    this.renderAddContact = this.renderAddContact.bind(this);

    this.state = {
      disabled: true,
      clear: false,
      contactName: "",
      contactAddress
    }
  }

  /**
   * Method used to add all the information inputted for the new contact into the global
   * state variable.
   * Also clears up the input fields.
   */
  renderAddContact() {
    this.props.completeContact(this.state.contactName, this.state.contactAddress);
    this.setState({ contactName: "" })
    let newcontactAddress = {}
    this.props.tokens.map(token => newcontactAddress[token.title] = "")
    this.setState({ contactAddress: newcontactAddress })
  }

  /**
   * Method deletes and clears up any entered inputs made in the inputfields.
   */
  clear() {
    this.setState({ contactName: "" })
    let newcontactAddress = {}
    this.props.tokens.map(token => newcontactAddress[token.title] = "")
    this.setState({ contactAddress: newcontactAddress })
  }

  /**
   * This Method is used to update the contact name in the global
   * and local state variable when ever the contactName inputfield changes.
   * @param {String} name 
   */
  renderName(name) {
    this.setState({ contactName: name })
    var contact = { name: name }
    this.props.addingContact(contact)
  }

  /**
   * This method is passed in as a prop to the AddContactList component.
   * Creates an object with the coinName as the only key, and address as the value of 
   * coinName.
   * Adds this object to the local and Global state variable
   * @param {String} address 
   * @param {String} coinName 
   * @param {Object} coin 
   */
  renderAddress(address, coinName, coin) {
    let copy = Object.assign({}, this.state.contactAddress)
    copy[coinName] = address
    this.setState({ contactAddress: copy })
    var coinAddress = {}
    coinAddress[coinName] = address
    this.props.addingContact(coinAddress)
  }

  /**
   * Checks if the contactAddress state is empty or not.
   * Returns a boolean (true if contactAddress is empty, false if full)
   * @param {Object} o 
   */
  isEmptyObject(o) {
    return Object.keys(o).every(function (x) {
      return o[x] === '' || o[x] === null;
    });
  }

  // clear button, types into inputs, that value should be passed to the parent, clear in parent state to null
  /**
   * Returns the form required to add a contact 
   */
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 3 }}>
        <ScrollView style={{ height: '75%' }} >
          <AddContactList
            contactName={this.state.contactName}
            dataSource={this.state.dataSource}
            renderAddress={this.renderAddress.bind(this)}
            renderName={this.renderName.bind(this)}
            contactAddress={this.state.contactAddress}
          />
        </ScrollView>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              small
              disabled={this.state.contactName === "" || this.isEmptyObject(this.state.contactAddress)}
              title='Add Contact'
              icon={{ size: 20 }}
              buttonStyle={{
                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100,
                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
              onPress={() => this.renderAddContact()}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              small
              title='Clear'
              icon={{ size: 20 }}
              buttonStyle={{
                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100,
                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
              onPress={() => this.clear()}
            />
          </View>
        </View>
      </View>
    );
  }
}

/**
 * Styles used in addContact file
 */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  section: {
    flexDirection: 'column',
    backgroundColor: 'red'
  },
});

/**
 * Reterives the token list from the state variable
 * Returns an object containing the token list
 * @param {Object} state 
 */
const mapStateToProps = state => {
  return {
    tokens: state.newWallet.tokens,
    currenctContact: state.contacts.currenctContact,
    current: state.contacts.currentContact,
  }
}

export default connect(mapStateToProps, actions)(AddContact)

