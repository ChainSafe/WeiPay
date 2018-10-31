import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import LinearButton from '../../../components/linearGradient/LinearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/shadowCards/BoxShadowCard'

/**
 * Screen used to display the passphrase (mnemonic)
 */
class GeneratePassphrase extends Component {

    navigate = () => {
      const navigateToConfirmPassphrase = NavigationActions.navigate({
        routeName: 'confirmPassphrase',     
      });
      this.props.navigation.dispatch(navigateToConfirmPassphrase);
    };

    render() {      
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.mainContainer}>
            <View style={styles.navContainer}>
              <BackWithMenuNav
                  showMenu={false}
                  showBack={true}
                  showSkip={true}
                  navigation={this.props.navigation}
                  backPage={'createWalletName'}
                />
              </View>
              <Text style={styles.textHeader} >Your Passphrase</Text>
              <View style={styles.boxShadowContainer}>
                <View style={styles.contentContainer} >
                    <BoxShadowCard >
                        <Text style={styles.cardText}>
                            Please write down your 12 word passphrase. You will need it to verify your wallet.
                        </Text>
                        <Text style={styles.textMnemonic}>
                            {this.props.hotWallet.wallet.mnemonic}
                        </Text>                       
                      </BoxShadowCard>
                  </View>
              </View>
              <View style={styles.btnContainer}>
                <LinearButton
                    onClickFunction={this.navigate}
                    buttonText="Next"
                    customStyles={styles.button}
                    // buttonStateEnabled={this.state.buttonDisabled}
                />
                <View style={styles.footerGrandparentContainer}>
                  <View style={styles.footerParentContainer}>
                      <Text style={styles.textFooter} >Powered by ChainSafe </Text>
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
    paddingBottom: '7.5%',
    lineHeight: RF(3.9),
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    fontSize: RF(2.4),
  },
  textMnemonic: {
    paddingLeft: '10%',
    paddingRight: '10%',
    color: '#12c1a2',
    fontSize: RF(2.4),
    lineHeight: RF(4.1),
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

const mapStateToProps = ({ HotWallet }) => {
  const { hotWallet } = HotWallet;
  return { hotWallet };
};

export default connect(mapStateToProps, null)(GeneratePassphrase);
