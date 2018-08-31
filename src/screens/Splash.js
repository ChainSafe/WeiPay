import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class Splash extends Component {

    componentDidMount() {
        this.checkLoggedIn();
    }

    checkLoggedIn() {


        const routeName = this.props.wallet ? "mainStack" : "terms";

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName })
            ]
        })

        this.props.navigation.dispatch(resetAction);
    }

    render() {
      return (
        <View />
      )
    }
}

const mapStateToProps = ({ newWallet }) => {
  return { wallet: newWallet.wallet };
};

export default connect(mapStateToProps)(Splash)
