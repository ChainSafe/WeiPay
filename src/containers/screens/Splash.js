import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
// import * as actions from '../store/actions/creators/AppConfig';

class Splash extends Component {
  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    if (this.props.wallets.length > 0) {
      const navigateToAddToken = NavigationActions.navigate({ routeName: 'password' });
      this.props.navigation.dispatch(navigateToAddToken);
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
  const { wallets } = Wallet;
  return { wallets };
};

export default connect(mapStateToProps, null)(Splash);
