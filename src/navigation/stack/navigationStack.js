import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native'

import TermsScreen from '../../screens/setup/terms/TermsAndConditions';

import CreateOrRestore from '../../screens/setup/index';

import CreateWalletName from '../../screens/setup/create/CreateWalletName';
import GeneratePassphrase from '../../screens/setup/create/GeneratePassphrase';
import ConfirmPassphrase from '../../screens/setup/create/ConfirmPassphrase';

import CreateWalletNameRecovered from '../../screens/setup/recover/CreateWalletName';
import RecoverWallet from '../../screens/setup/recover/RecoverWallet';

import EnableTokens from '../../screens/setup/crypto/EnableTokens';

import Drawer from '../drawer';

import PortfolioCoin from '../../screens/main/portfolio/tabs/PortfolioCoin';
import PortfolioToken from '../../screens/main//portfolio/tabs/PortfolioToken';

import AddToken from '../../screens/main/tokens/add/index';

import addContact from '../../screens/main/SettingsSubPages/addContact';

import contacts from '../../screens/main/menu/contacts/index';

import ContactAddresses from '../../screens/main/SettingsSubPages/ContactAddresses';


import QrCodeScanner from '../../screens/main/qr/QrCodeScanner';

import CoinSend from '../../screens/main/tokens/send/CoinSend'

/**
 * Constant contains all the screens that can be navigated to using the 
 * navigate method from any class
 */
const navigator = StackNavigator({
  terms: {
    screen: TermsScreen
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
  Drawer: {
    screen: Drawer
  },
  PortfolioCoin: {
    screen: PortfolioCoin
  },
  PortfolioToken: {
    screen: PortfolioToken
  },
  QCodeScanner: {
    screen: QrCodeScanner
  },
  CoinSend: {
    screen: CoinSend
  },
  contactAddresses: {
    screen: ContactAddresses
  }
}, {

    headerStyle: {
      borderBottomWidth: 0
    },
    lazy: true
  });


export default navigator;


// header: ({ navigate }) => {
//   return {
//     style: {
//       headerStyle: { shadowColor: 'transparent'}
//     }
//   }
// }
