import React, { Component } from 'react';
import {
  Text, View, ListView, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import RF from 'react-native-responsive-fontsize';
import * as actions from '../../../../store/actions/ActionCreator';
import BoxShadowCard from '../../../../components/shadowCards/BoxShadowCard';
import LinearButton from '../../../../components/linearGradient/LinearButton';
import ClearButton from '../../../../components/linearGradient/ClearButton';
import EditContact from './add/EditContact';


class ContactAddresses extends Component {

  state = {
    editContact: false,
  }

  componentWillMount() {
    const addresses = this.props.contact.contactAddress;
    const data = [];
    for (const key of Object.keys(addresses)) {
      address = { [key]: addresses[key] };
      data.push(address);
    }
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => { return r1 !== r2 ;},
    });
    this.dataSource = ds.cloneWithRows(data);
  }

  navigateToCoinSend = (address, token) => {
    for (let i = 0; i < (this.props.tokens.length - 1); i++) {
      if (token === this.props.tokens[i].name) {
        this.props.addTokenInfo(this.props.tokens[i]);
      }
    }
    this.props.getQRCodeData(address);
    this.props.saveDataForCoinSend(address);
    const navigateToTokenFunctionality = NavigationActions.navigate({
      routeName: 'TokenFunctionality',
    });
    this.props.navigation.dispatch(navigateToTokenFunctionality);
  };

  navigateToEditContact = () => {
    const navigateToEditContact = NavigationActions.navigate({
      routeName: 'editContact',
      params: { contact: this.props.contact },
    });
    this.props.navigation.dispatch(navigateToEditContact);
  };

  renderRow(address) {
    const contactInfo = this.props.contact.images;
    let url;
    for (const key in contactInfo) {
      if (contactInfo.hasOwnProperty(key)) {
        if (key == Object.keys(address)[0]) {
          url = contactInfo[key];
        }
      }
    }

   return (

      <View style={styles.listItemContainer}>
        <TouchableOpacity onPress={() => { return this.navigateToCoinSend(address[Object.keys(address)[0]], Object.keys(address)[0]) ;}}>
          <BoxShadowCard>
            <View style={styles.mainListItemContentContainter}>
              <View style={styles.mainListItemIconContainer}>
                <Image
                     source={{ uri: url }}
                     style={styles.iconImage}
                />
              </View>
              <View style={styles.mainListItemTextContainer}>
                <Text style={styles.CoinTypeText}>{Object.keys(address)[0]} </Text>
                <Text style={styles.textAddressText}>{address[Object.keys(address)[0]]}</Text>
              </View>
            </View>
          </BoxShadowCard>
        </TouchableOpacity>
      </View>
    );
  }

  renderSelectedContactOrEditedContact = () => {
    if (this.state.editContact === true) {
      this.props.updateSavedContactInputs(this.props.contact);
      return (
        <EditContact navigation={this.props.navigation} contact={this.props.contact} setSelectedContactFalse={this.props.setSelectedContactFalse}/>
      );
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.scrollViewContainer}>
          <Text style={styles.contactName}>{this.props.contact.name}</Text>
          <ScrollView style={styles.scrollView} >
            <ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} removeClippedSubviews={false} />
          </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.btnFlex}>
            <ClearButton
              buttonText='Delete Contact'
              onClickFunction={this.deleteContact.bind(this)}
              customStyles={styles.deleteButton}
            />
          </View>
          <View style={styles.btnFlex}>
            <LinearButton
              buttonText='Edit Contact'
              onClickFunction={() => this.setState({ editContact: true })}
              customStyles={styles.addButton}
            />
          </View>
        </View>
      </View>
    );
  }

  deleteContact() {
    this.props.deleteContact(this.props.contact.name)
    this.props.setSelectedContactFalse()
  }

  render() {
    return (
      this.renderSelectedContactOrEditedContact()
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.95,
    alignItems: 'center',
    backgroundColor: '#f4f7f9',
  },
  scrollViewContainer: {
    marginTop: '5%',
    alignItems: 'stretch',
    width: '100%',
    paddingLeft: '9%',
    paddingRight: '9%',
    flex: 6,
  },
  contactName: {
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Regular',
    letterSpacing: 0.6,
    paddingLeft: '1%',
  },
  listItemContainer: {
    flex: 1,
    alignItems: 'stretch',
    height: Dimensions.get('window').height * 0.12,
  },
  scrollView: {
    flex: 1,
  },
  mainListItemContentContainter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainListItemIconContainer: {
    flex: 1.25,
    alignContent: 'center',
    marginTop: 0,
    marginLeft: '7.5%',
  },
  mainListItemTextContainer: {
    flex: 5,
    flexDirection: 'column',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    paddingBottom: '2%',
    paddingTop: '2%',
  },
  iconImage: {
    height: Dimensions.get('window').height * 0.04,
    width: Dimensions.get('window').width * 0.07,
    alignItems: 'center',
  },
  CoinTypeText: {
    fontSize: RF(2.4),
    letterSpacing: 0.5,
    fontFamily: 'Cairo-Regular',
    marginBottom: 0,
    paddingBottom: 0,
  },
  textAddressText: {
    fontSize: RF(1.7),
    letterSpacing: 0.4,
    fontFamily: 'Cairo-Light',
    flexWrap: 'wrap',
  },
  btnContainer: {
    flex: 1.2,
    width: '100%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  coinType: {
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
  },
  textAddress: {
    fontSize: 10,
    fontFamily: 'WorkSans-Regular',
    marginTop: '5%',
  },
  barcodeImageContainer: {
    flex: 0.3,
  },
  barcodeImg: {
    flex: 1,
    width: Dimensions.get('window').height * 0.07,
    resizeMode: 'contain',
    marginBottom: '15%',
    marginLeft: '0%',
  },
  deleteButton: {
    marginLeft: '0%',
    marginRight: '1.75%',
    height: Dimensions.get('window').height * 0.082,
  },
  addButton: {
    marginLeft: '0%',
    marginRight: '1.75%',
    height: Dimensions.get('window').height * 0.082,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '85%',
    marginLeft: '0.5%',
    marginBottom: '2.5%',
    marginTop: '2.5%',
  },
  btnFlex: {
    flex:1,
  },
})

function mapStateToProps({ newWallet }) {
  return { tokens: newWallet.tokens };
}

export default connect(mapStateToProps, actions)(ContactAddresses);
