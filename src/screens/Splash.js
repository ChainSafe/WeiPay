import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../actions/AppConfig';

class Splash extends Component {
  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    if(this.props.wallets.length > 0) {
      if(!this.props.isWalletEncrypted) {
        const nonEncyrptedWallet = this.props.wallets[0].hdWallet;
        const nonEncrytpedName = this.props.wallets[0].name;
        const walletNotEncrypted = { wallet: nonEncyrptedWallet, name: nonEncrytpedName };
        this.props.setHotWallet(walletNotEncrypted);
        const navigateToAddToMain = NavigationActions.navigate({ routeName: 'mainStack' });
        this.props.navigation.dispatch(navigateToAddToMain);
      } else {
        const navigateToAddToken = NavigationActions.navigate({ routeName: 'password' });
        this.props.navigation.dispatch(navigateToAddToken);
      }
    } else {
      const navigateToAddToken = NavigationActions.navigate({ routeName: 'terms' });
      this.props.navigation.dispatch(navigateToAddToken);
    }
  }

  render() {
    return (
        <View />
    );
  }
}

const mapStateToProps = ({ Wallet }) => {
  const { wallets, isWalletEncrypted } = Wallet;
  return { wallets, isWalletEncrypted };
};

export default connect(mapStateToProps, actions)(Splash);
