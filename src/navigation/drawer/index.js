import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from 'react-navigation';
import Portfolio from '../../screens/main/portfolio/index';
import BackupPhrase from '../../screens/main/menu/settings/BackupPhrase';
import Contacts from '../../screens/main/menu/contacts/index';
import AddContact from '../../screens/main/menu/contacts/add/AddContact';
import Settings from '../../screens/main/menu/settings/index';
import Search from '../../screens/main/menu/settings/Search';
import LanguageChange from '../../screens/main/menu/settings/LanguageChange';
import ChangeCurrency from '../../screens/main/menu/settings/ChangeCurrency';
// import CoinSend from '../../screens/main/tokens/send/CoinSend';
// import CoinReceive from '../../screens/main/tokens/receive/CoinReceive';
// import CoinActivity from '../../screens/main/tokens/history/CoinActivity';
import TokenReceive from '../../screens/main/tokens/receive/TokenReceive';
import TokenSend from '../../screens/main/tokens/send/TokenSend';
import AddToken from '../../screens/main/tokens/add/index';


import CoinSend from '../../screens/main/tokens/send/CoinSend';
import CoinHistory from '../../screens/main/tokens/history/CoinActivity';
import CoinReceive from '../../screens/main/tokens/receive/CoinReceive';
import PortfolioToken from '../../screens/main//portfolio/tabs/PortfolioToken';
import QrCodeScanner from '../../screens/main/qr/QrCodeScanner';
import ContactAddresses from '../../screens/main/menu/contacts/SelectedContact';

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
  
  // portfolio: {
  //   screen: Portfolio
  // },
  // coinSend:{
  //   screen: CoinSend
  // },
  // coinReceive:{
  //   screen: CoinReceive
  // },
  // coinHistory:{
  //   screen: CoinHistory
  // },
  // PortfolioToken: {
  //   screen: PortfolioToken
  // },
  // QCodeScanner: {
  //   screen: QrCodeScanner
  // },
  // contactAddresses: {
  //   screen: ContactAddresses
  // },

  backupPhrase: {
    screen: BackupPhrase
  },
  Contacts: {
    screen: TabNavigator({
      contacts: { screen: Contacts },
      addContact: { screen: AddContact }
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
