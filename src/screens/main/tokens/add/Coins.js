import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView,
} from 'react-native';
import RF from 'react-native-responsive-fontsize';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import CoinList from '../../../../components/tokens/CoinList';
import LinearButton from '../../../../components/linearGradient/LinearButton';

class Coins extends Component {
  /**
   * Allows you to navigate to the navigation drawer
   */
  navigate = () => {
    const navigateToMain= NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'portfolioScreen' })],
    });
    this.props.navigation.dispatch(navigateToMain);
  };

  render() {
    
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <View style={styles.coinListContainer}>
            <ScrollView>
                <CoinList type={'coins'} />
            </ScrollView>
          </View>
          <View style={styles.btnContainer}>
            <LinearButton
              onClickFunction={this.navigate}
              buttonText='Update Portfolio'
              customStyles={styles.button}
            />
            <View style={styles.footerGrandparentContainer}>
                <View style={styles.footerParentContainer} >
                    <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  NavBarButton: {
    flex: 0.65,
    justifyContent: 'center',
    paddingBottom: '2%',
  },
  tabNavContainer: {
    flex: 0.3,
    justifyContent: 'center',
    marginBottom: '2%',
  },
  coinListContainer: {
    alignItems: 'stretch',
    marginLeft: '9%',
    marginRight: '9%',
    flex: 4,
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    marginBottom: '3%',
    marginTop: '3%',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(1.7),
    color: '#c0c0c0',
    letterSpacing: 0.5,
  },
});

const mapStateToProps = (state) => {
  return {
    tokenList: state.newWallet.tokens,
    tokens: state.Wallet.tokens,
  };
};

export default connect(mapStateToProps, null)(Coins);
