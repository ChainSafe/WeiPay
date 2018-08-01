import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard'

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
        navFlex
      } = styles;

      return (
        <View style={mainContainer}>
          <View style={navFlex}>
            <BackWithMenuNav
                showMenu={false}
                showBack={true}
                navigation={this.props.navigation}
                backPage={'createWalletName'}
            />
            </View>
            <Text style={textHeader} >Your Passphrase</Text>

            <View style={{alignItems:"center", flex: 3}}>
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
      );
    }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
  },
  navFlex:{
    flex:0.75,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: 26,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex:0.75,
    // backgroundColor: "blue"
  },
  contentContainer: {
    // backgroundColor: "green",
    width: '83%',
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
    alignContent: 'flex-end',
    // backgroundColor: "red",
    flex:2
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    // backgroundColor:"yellow",
    marginBottom: '2.5%',
    marginTop: '2.5%'
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
    color: '#c0c0c0',
  },
});

const mapStateToProps = ({ newWallet }) => {
  return { walletInfo: newWallet };
};

export default connect(mapStateToProps, null)(GeneratePassphrase);
