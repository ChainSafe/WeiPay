import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from 'react-navigation';
import Portfolio from '../Screens/Main/Portfolio';
import BackupPhrase from '../Screens/Main/BackupPhrase';
import AddWallet from '../Screens/Main/AddWallet';
import Contacts from '../Screens/Main/Contacts';
import addContact from '../Screens/Main/SettingsSubPages/addContact';

import Settings from '../Screens/Main/Settings';

import Search from '../Screens/Main/Search';

import ChangePassword from '../Screens/Main/SettingsSubPages/ChangePassword';
import LanguageChange from '../Screens/Main/SettingsSubPages/LanguageChange';
import ChangeCurrency from '../Screens/Main/SettingsSubPages/ChangeCurrency';
import WalletNameChange from '../Screens/Main/SettingsSubPages/WalletNameChange';
import RemoveWallet from '../Screens/Main/SettingsSubPages/RemoveWallet';

import CoinSend from '../Screens/Main/PortfolioTabs/CoinSend';
import CoinReceive from '../Screens/Main/PortfolioTabs/CoinReceive';
import CoinActivity from '../Screens/Main/PortfolioTabs/CoinActivity';
import TokenReceive from '../Screens/Main/PortfolioTabs/TokenReceive';
import TokenSend from '../Screens/Main/PortfolioTabs/TokenSend';
import AddToken from '../Screens/Main/AddToken'

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

    //  screen: Settings,
    screen: StackNavigator({
      settingsMain: { screen: Settings },
      changePassword: { screen: ChangePassword },
      languageChange: { screen: LanguageChange },
      changeCurrency: { screen: ChangeCurrency },
      changeWalletName: { screen: WalletNameChange },
      removeWallet: { screen: RemoveWallet },

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
