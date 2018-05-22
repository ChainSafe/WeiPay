import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from 'react-navigation';
import { View } from 'react-native'


import Screen1 from '../Screens/screen1';
import Screen2 from '../Screens/screen2';
import TermsScreen from '../Screens/Setup/ViewTerms';
import CreateOrRestore from '../Screens/Setup/CreateOrRestore';
import CreateWalletName from '../Screens/Setup/CreateWalletName';
import GeneratePassphrase from '../Screens/Setup/GeneratePassphrase';
import RecoverWallet from '../Screens/Setup/RecoverWallet';
import EnableTokens from '../Screens/Setup/EnableTokens';

import Drawer from '../drawer'
import PortfolioCoin from '../Screens/Main/PortfolioTabs/PortfolioCoin'
import PortfolioToken from '../Screens/Main/PortfolioTabs/PortfolioToken'
import AddToken from '../Screens/Main/AddToken'


const navigator = StackNavigator({
  screen1: {
    screen: Screen1
  },
  screen2: {
    screen: Screen2
  },
  terms: {
    screen: TermsScreen
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
  AddToken: {
    screen: AddToken
  }
},{
  headerStyle: {
    borderBottomWidth: 0
  }
});


export default navigator;


// header: ({ navigate }) => {
//   return {
//     style: {
//       headerStyle: { shadowColor: 'transparent'}
//     }
//   }
// }
