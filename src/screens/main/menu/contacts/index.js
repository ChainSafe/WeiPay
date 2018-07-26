import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddFirstContact from './add/AddFirstContact';
import BackWithMenuNav from "../../../../components/customPageNavs/BackWithMenuNav"
import ContactTabNavigator from '../../../../components/customPageNavs/ContactTabNavigator'



/**
 * Screen that displays all the contacts that have been added to
 * the wallet
 */
class Contacts extends Component {

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
    this.state = { active: true }
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

  /**
   * Returns a list of contacts if and only if the length of the contact list reterived from the global state
   * variable is greater than 0.
   */
  render() {
    const show = this.props.contacts.length === 0 ?
      <View style={styles.mainContainer}>
        <BackWithMenuNav
          showMenu={true}
          showBack={false}
          navigation={this.props.navigation}
          backPage={"mainStack"}
        />
        <ContactTabNavigator
          Active={this.state.active}
          navigation={this.props.navigation}
        />
        <AddFirstContact navigate={this.props.navigation.navigate} />
      </View>
      :
      <View style={styles.mainContainer}>
        <BackWithMenuNav
          showMenu={true}
          showBack={false}
          navigation={this.props.navigation}
          backPage={"mainStack"}
        />
        <ContactTabNavigator
          Active={this.state.active}
          navigation={this.props.navigation}
        />

        <View style={styles.list}>
          <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
        </View>
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

export default connect(mapStateToProps)(Contacts);
