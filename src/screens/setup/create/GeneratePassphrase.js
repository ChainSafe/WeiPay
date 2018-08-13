import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard'
import RF from "react-native-responsive-fontsize"

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
        safeAreaView,
        mainContainer,
        navContainer,
        textHeader,
        contentContainer,
        boxShadowContainer,
        cardText,
        textMnemonic,
        btnContainer,
        button,
        footerGrandparentContainer,
        footerParentContainer,
        textFooter,
      } = styles;

      return (
        <SafeAreaView style={safeAreaView}>
          <View style={mainContainer}>
            <View style={navContainer}>
              <BackWithMenuNav
                  showMenu={false}
                  showBack={true}
                  navigation={this.props.navigation}
                  backPage={'createWalletName'}
                />
              </View>
              <Text style={textHeader} >Your Passphrase</Text>
              <View style={boxShadowContainer}>
                <View style={contentContainer} >
                    <BoxShadowCard >
                        <Text style={cardText}>
                            Please write down your 12 word passphrase. You will need it to verify your wallet.
                        </Text>
                        <Text style={textMnemonic}>
                            {walletInfo.wallet.mnemonic}
                        </Text>
                      </BoxShadowCard>
                  </View>
              </View>
              <View style={btnContainer}>
                <LinearButton
                    onClickFunction={this.navigate}
                    buttonText="Next"
                    customStyles={button}
                    // buttonStateEnabled={this.state.buttonDisabled}
                />
                <View style={footerGrandparentContainer}>
                  <View style={footerParentContainer}>
                      <Text style={textFooter} >Powered by ChainSafe </Text>
                  </View>
                </View>
            </View>          
          </View>
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
  },
  navContainer: {
    flex: 0.65,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex:0.65,
  },
  contentContainer: {
    width: '83%',
  },
  boxShadowContainer: {
    alignItems:"center", 
    flex: 3
  },
  cardText: {
    paddingBottom: '10%',
    lineHeight: 22,
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    fontSize: RF(2.4),
  },
  textMnemonic: {
    paddingLeft: '5%',
    paddingRight: '5%',
    color: '#12c1a2',
    fontSize: RF(2.4),
    lineHeight: 26,
    letterSpacing: 0.4,
  },
  btnContainer: {
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    flex: 2
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,  
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '5%'
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(1.7),
    color: '#c0c0c0',
    letterSpacing: 0.5
  },
});

const mapStateToProps = ({ newWallet }) => {
  return { walletInfo: newWallet };
};

export default connect(mapStateToProps, null)(GeneratePassphrase);
