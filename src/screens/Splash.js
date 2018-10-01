import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class Splash extends Component {
  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    const routeName = this.props.wallets.length > 0 ?  "password" : "terms";
    const initialRender = this.props.wallets.length > 0 ?  false : true;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: routeName, params: {wallet: this.props.wallets[0], initialSetupRendered: initialRender } })
      ]
    });
    this.props.navigation.dispatch(resetAction);
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

export default connect(mapStateToProps)(Splash);
