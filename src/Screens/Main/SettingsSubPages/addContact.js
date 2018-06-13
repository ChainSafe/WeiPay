import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet, TextInput } from 'react-native';
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = this.props.tokens.map(token => {
                  token.value = ""
                  return token
                })
    this.renderAddContact = this.renderAddContact.bind(this);
    this.state = {
      disabled: true,
      clear: false,
      contactName: "",
      contactAddress: "",
      dataSource: ds.cloneWithRows(data)
    }
  }


  renderAddContact() {
    this.props.completeContact();
    this.setState({ contactName: "" })
    this.setState({ contactAddress: "" })
  }

  clear() {
    this.setState({ contactName: "" })
    this.setState({ contactAddress: "" })
  }

  renderName(name) {
      this.setState({contactName: name})
      var contact = { name: name }
      this.props.addingContact(contact)
  }

  renderAddress(address, coinName, coin) {
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //
    // const data =
    //   this.props.tokens.map(token => {
    //     if ( coinName === token.title ) {
    //       token.value = address
    //     }
    //     return token
    //   })
    // this.setState({ dataSource: ds.cloneWithRows(data) })
    this.setState({ contactAddress: address })
    var coinAddress = {}
    coinAddress[coinName] = address
    this.props.addingContact(coinAddress)
  }

// clear button, types into inputs, that value should be passed to the parent, clear in parent state to null
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 3 }}>
        <AddContactList
          contactName={this.state.contactName}
          dataSource={this.state.dataSource}
          contactAddress={this.state.contactAddress}
          renderAddress={this.renderAddress.bind(this)}
          renderName={this.renderName.bind(this)}
        />
        <View style={styles.btnContainer} >
          <View style={{ flexDirection: 'row' }}>
            <Button
              disabled={this.state.contactName === "" || this.state.contactAddress === ""}
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
    tokens: state.newWallet.tokens,
    currenctContact: state.contacts.currenctContact,
    current: state.contacts.currentContact,
  }
}

export default connect(mapStateToProps, actions)(AddContact)
//export default AddContact;
