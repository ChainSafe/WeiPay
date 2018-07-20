import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { View } from 'react-native'
import TermsScreen from '../../screens/setup/terms/TermsAndConditions';
import CreateOrRestore from '../../screens/setup/index';
import CreateWalletName from '../../screens/setup/create/CreateWalletName';
import GeneratePassphrase from '../../screens/setup/create/GeneratePassphrase';
import ConfirmPassphrase from '../../screens/setup/create/ConfirmPassphrase';
import CreateWalletNameRecovered from '../../screens/setup/recover/CreateWalletName';
import RecoverWallet from '../../screens/setup/recover/RecoverWallet';
import EnableTokens from '../../screens/setup/crypto/EnableTokens';
//import Drawer from '../drawer';
import mainBucketNavigation from '../stack/mainBucketStack'
import CoinSend from '../../screens/main/tokens/send/CoinSend';
import CoinHistory from '../../screens/main/tokens/history/CoinActivity';
import CoinReceive from '../../screens/main/tokens/receive/CoinReceive';
import PortfolioToken from '../../screens/main//portfolio/tabs/PortfolioToken';
import AddToken from '../../screens/main/tokens/add/index';
import addContact from '../../screens/main/menu/contacts/add/AddContact';
import contacts from '../../screens/main/menu/contacts/index';
import ContactAddresses from '../../screens/main/menu/contacts/SelectedContact';
import QrCodeScanner from '../../screens/main/qr/QrCodeScanner';

/**
 * Constant contains all the screens that can be navigated to using the 
 * navigate method from any class
 */
const navigator = StackNavigator({
  terms: {
    screen: TermsScreen,
  },
  addContact: {
    screen: addContact
  },
  contacts: {
    screen: contacts
  },
  createOrRestore: {
    screen: CreateOrRestore
  },
  createWalletName: {
    screen: CreateWalletName
  },
  generatePassphrase: {
    screen: GeneratePassphrase
  },
  confirmPassphrase: {
    screen: ConfirmPassphrase
  },
  createWalletNameRecovered: {
    screen: CreateWalletNameRecovered
  },
  recoverWallet: {
    screen: RecoverWallet
  },
  enableTokens: {
    screen: EnableTokens
  },
  mainStack: {
    screen: mainBucketNavigation
  },
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
  // }
}, {
    headerMode: 'none',
    navigationOptions: {
      backgroundColor: "#fafbfe", 
      borderBottomWidth: 0,  
    },
    lazy: true
  });

export default navigator;
