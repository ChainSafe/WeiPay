import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ListView, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { NavigationActions } from "react-navigation";
import { qrScannerInvoker } from '../Actions/actionCreator';
import { List, ListItem, Button } from 'react-native-elements'

/**
 * AddContactList is a component class which is used to display
 * a list of all the tokens that currently exists in the portfolio and 
 * gives the option to input an address for each token.
 * This component is used when adding a new Contact
 */
class AddContactList extends Component {

  /**
   * Initializing constants and the state variable to be used
   * within the class
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      name: "",
      nameValue: "",
      coinValue: "",
      dataSource: ds.cloneWithRows(this.props.tokens),
    }
  }

  /**
   * ES6 Class
   * Used to navigate to the "QCodeScanner" page
   */
  // navigate = () => {
  //   this.props.qrScannerInvoker("CoinSend")
  //   const navigateToQRScanner = NavigationActions.navigate({
  //     routeName: "QCodeScanner",
  //     params: { name: "Shubhnik" }
  //   });
  //   this.props.navigation.dispatch(navigateToQRScanner);
  // };

  //-----------------------

  check() {
    console.log("Clicked");

  }

  //-----------------------



  /**
   * LifeCycle Function: executes after the component has been mounted
   * Executing the action "createContactAddesses" with the latest addresses inputed
   * by the user when adding a new contact
   */
  // componentDidMount() {
  //   let copyTokens = this.props.tokens.slice(0).map(token => { return { ...token, value: "" } })
  //   this.props.createContactAddresses(copyTokens)
  // }
  //complete_contact

  /**
   * Is not used anywhere
   * @param {Object} coin 
   */
  renderRow(coin) {
    return (
      <View style={styles.componentStyle} key={coin.title}>
        <CardSection>
          <View style={styles.section}>
            <Text style={styles.title}>{coin.title} 's Address</Text>
            <Card>
              <TextInput
                placeholder="Enter or Paste Address here"
                onChangeText={(text) => this.props.renderAddress(text, coin.title, coin)}
                ref={ref => this.props.contactAddress = ref}
                value={this.props.contactAddress}
              // key={this.props.contactAddress}
              />
            </Card>
          </View>
        </CardSection>
      </View>
    )
  }

  /**
   * Is not used anywhere
   * @param {string} token 
   */
  listItem(token) {
    return (
      <ListItem title='Enter Address' textInput={true} />
    )
  }

  /**
   * Returns a list of components, where each component allows the user
   * to input the address for a specific token via text/QrCodeScanner
   */
  renderAddressInputs = () => {
    return (
      this.props.tokens.map(coin =>
        <View style={styles.componentStyle} key={coin.title}>
          <CardSection>
            <View style={styles.section}>
              <Text style={styles.title}>{coin.title} 's Address</Text>
              <Card>
                <View style={styles.card}>
                  <Button
                    title='QR'
                    onPress={() => this.props.navigate("QCodeScanner")}
                    style={styles.qrButton}
                  />
                  <TextInput
                    placeholder="Enter or Paste Address here"
                    onChangeText={(text) => this.props.renderAddress(text, coin.title, coin)}
                    ref={ref => this.props.contactAddress = ref}
                    value={this.props.contactAddress[coin.title]}
                    style={styles.addressInput}
                  />
                </View>
              </Card>
            </View>
          </CardSection>
        </View>
      )
    )
  }

  /**
   * Returns the complete form that is required for the user to fill out
   * when adding a new contact to the wallet.
   * Contains an additional textfield to enter the name of the contact
   */
  render() {
    return (
      <View>
        <TextInput
          textAlign={'center'}
          placeholder="Enter Contact Name"
          style={styles.nameInputStyle}
          onChangeText={text => this.props.renderName(text)} //this.props.upDateContactName
          value={this.props.contactName} //this.props.contactName
        />
        <View >
          {this.renderAddressInputs()}
        </View>
      </View>
    );
  }
}

/**
 * Object with all the different styling used in this class
 */
const styles = StyleSheet.create({
  nameInputStyle: {
    paddingTop: 10,
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 10,
    fontWeight: 'bold',
    backgroundColor: 'red',
    fontSize: 18,
    width: '100 %',
    backgroundColor: 'white'
  },
  qrButton: {
    width: 50,
    height: 50,
    backgroundColor: "yellow"
  },
  addressInput: {
    width: 150,
    marginLeft: 0
  },
  card: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingTop: 7,
    paddingBottom: 7
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
    textShadowRadius: 3,
    paddingLeft: 5
  },
  section: {
    flex: 1,
    flexDirection: 'column'
  },
});

/**
 * Redux-thunk function
 * Returns an object that contains information that currently exists within the
 * global state variable.
 * 
 * Points to:
 *  - Current list of tokens that the used has selected for thier porfolio
 *  - currentContact is not used in this class
 *  - clearInput is not used in this class
 *  - current is not used in this class
 * @param {Object} state 
 */
const mapStateToProps = state => {
  return {
    tokens: state.newWallet.tokens,
    currentContact: state.contacts.currentContact,
    clearInput: state.contacts.clearInput,
    current: state.contacts.currentContact,
  }
}

export default connect(mapStateToProps, { qrScannerInvoker })(AddContactList);
