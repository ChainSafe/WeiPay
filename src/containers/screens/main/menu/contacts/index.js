import React, { Component } from 'react';
import {
 View, Text, StyleSheet, ListView, SafeAreaView, TouchableWithoutFeedback, Dimensions, Keyboard
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
 Icon, Button, FormLabel, FormInput, FormValidationMessage, List, ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import RF from 'react-native-responsive-fontsize';
import * as actions from '../../../../store/actions/ActionCreator';
import AddFirstContact from './add/AddFirstContact';
import ContactBackWithMenuNav from '../../../../components/customPageNavs/ContactBackWithMenuNav';
import ContactTabNavigator from '../../../../components/customPageNavs/ContactTabNavigator';
import ContactsTab from './ContactsTab';
import AddContact from './add/AddContact';
import TabNavigator from '../../../../components/customPageNavs/CustomTabNavigator';

/**
 * Screen that displays all the contacts that have been added to
 * the wallet
 */
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      tab: this.props.activeTab,
      selectedContact: false,
    };
  }

  displayContactTab() {
    if (this.state.tab === 'contacts') {
      return (
        <ContactsTab
          setAddContactTab={() => {return this.setState({ tab: 'addcontact' });}}
          navigation={this.props.navigation}
          selectedContact={this.state.selectedContact}
          selectedContactTrue={() => {return this.setState({ selectedContact: true});}}
          setSelectedContactFalse={() => {return this.setState({ selectedContact: false});}}
        />
      );
    }
    if (this.state.tab === 'addcontact') {
      return <AddContact navigation={this.props.navigation} />;
    }
  }

  setAddContactTab = () => {
    this.props.contactsActiveTab('addcontact');
    this.setState({ tab: 'addcontact' });
    this.setState({ selectedContact: false });
  }

  setContactTab = () => {
    this.props.contactsActiveTab('contacts');
    this.setState({ tab: 'contacts' });
    this.setState({ selectedContact: false });
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
                backPage={'mainStack'}
                backButton={() => {return this.setState({ selectedContact: false });}}
              />
              <ContactTabNavigator
                Active={this.state.active}
                navigation={this.props.navigation}
                setContactTab={this.setContactTab}
                setAddContactTab={this.setAddContactTab}
                tab={this.state.tab}
              />
              {this.displayContactTab()}
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
    );
  }
}

/**
 * Styles are not being in this file
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f4f7f9',
  },
  rowContainer: {
    marginTop: '3%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: '2.5%',
    backgroundColor: '#f4f7f9',
  },
  contentContainer: {
    marginTop: 25,
  },
  form: {
    width: 340,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '5%',
  },
  listItem: {
    marginTop: '2.5%',
    marginLeft: '0.25%',
  },
  listItemText: {
    fontSize: RF(2.4),
    fontFamily: 'Cairo-Regular',
    alignItems: 'flex-start',
    flex: 1,
    width: '90%',
    letterSpacing: 0.5,
    top: '1%',
  },
  listItemContainerStyle: {
    borderRadius: 10,
    width: '90%',
    height: 55,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#F8F8FF',
    shadowColor: '#F8F8FF',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 20,
    shadowRadius: 10,
  },
  list: {
    marginLeft: '9%',
  },
});

/**
 * Method reterives the list contacts that is stored in the global
 * state variable and is returns an object with that information
 * @param {Object} param0
 */
function mapStateToProps({ contacts }) {
  return {
    contacts: contacts.contacts,
    activeTab: contacts.activeTab,
  };
}

export default connect(mapStateToProps, actions)(Contacts);
