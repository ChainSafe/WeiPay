import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Contacts from '../../containers/screens/main/menu/contacts/index';
import AddContact from '../../containers/screens/main/menu/contacts/add/AddContact';
import EditContact from '../../containers/screens/main/menu/contacts/add/EditContact';
import Portfolio from '../../containers/screens/main/portfolio/index';
import CoinSend from '../../containers/screens/main/tokens/send/CoinSend';
import CoinHistory from '../../containers/screens/main/tokens/history/CoinActivity';
import CoinReceive from '../../containers/screens/main/tokens/receive/CoinReceive';
import ContactAddresses from '../../containers/screens/main/menu/contacts/SelectedContact';
import QrCodeScanner from '../../containers/screens/main/qr/QrCodeScanner';
import BackupPhrase from '../../containers/screens/main/menu/settings/BackupPhrase';
import TokenFunctionality from '../../containers/screens/main/tokens/Index';
import AddingTokensOrCoins from '../../containers/screens/main/tokens/add/Index';
import Contract from '../../containers/screens/main/contracts/Contract';
import Network from '../../containers/screens/main/menu/settings/Network';
import Coins from '../../containers/screens/main/tokens/add/Coins';
import NewToken from '../../containers/screens/main/tokens/add/NewToken';
import Tokens from '../../containers/screens/main/tokens/add/Tokens';

const CustomDrawerContentComponent = props => (
  <View style={styles.customContainer}>
    <View>
      <DrawerItems
        {...props}
        activeBackgroundColor={'#f3f3f3'}
        labelStyle={styles.labelText}
      />
    </View>
  </View>
);

const navigator = DrawerNavigator({  
  Portfolio: {
    screen: StackNavigator({
      portfolioScreen: { screen: Portfolio },
      coinReceive: { screen: CoinReceive },
      coinHistory: { screen: CoinHistory },
      coinSend: { screen: CoinSend },
      TokenFunctionality: { screen: TokenFunctionality },
      AddTokenFunctionality: { screen: AddingTokensOrCoins },
      QCodeScanner: { screen: QrCodeScanner },
      contactAddresses: { screen: ContactAddresses },
      tokenList: { screen: Coins },
      customToken: { screen: NewToken },
      searchToken: { screen: Tokens },
    },
    {
      initialRouteName: 'portfolioScreen',
      headerMode: 'none',
      navigationOptions: {
        backgroundColor: '#fafbfe',
        borderBottomWidth: 0,
        gesturesEnabled: false,
      },
    }),
  },
  Backup: { screen: BackupPhrase },
  Contacts: {
    screen: StackNavigator({
      contacts: { screen: Contacts },
      editContact: { screen: EditContact },
      addContact: { screen: AddContact },
    },
    {
      headerMode: 'none',
    }),
  },
  Contracts: { screen: Contract },
  Networks: { screen: Network },
}, {
  headerMode: 'none',
  lazy: true,
  contentComponent: CustomDrawerContentComponent,
  drawerPosition: 'right',
});

export default navigator;

const styles = StyleSheet.create({
  customContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
  },
  labelText: {
    fontSize: 16,
    letterSpacing: 0.6,
    fontFamily: 'Cairo-Light',
    color: 'black',
    fontWeight: '200',
  },
});
