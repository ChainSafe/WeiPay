import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from 'react-navigation';
import Portfolio from '../Screens/Main/Portfolio';
import BackupPhrase from '../Screens/Main/BackupPhrase';
import AddWallet from '../Screens/Main/AddWallet';
import Contacts from '../Screens/Main/Contacts';
import AddContact from '../Screens/Main/SettingsSubPages/AddContact';

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

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1 }}>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);

export default DrawerNavigator({
  portfolio: {
    screen: Portfolio
  },

  backupPhrase: {
    screen: BackupPhrase
  },
  addWallet: {
    screen: AddWallet
  },
  Contacts: {
    screen: TabNavigator({
      contacts: { screen: Contacts },
      AddContact: { screen: AddContact }

    })

  },
  Settings: {

    //  screen: Settings,
    screen: StackNavigator({
      settingsMain: { screen: Settings },
      changePassword: { screen: ChangePassword },
      languageChange: { screen: LanguageChange },
      changeCurrency: { screen: ChangeCurrency },
      changeWalletName: { screen: WalletNameChange },
      removeWallet: { screen: RemoveWallet }
    },
      {
        headerMode: 'none'
      })
  },
  search: {
    screen: Search
  }
}, {
    contentComponent: CustomDrawerContentComponent
  })
