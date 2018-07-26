import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from 'react-navigation';
import Portfolio from '../../screens/main/portfolio/index';
import BackupPhrase from '../../screens/main/menu/settings/BackupPhrase';
import Contacts from '../../screens/main/menu/contacts/index';
import AddContact from '../../screens/main/menu/contacts/add/AddContact';
import Settings from '../../screens/main/menu/settings/index';
import AddToken from '../../screens/main/tokens/add/index';

/**
 * Creates a componet containing the Slide in DrawerNavigator
 * @param {Object} props 
 */
const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1 }}>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);

/**
 * Slide in Drawer Navigator setup
 * where each property is pointing to screen
 */
export default DrawerNavigator({
  backupPhrase: {
    screen: BackupPhrase
  },
  Contacts: {
    screen: StackNavigator({
        contacts: { screen: Contacts },
        addContact: { screen: AddContact }
      })
  },
  AddToken: {
    screen: AddToken
  },
  Settings: {
    screen: StackNavigator({
      settingsMain: { screen: Settings },      
    },
      {
        headerMode: 'none'
      })
  },
}, 
  {
    contentComponent: CustomDrawerContentComponent,
    headerMode: 'none',
    header: false
  })
