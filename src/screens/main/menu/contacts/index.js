import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddFirstContact from './add/AddFirstContact';
import BackWithMenuNav from "../../../../components/customPageNavs/BackWithMenuNav"



/**
 * Screen that displays all the contacts that have been added to
 * the wallet
 */
class Contacts extends Component {

  /**
   * Sets the screen title to "Contacts".
   */
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Contacts',
      headerRight: (
        <View style={{ paddingRight: 15 }}>
          <Icon
            name="menu"
            onPress={() => navigation.navigate('DrawerOpen')}
            title="SideMenu"
          />
        </View>
      )
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

  /**
   * Method is used to create an interactable item for the listView specific to
   * the name property of the "user" object
   * 
   * @param {Object} user
   */
  renderRow = (user) => {
    return (
      <ListItem
        key={user.name}
        title={user.name}
        onPress={() => this.navigate(user)}
      />
    )
  }

  /**
   * Returns a list of contacts if and only if the length of the contact list reterived from the global state 
   * variable is greater than 0.
   */
  render() {
    const show = this.props.contacts.length === 0 ?
      <View>
        <BackWithMenuNav 
          showMenu={true}
          showBack={true}
          navigation={this.props.navigation}
          backPage={"mainStack"}

        />
        <AddFirstContact navigate={this.props.navigation.navigate} />
      </View>
      :
      <View style={{ flex: 1 }}>
        <BackWithMenuNav 
            showMenu={true}
            showBack={true}
            navigation={this.props.navigation}
            backPage={"mainStack"}

          />
        <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
      </View>
    return show
  }
}

/**
 * Styles are not being in this file
 */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
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

