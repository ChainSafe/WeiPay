import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class Splash extends Component {
  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    const routeName = this.props.wallets.length > 0 ?  "mainStack" : "terms";
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: routeName })
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
