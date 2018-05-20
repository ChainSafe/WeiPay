import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from "react-navigation";
import { View } from 'react-native'
import Screen1 from "../Screens/screen1";
import Screen2 from "../Screens/screen2";
import TermsScreen from '../Screens/Setup/ViewTerms';
import CreateOrRestore from '../Screens/Setup/CreateOrRestore';
import CreateWalletName from '../Screens/Setup/CreateWalletName';
import GeneratePassphrase from '../Screens/Setup/GeneratePassphrase';
import RecoverWallet from '../Screens/Setup/RecoverWallet';
import EnableTokens from '../Screens/Setup/EnableTokens';
import Portfolio from '../Screens/Main/Portfolio';
import BackupPhrase from '../Screens/Main/BackupPhrase';
import AddWallet from '../Screens/Main/AddWallet';
import Contacts from '../Screens/Main/Contacts';
import Settings from '../Screens/Main/Settings';
import Tokens from '../Screens/Main/Tokens';
import Coins from '../Screens/Main/Coins';
import Search from '../Screens/Main/Search';
//Settings subpages 
import ChangePassword from '../Screens/Main/SettingsSubPages/ChangePassword';
import LanguageChange from '../Screens/Main/SettingsSubPages/LanguageChange';
import ChangeCurrency from '../Screens/Main/SettingsSubPages/ChangeCurrency';
import WalletNameChange from '../Screens/Main/SettingsSubPages/WalletNameChange';
import RemoveWallet from '../Screens/Main/SettingsSubPages/RemoveWallet';
//import EnableTokens from '../Screens/Setup/EnableTokens';
import CoinSend from '../Screens/Main/Tabs/CoinSend';
import CoinReceive from '../Screens/Main/Tabs/CoinReceive';
import CoinActivity from '../Screens/Main/Tabs/CoinActivity';
import TokenReceive from '../Screens/Main/Tabs/TokenReceive';
import TokenSend from '../Screens/Main/Tabs/TokenSend';


const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1 }}>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);


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
    screen: DrawerNavigator({
      portfolio: {
        screen: Portfolio
      },
      PortfolioCoin: {
        screen: TabNavigator({
          coinsend: { screen: CoinSend },
          coinactivity: { screen: CoinActivity },
          coinrecive: { screen: CoinReceive }
        }, {
            tabBarPosition: 'top',
          }, {
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center', fontWeight: 'normal', fontSize: 20, color: '#606060' }
          })
      },
      PortfolioToken: {
        screen: TabNavigator({
          tokensend: { screen: TokenSend },
          tokenreceive: { screen: TokenReceive }
        }, {
            tabBarPosition: 'top',
          })
      },
      AddToken: {
        screen: TabNavigator({
          coins: { screen: Coins },
          tokens: { screen: Tokens }
        }, {
            tabBarPosition: 'top',
          })
      },
      backupPhrase: {
        screen: BackupPhrase
      },
      addWallet: {
        screen: AddWallet
      },
      Contacts: {
        screen: Contacts
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
  }
});


export default navigator;
