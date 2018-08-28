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
                     style={{
                       width:15, 
                       height: 15,                      
                    }}
                />

              </View>
              <View style={styles.mainListItemTextContainer}>
                <Text style={styles.CoinTypeText}>{Object.keys(address)[0]} </Text>
                <Text style={styles.textAddressText}>{address[Object.keys(address)[0]]}</Text>
              </View>
              <View style={styles.mainListItemBarcodeContainer}>
               
              </View>
            </View>


            {/* <View style={styles.boxContainer}>
              <View style={styles.iconImgContainer}>
                <Image
                  source={require('../../../../assets/images/eth.png')}
                  style= {styles.iconImgItem}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.coinType}>{Object.keys(address)[0]} Address</Text>
                <Text style={styles.textAddress}>{address[Object.keys(address)[0]]}</Text>
              </View>
              <View style={styles.barcodeImageContainer}>
                <Image
                  source={require('../../../../assets/icons/barcode.png')}
                  style={styles.barcodeImg}                  
                  />
              </View>
            </View> */}


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
    backgroundColor: 'red',
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
    // marginTop: '0%',
    backgroundColor: 'blue'
  },
  scrollView:{
    flex: 1,
  },

  mainListItemContentContainter: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'blue'
  },
  mainListItemIconContainer: {
    flex: 1.25,
    backgroundColor: 'green',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  mainListItemTextContainer: {
    flex:5,
    backgroundColor: 'purple',
    flexDirection: 'column',
  }, 
  mainListItemBarcodeContainer: {
    flex:2,
    backgroundColor: 'yellow'
  },
  CoinTypeText: {
    fontSize: RF(2.8),
    letterSpacing: 0.5,
    fontFamily: 'Cairo-Regular'
  },
  textAddressText: {
    fontSize: RF(2.1),  
    letterSpacing: 0.4,
    fontFamily: 'Cairo-Light'
  },

  btnContainer: {
    flex: 1.2,
    width: '100%',
    backgroundColor: 'blue',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  boxContainer: {
    flexDirection: 'row', 
    flex: 1,
    backgroundColor: 'green'
  },
  iconImgContainer: {
    flex: 0.1, 
    // marginTop: '-4%'
    backgroundColor: 'purple',
  },
  iconImgItem: {
    flex: 1,
    width: Dimensions.get('window').height * 0.025,
    resizeMode: 'contain',
    // marginBottom: '5%',
    // marginLeft: '55%'
  },
  textContainer: {
    flex: 1, 
    // marginLeft: '5%', 
    // marginTop: '2.5%',
    backgroundColor: 'yellow',
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
})

function mapStateToProps({ contacts }) {
  return { contacts: contacts.contacts }
}


export default connect(null, { getQRCodeData })(ContactAddresses)
