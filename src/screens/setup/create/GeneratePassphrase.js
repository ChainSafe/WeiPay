import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';

/**
 * Screen used to display the passphrase (mnemonic)
 */
class GeneratePassphrase extends Component {

    navigate = () => {
      const navigateToEnableTokens = NavigationActions.navigate({
        routeName: 'confirmPassphrase',
        params: { wallet: this.props.navigation.state.wallet },
      });
      this.props.navigation.dispatch(navigateToEnableTokens);
    };

    render() {
      const { walletInfo } = this.props;

      const {
        mainContainer,
        textHeader,
        contentContainer,
        cardContainer,
        cardText,
        textMnemonic,
        btnContainer,
        button,
        footerGrandparentContainer,
        footerParentContainer,
        textFooter,
      } = styles;

      return (
        <View style={mainContainer}>
            <BackWithMenuNav
                showMenu={false}
                showBack={true}
                navigation={this.props.navigation}
                backPage={'createWalletName'}
            />
            <Text style={textHeader} >Your Passphrase</Text>
            <View style={contentContainer} >
                <Card containerStyle={cardContainer}>
                    <Text style={cardText}>
                        Please write down your 12 word passphrase. You will need it to verify your wallet.
                    </Text>
                    <Text style={textMnemonic}>
                        {walletInfo.wallet.mnemonic}
                    </Text>
                </Card>
            </View>
            <View style={btnContainer}>
                <LinearButton
                    onClickFunction={this.navigate}
                    buttonText="Next"
                    customStyles={button}
                    // buttonStateEnabled={this.state.buttonDisabled}
                />
            </View>
            <View style={footerGrandparentContainer}>
                <View style={footerParentContainer}>
                    <Text style={textFooter} >Powered by ChainSafe </Text>
                </View>
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
    paddingTop: '5%',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: 26,
    paddingLeft: '10%',
    paddingBottom: '3%',
    marginTop: '5%',
    color: '#1a1f3e',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  cardContainer: {
    width: '80%',
    height: '55%',
    borderRadius: 7.5,
    shadowOpacity: 0.5,
    shadowRadius: 1.3,
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 1, height: 2 },
  },
  cardText: {
    paddingBottom: '10%',
    lineHeight: 22,
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    fontSize: 16,
  },
  textMnemonic: {
    paddingLeft: '5%',
    paddingRight: '5%',
    color: '#12c1a2',
    lineHeight: 26,
    letterSpacing: 0.4,
  },
  btnContainer: {
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    paddingTop: 15,
    alignContent: 'flex-end',
  },
  button: {
    width: '82%',
  },
  footerGrandparentContainer: {
    alignItems: 'center',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
    marginTop: '3.5%',
    color: '#c0c0c0',
  },
});

const mapStateToProps = ({ newWallet }) => {
  return { walletInfo: newWallet };
};

export default connect(mapStateToProps, null)(GeneratePassphrase);
