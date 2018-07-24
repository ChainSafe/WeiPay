import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { View } from 'react-native'
import Contacts from '../../screens/main/menu/contacts/index';
import AddContact from '../../screens/main/menu/contacts/add/AddContact';
import Settings from '../../screens/main/menu/settings/index';
import LanguageChange from '../../screens/main/menu/settings/LanguageChange';
import ChangeCurrency from '../../screens/main/menu/settings/ChangeCurrency';
import Drawer from '../drawer';
import Portfolio from '../../screens/main/portfolio/index';
import CoinSend from '../../screens/main/tokens/send/CoinSend';
import CoinHistory from '../../screens/main/tokens/history/CoinActivity';
import CoinReceive from '../../screens/main/tokens/receive/CoinReceive';
import PortfolioToken from '../../screens/main//portfolio/tabs/PortfolioToken';
import AddToken from '../../screens/main/tokens/add/index';
import contacts from '../../screens/main/menu/contacts/index';
import ContactAddresses from '../../screens/main/menu/contacts/SelectedContact';
import QrCodeScanner from '../../screens/main/qr/QrCodeScanner';
import BackupPhrase from '../../screens/main/menu/settings/BackupPhrase';

/**
 * Constant contains all the screens that can be navigated to using the 
 * navigate method from any class
 */
const navigator = DrawerNavigator({
    mainPortfolio: {
      screen: StackNavigator({
        portfolio : {screen: Portfolio },
        coinSend : { screen: CoinSend },
        coinReceive:{ screen: CoinReceive },
        coinHistory:{ screen: CoinHistory },
        PortfolioToken: { screen: PortfolioToken },
        QCodeScanner: { screen: QrCodeScanner },
        contactAddresses: { screen: ContactAddresses },
      },
      {
        initialRouteName: 'portfolio',
        headerMode: 'none',
        navigationOptions: {
        backgroundColor: "#fafbfe", 
        borderBottomWidth: 0,  
      },
    })},
      backupPhrase: { screen: BackupPhrase },
        Contacts: {
          screen: StackNavigator({
            contacts: { screen: Contacts },
            addContact: { screen: AddContact }
          },
          {
            headerMode: 'none'
          })},
          AddToken: { screen: AddToken },
          Settings: {
            screen: StackNavigator({
              settingsMain: { screen: Settings },
              languageChange: { screen: LanguageChange },
              changeCurrency: { screen: ChangeCurrency },
          },
          {
            headerMode: 'none'
          })},      
        }, {
    headerMode: 'none',
    navigationOptions: {
      backgroundColor: "#fafbfe", 
      borderBottomWidth: 0,  
    },
    lazy: true
  });

export default navigator;
