import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from 'react-navigation';

import Portfolio from '../../screens/main/portfolio/index';

import BackupPhrase from '../../screens/main/menu/settings/BackupPhrase';


// import Contacts from '../../screens/main/menu/contacts/index';
import Contacts from '../../screens/main/menu/contacts/index';





import addContact from '../../screens/main/SettingsSubPages/addContact';

import Settings from '../../screens/main/menu/settings/index';

import Search from '../../screens/main/menu/settings/Search';

import LanguageChange from '../../screens/main/SettingsSubPages/LanguageChange';
import ChangeCurrency from '../../screens/main/SettingsSubPages/ChangeCurrency';
import CoinSend from '../../screens/main/PortfolioTabs/CoinSend';
import CoinReceive from '../../screens/main/PortfolioTabs/CoinReceive';
import CoinActivity from '../../screens/main/PortfolioTabs/CoinActivity';
import TokenReceive from '../../screens/main/PortfolioTabs/TokenReceive';
import TokenSend from '../../screens/main/PortfolioTabs/TokenSend';
import AddToken from '../../screens/main/AddToken'

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
  portfolio: {
    screen: Portfolio
  },
  backupPhrase: {
    screen: BackupPhrase
  },
  Contacts: {
    screen: TabNavigator({
      contacts: { screen: Contacts },
      addContact: { screen: addContact }
    }, {
        navigationOptions: {
          headerStyle: {
            borderBottomWidth: 0,
          }
        },
        tabBarPosition: 'top',
        tabBarOptions: {
          labelStyle: { fontSize: 16, marginBottom: 13 },
          style: {
            borderTopColor: 'transparent'
          }
        }
      })
  },
  AddToken: {
    screen: AddToken
  },
  Settings: {
    screen: StackNavigator({
      settingsMain: { screen: Settings },
      languageChange: { screen: LanguageChange },
      changeCurrency: { screen: ChangeCurrency },
    },
      {
        headerMode: 'none'
      })
  },
  search: {
    screen: Search
  }
}, {
    contentComponent: CustomDrawerContentComponent,
    headerMode: 'none',
    header: false
  })
