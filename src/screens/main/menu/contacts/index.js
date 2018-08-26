import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, SafeAreaView, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddFirstContact from './add/AddFirstContact';
import ContactBackWithMenuNav from "../../../../components/customPageNavs/ContactBackWithMenuNav"
import ContactTabNavigator from '../../../../components/customPageNavs/ContactTabNavigator'
import ContactsTab from './ContactsTab'
import AddContact from './add/AddContact'

/**
 * Screen that displays all the contacts that have been added to
 * the wallet
 */
class Contacts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: true,
      tab: 'contacts',
      selectedContact: false
    }
  }

  /**
   * LifeCycle method (executes before the screen has been rendered)
   * Sets the "contacts" data reterived from the global state variable as the
   * data source for the list view
   */
  componentWillMount() {
    let data = this.props.contacts
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(data);
  }

  /**
   * LifeCycle method (executes only when the state has been changed)
   * Re-sets the "contacts" data reterived from the global state variable as the
   * data source for the list view
   */
  componentWillReceiveProps(nextProps) {
    let data = nextProps.contacts
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(data);
  }

  /**
   * Method is used to navigate to a screen specific to the
   * properties in the "user" object parameter.
   *
   * @param {Object} user
   */
  navigate = (user) => {
    let addresses = user.contactAddress
    const navigateToCreateOrRestore = NavigationActions.navigate({
      routeName: 'contactAddresses',
      params: { addresses }
    });
    this.props.navigation.dispatch(navigateToCreateOrRestore);
  };

  displayContactTab() {
    if (this.state.tab === 'contacts'){
      return (
        <ContactsTab
          setAddContactTab={() => this.setState({ tab: 'addcontact' })}
          navigation={this.props.navigation}
          selectedContact={this.state.selectedContact}
          selectedContactTrue={() => this.setState({ selectedContact: true})}
          setSelectedContactFalse={() => this.setState({ selectedContact: false})}
        />
      )
    }
    if (this.state.tab === 'addcontact'){
      return <AddContact navigation={this.props.navigation} />
    }
  }

  /**
   * Method is used to create an interactable item for the listView specific to
   * the name property of the "user" object
   *
   * @param {Object} user
   */
  renderRow = (user) => {
    return (
      <View style={{marginTop:'3%'}}>
        <ListItem
          key={user.name}
          title={
            <View style={{flexDirection:'row', justifyContent:"center", marginLeft:'5%'}}>
              <Text style={{
                fontSize:16,
                fontFamily: "Cairo-Regular",
                alignItems:"flex-start",
                flex:1,
                width:'90%',
                letterSpacing: 0.5,
                top: '1%'
              }}>
                {user.name}
              </Text>

            </View>
          }
          containerStyle = {{
            borderRadius: 10,
            width: '90%',
            height: 55,
            backgroundColor: '#ffffff',
            justifyContent:"center",
            borderWidth:0.5,
            borderColor: '#F8F8FF',
            shadowColor: '#F8F8FF',
            shadowOffset: { width: 1, height: 1},
            shadowOpacity:20,
            shadowRadius: 10,
          }}
          onPress={() => this.navigate(user)}
        />
      </View>
    )
  }

  setAddContactTab = () => {
    this.setState({ tab: 'addcontact' })
    this.setState({ selectedContact: false })
  }

  setContactTab = () => {
    this.setState({ tab: 'contacts' })
    this.setState({ selectedContact: false })
  }
  /**
   * Returns a list of contacts if and only if the length of the contact list reterived from the global state
   * variable is greater than 0.
   */
  render() {
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
              <ContactBackWithMenuNav
                showMenu={true}
                showBack={this.state.selectedContact}
                navigation={this.props.navigation}
                backPage={"mainStack"}
                backButton={() => this.setState({ selectedContact: false })}
              />
              <ContactTabNavigator
                Active={this.state.active}
                navigation={this.props.navigation}
                setContactTab={this.setContactTab}
                setAddContactTab={this.setAddContactTab}
                tab={this.state.tab}
              />
              {this.displayContactTab()}
              <View style={{ alignItems:'center', marginTop: '-5%', flex: 0.08, }} >
                <Text style={styles.textFooter} >Powered by ChainSafe </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      )
  }
}

/**
 * Styles are not being in this file
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: '2.5%',
    backgroundColor: "#fafbfe",
  },
  contentContainer: {
    marginTop: 25
  },
  form: {
    width: 340
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  listItem: {
    marginTop: '2.5%',
    marginLeft: '0.25%',
  },
  list: {
    marginLeft: '9%'
  },
  textFooter : {
    fontFamily: "WorkSans-Regular",
    fontSize: 11,
    marginTop: '3.5%',
    color: '#c0c0c0'
  }
})

/**
 * Method reterives the list contacts that is stored in the global
 * state variable and is returns an object with that information
 * @param {Object} param0
 */
function mapStateToProps({ contacts }) {
  return { contacts: contacts.contacts }
}

export default connect(mapStateToProps)(Contacts);
