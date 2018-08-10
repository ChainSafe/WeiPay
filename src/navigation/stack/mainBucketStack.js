import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import Contacts from '../../screens/main/menu/contacts/index';
import AddContact from '../../screens/main/menu/contacts/add/AddContact';
import EditContact from '../../screens/main/menu/contacts/add/EditContact';
import Portfolio from '../../screens/main/portfolio/index';
import CoinSend from '../../screens/main/tokens/send/CoinSend';
import CoinHistory from '../../screens/main/tokens/history/CoinActivity';
import CoinReceive from '../../screens/main/tokens/receive/CoinReceive';
import AddToken from '../../screens/main/tokens/add/Tokens';
import AddCoin from '../../screens/main/tokens/add/Coins'
import ContactAddresses from '../../screens/main/menu/contacts/SelectedContact';
import QrCodeScanner from '../../screens/main/qr/QrCodeScanner';
import BackupPhrase from '../../screens/main/menu/settings/BackupPhrase';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

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


/**
 * Constant contains all the screens that can be navigated to using the
 * navigate method from any class
 */
const navigator = DrawerNavigator({
  Portfolio: {
    screen: StackNavigator({
      portfolioScreen: { screen: Portfolio },
      coinReceive: { screen: CoinReceive },
      coinHistory: { screen: CoinHistory },
      coinSend: { screen: CoinSend },
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
  Backup: { screen: BackupPhrase },
  Contacts: {
    screen: StackNavigator({
      contacts: { screen: Contacts },
      editContact: { screen: EditContact},
      addContact: { screen: AddContact },
    },
    {
      headerMode: 'none',
    }),
  },
  Tokens: { screen: AddToken },
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
    backgroundColor: "white" ,
  },
  labelText:{
    fontSize:16,
    letterSpacing:0.6,
    fontFamily: "Cairo-Light",
    color:"black",
    fontWeight:'200',
  },
})
