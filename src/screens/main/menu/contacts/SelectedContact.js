import React, { Component } from 'react';
import { Text, View, TextInput, ListView, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';
import { Card } from '../../../../components/common/Card';
import { CardSection } from '../../../../components/common/CardSection';
import { getQRCodeData } from '../../../../actions/ActionCreator'
import BackWithMenuNav from "../../../../components/customPageNavs/BackWithMenuNav"
import BoxShadowCard from '../../../../components/ShadowCards/BoxShadowCard'
import LinearButton from '../../../../components/LinearGradient/LinearButton';
import EditContact from './add/EditContact';
import RF from "react-native-responsive-fontsize";

class ContactAddresses extends Component {

  state = {
    editContact: false
  }

  componentWillMount() {
    let addresses = this.props.contact.contactAddress
    let data = []
    for (let key of Object.keys(addresses)) {
      address = { [key]: addresses[key] }
      data.push(address)
    }
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(data);
  }

  navigateToCoinSend = address => {
    const navigateToCreateOrRestore = NavigationActions.navigate({
        routeName: 'coinSend',
        params: { address }
      });
      this.props.navigation.dispatch(navigateToCreateOrRestore);
  };

  navigateToEditContact = () => {
    const navigateToCreateOrRestore = NavigationActions.navigate({
      routeName: 'editContact',
      params: { contact: this.props.contact }
    });
    this.props.navigation.dispatch(navigateToCreateOrRestore);
  };

  renderRow(address) {
    console.log(this.props.contact);
    const contactInfo = this.props.contact.images;
    let url;

    for (var key in contactInfo) {
      if (contactInfo.hasOwnProperty(key)) {
          if(key == Object.keys(address)[0]) {
            console.log(key + " -> " + contactInfo[key]);
            console.log(Object.keys(address)[0]);
            url = contactInfo[key];
          }
      }
  }

   return (
      <View style={styles.listItemContainer}>
        <TouchableOpacity onPress={() => this.navigateToCoinSend(address[Object.keys(address)[0]])}>
          <BoxShadowCard>
            <View style={styles.mainListItemContentContainter}>
              <View style={styles.mainListItemIconContainer}>
                <Image
                     source={{uri: url}}
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
    )
  }

  renderSelectedContactOrEditedContact = () => {
    if (this.state.editContact === true) {
      return (
        <EditContact contact={this.props.contact} setSelectedContactFalse={this.props.setSelectedContactFalse}/>
      )
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.scrollViewContainer}>
          <Text style={styles.contactName}>{this.props.contact.name}</Text>
          <ScrollView style={styles.scrollView} >
            <ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} removeClippedSubviews={false}  />
          </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.btnFlex}>
            <LinearButton
              buttonText='Clear'
              onClickFunction={this.clear.bind(this)}
              customStyles={styles.clearButton}
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
        <View style={styles.btnContainer}>
          <LinearButton
            buttonText='Edit Contact'
            customStyles={styles.button}
            onClickFunction={() => this.setState({ editContact: true })}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      this.renderSelectedContactOrEditedContact()
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: .95
  },
  scrollViewContainer:{
    marginTop: '5%',
    alignItems:"stretch",
    width:"100%",
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
  scrollView:{
    flex: 1,
  },
  mainListItemContentContainter: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  mainListItemIconContainer: {
    flex: 1.25,
    alignContent: 'center',
    marginTop: 0,
    marginLeft: '7.5%',
  },
  mainListItemTextContainer: {
    flex:5,
    flexDirection: 'column',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    paddingBottom: '2%',
    paddingTop: '2%'
  },
  iconImage: {
    height: Dimensions.get('window').height * 0.04,
    width: Dimensions.get('window').width * 0.07,
    alignItems: 'center' ,
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
    fontFamily: 'WorkSans-Regular'
  },
  textAddress: {
    fontSize: 10,
    fontFamily: 'WorkSans-Regular',
    marginTop: '5%'
  },
  barcodeImageContainer: {
    flex: 0.3
  },
  barcodeImg: {
    flex: 1,
    width: Dimensions.get('window').height * 0.07,
    resizeMode: 'contain',
    marginBottom: '15%',
    marginLeft: '0%'
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
  btnFlex: {
    flex:1,
  },
})

function mapStateToProps({ contacts }) {
  return { contacts: contacts.contacts }
}

export default connect(null, { getQRCodeData })(ContactAddresses)
