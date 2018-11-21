import { StackNavigator } from 'react-navigation';
import TermsScreen from '../../containers/screens/setup/terms/TermsAndConditions';
import CreateOrRestore from '../../containers/screens/setup/index';
import CreateWalletName from '../../containers/screens/setup/create/CreateWalletName';
import GeneratePassphrase from '../../containers/screens/setup/create/GeneratePassphrase';
import ConfirmPassphrase from '../../containers/screens/setup/create/ConfirmPassphrase';
import CreateWalletNameRecovered from '../../containers/screens/setup/recover/CreateWalletName';
import RecoverWallet from '../../containers/screens/setup/recover/RecoverWallet';
import mainBucketNavigation from './mainBucketStack';
import addContact from '../../containers/screens/main/menu/contacts/add/AddContact';
import contacts from '../../containers/screens/main/menu/contacts/index';
import Splash from '../../containers/screens/Splash';
import PinPage from '../../containers/screens/shared/PinPage';

const navigator = StackNavigator({
  splash: {
    screen: Splash,
  },
  terms: {
    screen: TermsScreen,
  },
  password: {
    screen: PinPage,
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
    gesturesEnabled: false,
  },
  lazy: true,
});

export default navigator;
