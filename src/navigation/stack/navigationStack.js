import { StackNavigator } from 'react-navigation';
import TermsScreen from '../../screens/setup/terms/TermsAndConditions';
import CreateOrRestore from '../../screens/setup/index';
import CreateWalletName from '../../screens/setup/create/CreateWalletName';
import GeneratePassphrase from '../../screens/setup/create/GeneratePassphrase';
import ConfirmPassphrase from '../../screens/setup/create/ConfirmPassphrase';
import CreateWalletNameRecovered from '../../screens/setup/recover/CreateWalletName';
import RecoverWallet from '../../screens/setup/recover/RecoverWallet';
import mainBucketNavigation from './mainBucketStack';
import addContact from '../../screens/main/menu/contacts/add/AddContact';
import contacts from '../../screens/main/menu/contacts/index';
import ContactAddresses from '../../screens/main/menu/contacts/SelectedContact';
import Splash from '../../screens/Splash'
/**
 * Constant contains all the screens that can be navigated to using the
 * navigate method from any class
 */
const navigator = StackNavigator({
  splash: {
    screen: Splash
  },
  terms: {
    screen: TermsScreen,
  },
  addContact: {
    screen: addContact,
  },
  contacts: {
    screen: contacts,
  },
  createOrRestore: {
    screen: CreateOrRestore,
  },
  createWalletName: {
    screen: CreateWalletName,
  },
  generatePassphrase: {
    screen: GeneratePassphrase,
  },
  confirmPassphrase: {
    screen: ConfirmPassphrase,
  },
  createWalletNameRecovered: {
    screen: CreateWalletNameRecovered,
  },
  recoverWallet: {
    screen: RecoverWallet,
  },
  mainStack: {
    screen: mainBucketNavigation,
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    backgroundColor: '#fafbfe',
    borderBottomWidth: 0,
  },
  lazy: true,
});

export default navigator;
