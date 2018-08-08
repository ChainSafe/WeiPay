import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddFirstContact from './add/AddFirstContact';
import BackWithMenuNav from "../../../../components/customPageNavs/BackWithMenuNav"
import ContactTabNavigator from '../../../../components/customPageNavs/ContactTabNavigator'
import SelectedContact from './SelectedContact'


/**
 * Screen that displays all the contacts that have been added to
 * the wallet
 */
class ContactsTab extends Component {

  /**
   * Sets the screen title to "Contacts".
   */
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: 'Contacts',
  //     headerRight: (
  //       <View style={{ paddingRight: 15 }}>
  //         <Icon
  //           name="menu"
  //           onPress={() => navigation.navigate('DrawerOpen')}
  //           title="SideMenu"
  //         />
  //       </View>
  //     )
  //   }
  // }

  constructor(props) {
    super(props)
    this.state = {
      active: true,
      selectedContact: false,
      contact: null
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
  //  */
  // navigate = (user) => {
  //   let addresses = user.contactAddress
  //   let name = user.name
  //   let tokenName = user.tokenName
  //
  //   const navigateToCreateOrRestore = NavigationActions.navigate({
  //     routeName: 'contactAddresses',
  //     params: { addresses, name, tokenName  }
  //   });
  //
  //   this.props.navigation.dispatch(navigateToCreateOrRestore);
  // };

  /**
   * Method is used to create an interactable item for the listView specific to
   * the name property of the "user" object
   *
   * @param {Object} user
   */
  renderRow = () => {
    return (
      this.props.contacts.map(contact =>
        <View style={{marginTop:'3%'}} key={contact.name}>
          <ListItem
            key={contact.name}
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
                  {contact.name}
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
            onPress={
              () => {
                this.props.selectedContactTrue()
                this.setState({ contact })
              }}
          />
        </View>
      )
    )
  }

  /**
   * Returns a list of contacts if and only if the length of the contact list reterived from the global state
   * variable is greater than 0.
   */
  render() {
    const show = this.props.contacts.length === 0 ?
        <AddFirstContact setAddContact={this.props.setAddContact}/>
      : this.props.selectedContact === true ?
        <SelectedContact contact={this.state.contact} navigation={this.props.navigation}/>

      :
        <View style={styles.list}>
          {this.renderRow()}
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
    marginTop: '4%',
    flex: 1,
    marginLeft: '9%'
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

export default connect(mapStateToProps)(ContactsTab);
