import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet, TextInput, ScrollView, Dimensions, TouchableOpacity, Picker, Image } from 'react-native';
import { Button, List, ListItem, Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import AddContactList from '../../../../../components/contacts/AddContactList';
import * as actions from '../../../../../actions/ActionCreator';
import BackWithMenuNav from '../../../../../components/customPageNavs/BackWithMenuNav'
import ContactTabNavigator from '../../../../../components/customPageNavs/ContactTabNavigator'
import LinearButton from '../../../../../components/LinearGradient/LinearButton'
import ClearButton from '../../../../../components/LinearGradient/ClearButton'
import BoxShadowCard from '../../../../../components/ShadowCards/BoxShadowCard'

import barcode from '../../../../../assets/icons/barcode.png'
import RNPickerSelect from 'react-native-picker-select';
/**
 * Is a full screen react component
 * This screen is used to add a new contact to the wallet contact list.
 *
 */
class EditContact extends Component {

  /**
   * Initializes the current token list stored in state as the datasource
   * for the scrollListView.
   * Also initializes the local state variable to keep track of the changes made to
   * the text fields
   * @param {Object} props
   */
  constructor(props) {

    super(props);


    let tokens = []
    this.inputRefs = {};
    let contact = props.navigation.state.params.contact
    let contactName = contact.name
    let contactAddress = contact.contactAddress

    this.props.tokens.map(token => {
      let tokenName = {}
      tokenName.value = token.title
      tokenName.label = token.title
      tokens.push(tokenName)
    })

    this.state = {
      disabled: true,
      clear: false,
      contactName,
      contactAddress,
      tokenName: undefined,
      tokens,
      contactAddressInput: ""
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
  // clear() {
  //   this.setState({ contactName: "" })
  //   let newcontactAddress = {}
  //   this.props.tokens.map(token => newcontactAddress[token.title] = "")
  //   this.setState({ contactAddress: newcontactAddress })
  // }

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
  renderAddress(address, coin) {
    let copy = Object.assign({}, this.state.contactAddress)
    copy[coinName] = address
    this.setState({ contactAddress: copy })
    var coinAddress = {}
    coinAddress[coinName] = address
    this.props.addingContact(coinAddress)
  }

  navigate = () => {
    const navigateToQrScanner = NavigationActions.navigate({
      routeName: 'QCodeScanner',
      params: "addContact"
    });
    this.props.navigation.dispatch(navigateToQrScanner);
  };

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


  editContact() {
    this.props.editContact(this.state.contactName, this.state.contactAddress);
    this.setState({ contactName: "" })
    let newcontactAddress = {}
    this.props.tokens.map(token => newcontactAddress[token.title] = "")
    this.setState({ contactAddress: newcontactAddress })
  }

  clear() {
    this.setState({ contactName: "" })
    let newcontactAddress = {}
    this.props.tokens.map(token => newcontactAddress[token.title] = "")
    this.setState({ contactAddress: newcontactAddress })
  }

  addAnotherCoinAddress() {

    this.setState({ contactAddressInput: "" })
  }

  renderAddress(address) {
    let copy = Object.assign({}, this.state.contactAddress)
    copy[this.state.tokenName] = address
    this.setState({ contactAddress: copy })
    this.setState({ contactAddressInput: address })

  }

  /**
   * Returns the form required to add a contact
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{flex: 0.2}} />
        <BackWithMenuNav
          showMenu={true}
          showBack={this.state.selectedContact}
          navigation={this.props.navigation}
          backPage={"contacts"}
          showBack={true}
        />
        <View style={styles.contentContainer} >
          <BoxShadowCard style={{ padding: '160%' }}>
            <Text style={styles.cardText}>
              Add contact by scanning QR code, or pasting in contact's WeiPay Address
            </Text>

            <View style={{backgroundColor: 'none'}}>
              <FormInput
                placeholder={"Contact's Name"}
                onChangeText={name => this.setState({ contactName: name})}
                inputStyle={{width:'100%', flexWrap: 'wrap', color:'#12c1a2'}}
                value={this.state.contactName}
              />
            </View>
            <View style={{marginLeft: '5%', marginTop: '5%'}}>
              <Image
                source={require('../../../../../assets/icons/barcode.png')}
                style={{height: 70, width: 70}}
              />
            </View>
            <View style={{backgroundColor: 'none', marginRight: '5%'}}>
              <RNPickerSelect
                placeholder={{
                    label: 'Coin Type',
                    value: null,
                }}
                items={this.state.tokens}
                onValueChange={(value) => {
                  this.setState({
                      tokenName: value,
                  });
                }}

                style={{ ...pickerSelectStyles }}
                value={this.state.favColor}
                ref={(el) => {
                    this.inputRefs.picker = el;
                }}
              />
            </View>
            <View style={{ backgroundColor: 'none'}}>
              <FormInput
                placeholder={"WeiPay Address"}
                onChangeText={ address => this.renderAddress(address)}
                inputStyle={{width:'100%', flexWrap: 'wrap', color:'#12c1a2'}}
                value={this.state.contactAddress[this.state.tokenName]}
                editable={!!this.state.tokenName}
              />
            </View>
          </BoxShadowCard>
        </View>

        <View style={{flex: 0.6, justifyContent: 'flex-end'}}>
          <View style={styles.btnContainer}>
            <ClearButton
              buttonText='Clear'
              onClickFunction={this.clear.bind(this)}
              customStyles={styles.clearButton}
            />
            <LinearButton
              buttonText='Edit Contact'
              onClickFunction={this.editContact.bind(this)}
              customStyles={styles.addButton}
            />
          </View>
          <View style={{ alignItems:'center', marginTop: '-5%', flex: .3, }} >
            <Text style={styles.textFooter} >Powered by ChainSafe </Text>
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
  mainContainer: {
    alignItems: 'center',
    flex: 1
  },
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
  contentContainer : {
    alignItems: 'center',
    flex: 1.6,
    width: '82%',
  },
  anotherCoinContainer: {
    flex: .4,
    width: '82%'
  },
  cardText : {
    paddingBottom: '5%',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontFamily: "WorkSans-Light",
    color: '#000000',
    fontSize: 16,
  },
  clearButton: {
    width: Dimensions.get('window').height * 0.225,
    height: Dimensions.get('window').height * 0.082,
    marginLeft: '5%'
  },
  addButton: {
    width: Dimensions.get('window').height * 0.225,
    height: Dimensions.get('window').height * 0.082,
    marginLeft: '0%'
  },
  btnContainer: {
    flex: 0.3,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'flex-end',
    marginLeft: '1.5%',
    marginBottom: '8%',
  },
  modal: {
     height: '40%',
     borderRadius: 4
  },
  textFooter : {
    fontFamily: "WorkSans-Regular",
    fontSize: 11,
    marginTop: '3.5%',
    color: '#c0c0c0'
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 17,
      fontFamily: "WorkSans-Light",
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderRadius: 4,
      backgroundColor: 'white',
      color: 'black',
      marginLeft: '3.5%'
  },
});
/**
 * Reterives the token list from the state variable
 * Returns an object containing the token list
 * @param {Object} state
 */

const mapStateToProps = ({ contacts, newWallet }) => {
  return {
    tokens: newWallet.tokens,
    currentContact: contacts.currentContact,
    current: contacts.currentContact,
  }
}

export default connect(mapStateToProps, actions)(EditContact)
