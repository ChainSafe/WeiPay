import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Contacts from '../../screens/main/menu/contacts/index';
import AddContact from '../../screens/main/menu/contacts/add/AddContact';
import Portfolio from '../../screens/main/portfolio/index';
import CoinSend from '../../screens/main/tokens/send/CoinSend';
import CoinHistory from '../../screens/main/tokens/history/CoinActivity';
import CoinReceive from '../../screens/main/tokens/receive/CoinReceive';
import AddToken from '../../screens/main/tokens/add/Tokens';
import AddCoin from '../../screens/main/tokens/add/Coins'
import ContactAddresses from '../../screens/main/menu/contacts/SelectedContact';
import QrCodeScanner from '../../screens/main/qr/QrCodeScanner';
import BackupPhrase from '../../screens/main/menu/settings/BackupPhrase';

/**
 * Constant contains all the screens that can be navigated to using the
 * navigate method from any class
 */
const navigator = DrawerNavigator({
  Portfolio: {
    screen: StackNavigator({
      portfolioScreen: { screen: Portfolio },
      coinSend: { screen: CoinSend },
      coinReceive: { screen: CoinReceive },
      coinHistory: { screen: CoinHistory },
      QCodeScanner: { screen: QrCodeScanner },
      contactAddresses: { screen: ContactAddresses },
    },
    {
      initialRouteName: 'portfolioScreen',
      headerMode: 'none',
      navigationOptions: {
        backgroundColor: '#fafbfe',
        borderBottomWidth: 0,
      },
    }),
  },
  backupPhrase: { screen: BackupPhrase },
  Contacts: {
    screen: StackNavigator({
      contacts: { screen: Contacts },
      addContact: { screen: AddContact },
    },
    {
      headerMode: 'none',
    }),
  },
  AddToken: { screen: AddToken },
  AddCoin: { screen: AddCoin },
}, {
  headerMode: 'none',
  navigationOptions: {
    backgroundColor: '#fafbfe',
    borderBottomWidth: 0,
    drawerPosition: 'right'
  },
  lazy: true,
});

export default navigator;
