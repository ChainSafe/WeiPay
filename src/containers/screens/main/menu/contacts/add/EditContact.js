import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Image,
} from 'react-native';
import { FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import RF from 'react-native-responsive-fontsize';
import * as actions from '../../../../../store/actions/ActionCreator';
import LinearButton from '../../../../../components/linearGradient/LinearButton';
import BoxShadowCard from '../../../../../components/shadowCards/BoxShadowCard';


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
    this.inputRefs = {};
    const current = this.props.currentContact;
    const contactName = current.name;
    const contactAddress = current.contactAddress;
    const tokens = [];   
    this.inputRefs = this.props.newTokens.map((token) => {
      const tokenName = {};
      if (token.selected) {
        tokenName.value = token.name;
        tokenName.label = token.name;
        tokenName.img = token.logo.src;
        tokens.push(tokenName); 
      }
    });

    this.state = {
      disabled: true,
      clear: false,
      contactName,
      contactAddress,
      tokenName: null,
      tokens,
      contactAddressInput: '',
    };
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
    const copy = Object.assign({}, this.state.contactAddress);
    copy[coinName] = address;
    this.setState({ contactAddress: copy });
    let coinAddress = {};
    coinAddress[coinName] = address;
    this.props.addingContact(coinAddress);
  }

  navigate = () => {
    this.props.saveAddContactInputs(this.state.contactName, this.state.contactAddress, this.state.tokenImages);
    this.props.qrScannerInvoker('Contacts');
    this.props.qrScannerCoinInvoker(this.state.tokenName);
    const navigateToQrScanner = NavigationActions.navigate({
      routeName: 'QCodeScanner',
    });
    this.props.navigation.dispatch(navigateToQrScanner);
  };

  /**
   * Checks if the contactAddress state is empty or not.
   * Returns a boolean (true if contactAddress is empty, false if full)
   * @param {Object} o
   */
  isEmptyObject(o) {
    return Object.keys(o).every((x) => {
      return o[x] === '' || o[x] === null;
    });
  }

  editContact() {
    this.props.editContact(this.state.contactName);
    this.props.setSelectedContactFalse()
  }

  clear() {
    this.setState({ contactName: '' });
    const newcontactAddress = {};
    this.props.tokens.map(token => {return newcontactAddress[token.title] = ""});
    this.setState({ contactAddress: newcontactAddress });
  }

  editAnotherCoinAddress() {
    this.setState({ tokenName: 'null' });
  }

  renderAddress(address) {
    const copy = Object.assign({}, this.state.contactAddress);
    copy[this.state.tokenName] = address;
    this.setState({ contactAddress: copy });
    this.setState({ contactAddressInput: address });
  }

  /**
   * Returns the form required to add a contact
   */
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer} >
          <BoxShadowCard >
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>
                Add contact with QR code or Public Address
              </Text>
            </View>
            <View style={styles.topFormInput}>
              <FormInput
                placeholder={"Contact's Name"}
                onChangeText={name => {return this.setState({ contactName: name})}}
                inputStyle={styles.inputContactName}
                placeholderTextColor={'#b3b3b3'}
                value={this.state.contactName}
                selectionColor={'#12c1a2'}
              />
            </View>
            <View style={styles.barcodeContainer}>
              <TouchableOpacity onPress={() => { return this.navigate(); }}>
                <Image
                  source={require('../../../../../../assets/icons/barcode.png')}
                  style={styles.barcodeImg}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
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
                style={pickerStyle}
                value={this.state.tokenName}
                ref={(el) => {
                  this.inputRefs.picker = el;
                }}
              />
            </View>
            <View style={styles.inputAddressContainer}>
              <FormInput
                placeholder={'Public Address'}
                onChangeText={ address => {return this.renderAddress(address)}}
                inputStyle={styles.inputAddressText}
                placeholderTextColor={'#b3b3b3'}
                value={this.state.contactAddress[this.state.tokenName]}
                editable={!!this.state.tokenName}
                selectionColor={'#12c1a2'}
              />
            </View>
            <TouchableOpacity
              style={styles.addAnotherText}
              onPress={this.editAnotherCoinAddress.bind(this)}
              disabled={!this.state.tokenName}>
                <Text style={styles.anotherText}> +  Add Another Coin </Text>
            </TouchableOpacity>
          </BoxShadowCard>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.btnFlex}>
            <LinearButton
              onClickFunction={this.editContact.bind(this)}
              buttonText= 'Update'
              customStyles={styles.btnUpdate}
              />
          </View>
        </View>
      </View>
    </SafeAreaView>
    );
  }
}

/**
 * Styles used in addContact file
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  mainContainer: {
    alignItems: 'center',
    flex: 0.9,
    justifyContent: 'center',
  },
  contentContainer: {
    marginTop: '7.5%',
    flex: 2.3,
    width: '82%',
  },
  cardTextContainer: {
    flex: 0.4,
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '10%',
  },
  cardText: {
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    lineHeight: RF(3.9),
    letterSpacing: 0.4,
    fontSize: RF(2.5),
    flexWrap: 'wrap',
  },
  topFormInput: {
    flex: 0.3,
    paddingLeft: '3%',
    paddingRight: '3%',
    justifyContent: 'center',
  },
  inputContactName: {
    fontSize: RF(2.5),
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Light',
    borderBottomWidth: 0.0001,
  },
  coinInfoContainerMid: {
    flex: 0.3,
    flexDirection: 'row',
  },
  barcodeContainer: {
    flex: 0.4,
    marginLeft: '9%',
    marginBottom: '2%',
    marginTop: '10%',
    justifyContent: 'center',
  },
  barcodeImg: {
    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.18,
  },
  pickerContainer: {
    justifyContent: 'center',
    flex: 0.3,
  },
  addInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  inputAddressContainer: {
    flex: 0.3,
    paddingLeft: '3%',
    paddingRight: '3%',
    justifyContent: 'center',
  },
  inputAddressText: {
    width: '100%',
    flexWrap: 'wrap',
    color: '#12c1a2',
    fontFamily: 'WorkSans-Light',
    fontSize: RF(2.5),
  },
  addAnotherText: {
    flex: 0.3,
    justifyContent: 'center',
    paddingTop: '2.5%',
  },
  btnUpdate: {
    marginLeft: '0%',
    height: Dimensions.get('window').height * 0.082,
  },
  anotherText: {
    marginLeft: '9%',
    color: '#27c997',
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(2.5),
  },
  btnFlex: {
    flex: 1,
  },
  btnContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '82%',
    marginBottom: '2.5%',
    marginTop: '2.5%',
  },
  modal: {
    height: '40%',
    borderRadius: 4,
  },
});

const pickerStyle = {
  inputIOS: {
    fontSize: RF(2.6),
    fontFamily: 'WorkSans-Light',
    paddingLeft: '6%',
    paddingRight: '20%',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderRadius: 4,
    color: 'black',
    marginLeft: '3.5%',
  },
  inputAndroid: {
    color: 'black',
    marginLeft: '5%',
  },
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};
/**
 * Reterives the token list from the state variable
 * Returns an object containing the token list
 * @param {Object} state
 */

const mapStateToProps = ({ contacts, newWallet, Wallet }) => {
  return {
    tokens: newWallet.tokens,
    newTokens: Wallet.tokens,
    currentContact: contacts.incompleteContactInputs,
  };
};

export default connect(mapStateToProps, actions)(EditContact);
