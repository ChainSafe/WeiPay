import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddFirstContact from './SettingsSubPages/AddFirstContact'

class Contacts extends Component {
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

  componentWillMount() {
    let data = this.props.contacts

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.dataSource = ds.cloneWithRows(data);
  }

  componentWillReceiveProps(nextProps) {
    let data = nextProps.contacts

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.dataSource = ds.cloneWithRows(data);
  }

  navigate = (user) => {

    let addresses = user.contactAddress

    const navigateToCreateOrRestore = NavigationActions.navigate({
      routeName: 'contactAddresses',
      params: { addresses }
    });
    this.props.navigation.dispatch(navigateToCreateOrRestore);
  };

  renderRow = (user) => {
    return (
      <ListItem
        key={user.name}
        title={user.name}
        onPress={() => this.navigate(user)}
      />
    )
  }

  render() {
    const show = this.props.contacts.length === 0 ?
      <AddFirstContact navigate={this.props.navigation.navigate} />
      :
      <View style={{ flex: 1 }}>
        <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
      </View>

    return show
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start'
  },
  contentContainer: {
    marginTop: 25
  },
  form: {
    width: 340
  },
  btnContainer: {
    flex: 1, justifyContent: 'flex-end', alignItems: 'center'
  },
})

function mapStateToProps({ contacts }) {
  return { contacts: contacts.contacts }
}

export default connect(mapStateToProps)(Contacts);

