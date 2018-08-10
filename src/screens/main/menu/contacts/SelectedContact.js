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

class ContactAddresses extends Component {
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
    return (
      <View style={styles.listItemContainer}>

        <TouchableOpacity onPress={() => this.navigateToCoinSend(address[Object.keys(address)[0]])}>
          <BoxShadowCard>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flex: 0.1, marginTop: '-4%'}}>
                <Image
                    source={require('../../../../assets/images/eth.png')}
                    style={{
                      flex: 1,
                      width: Dimensions.get('window').height * 0.025,
                      resizeMode: 'contain',
                      marginBottom: '5%',
                      marginLeft: '55%'
                    }
                    }
                  />
                </View>
                <View style={{flex: 1, marginLeft: '5%', marginTop: '2.5%',}}>
                  <Text style={{fontSize: 14, fontFamily: 'WorkSans-Regular',}}>{Object.keys(address)[0]} Address</Text>
                  <Text style={{fontSize: 10, fontFamily: 'WorkSans-Regular', marginTop: '5%'}}>{address[Object.keys(address)[0]]}</Text>
                </View>
                <View style={{flex: 0.3,}}>
                  <Image
                    source={require('../../../../assets/icons/barcode.png')}
                    style={{
                      flex: 1,
                      width: Dimensions.get('window').height * 0.07,
                      resizeMode: 'contain',
                      marginBottom: '15%',
                      marginLeft: '0%'
                    }
                    }
                  />
                </View>
              </View>
            </BoxShadowCard>
          </TouchableOpacity>
        </View>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        <View style={styles.scrollViewContainer}>
          <Text style={{ fontSize: 15 }}>{this.props.contact.name}</Text>
          <ScrollView style={styles.scrollView} >
            <ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} removeClippedSubviews={false}  />
          </ScrollView>

        </View>
        <View style={styles.btnContainer}>
          <LinearButton
            buttonText='Edit Contact'
            customStyles={styles.button}
            onClickFunction={this.navigateToEditContact}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 13,
    color: "black",
    textShadowRadius: 3
  },
  address: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainContainer: {
    flex: 1
  },
  listItemContainer: {
    flex: 1,
    alignItems: 'stretch',
    height: Dimensions.get('window').height * 0.12,
    marginTop: '0%',
  },
  scrollViewContainer:{
    marginTop: '5%',
    alignItems:"stretch",
    width:"100%",
    paddingLeft: '9%',
    paddingRight: '9%',
    flex: 6,
  },
  scrollView:{
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    width: '100%'
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
})

export default connect(null, { getQRCodeData })(ContactAddresses)

      // <View>
      //   <Card>
      //     <View style={styles.address}>
      //       <Text style={styles.title}>{Object.keys(address)[0]}'s Address</Text>
      //       <Button
      //         title="Send"
      //         titleStyle={{ fontWeight: '700', color: 'black', fontSize: 5 }}
      //         buttonStyle={{
      //           backgroundColor: 'white', borderColor: '#2a2a2a', borderWidth: 2, borderRadius: 10, width: 300,
      //           height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 5.5
      //         }}
      //         textStyle={{ textAlign: 'center', color: '#2a2a2a' }}
      //         onPress={() => this.navigate(address[Object.keys(address)[0]])}
      //       />
      //     </View>
      //     <Text>
      //       {address[Object.keys(address)[0]]}
      //     </Text>
      //   </Card>
      // </View>
