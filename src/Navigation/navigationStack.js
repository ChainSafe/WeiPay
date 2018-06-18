import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from 'react-navigation';
import { View } from 'react-native'

import TermsScreen from '../Screens/Setup/ViewTerms';
import CreateOrRestore from '../Screens/Setup/CreateOrRestore';
import CreateWalletName from '../Screens/Setup/CreateWalletName';
import GeneratePassphrase from '../Screens/Setup/GeneratePassphrase';
import ConfirmPassphrase from '../Screens/Setup/ConfirmPassphrase';
import CreateWalletNameRecovered from '../Screens/Setup/CreateWalletNameRecovered';
import RecoverWallet from '../Screens/Setup/RecoverWallet';
import EnableTokens from '../Screens/Setup/EnableTokens';

import Drawer from '../drawer';
import PortfolioCoin from '../Screens/Main/PortfolioTabs/PortfolioCoin';
import PortfolioToken from '../Screens/Main/PortfolioTabs/PortfolioToken';
import AddToken from '../Screens/Main/AddToken';
import ContactAdd from '../Screens/Main/SettingsSubPages/ContactAdd';
import contacts from '../Screens/Main/Contacts';
import ContactAddresses from '../Screens/Main/SettingsSubPages/ContactAddresses';

const navigator = StackNavigator({
  terms: {
    screen: TermsScreen
  },
  contactAdd: {
    screen: ContactAdd
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
