import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class Splash extends Component {
  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    console.log('no error yet checked login');
    console.log(this.props.wallets[0]);

    if(this.props.wallets.length > 0) {
      console.log('we already have a wallet');
      const navigateToAddToken = NavigationActions.navigate({ routeName: 'password' });
      this.props.navigation.dispatch(navigateToAddToken);
    } else {
      console.log('we do not have any wallets');
      const navigateToAddToken = NavigationActions.navigate({ routeName: 'terms' });
      this.props.navigation.dispatch(navigateToAddToken);
    }

  
    
    // const routeName = this.props.wallets.length > 0 ?  "password" : "terms";
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({ routeName: routeName })
    //   ]
    // });
    // this.props.navigation.dispatch(resetAction);
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
