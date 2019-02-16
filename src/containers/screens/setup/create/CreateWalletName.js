import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Keyboard,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import { setTempWalletName, initializeAppWallet } from '../../../store/actions/creators/AppConfig';
import LinearButton from '../../../components/linearGradient/LinearButton';
import BoxShadowCard from '../../../components/shadowCards/BoxShadowCard';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';

class CreateWalletName extends Component {
  state = {
		// unnecessary state
    // walletProcessing: false,
		// state used to set wallet name
    walletName: '',
  };

  navigateToPin = () => {
    // this.setState({ walletProcessing: false }, () => {
			// unnecessary setState and calling dispatch

			this.props.setTempWalletName(this.state.walletName);
      
			const navigateToPassword = NavigationActions.navigate({
        routeName: 'password',
        params: { nextScreenToNavigate: 'generatePassphrase' },
      });
      this.props.navigation.dispatch(navigateToPassword);

    // });
  };

  getWalletName = (name) => {
    // this.props.setTempWalletName(name); unnecessary action call
		this.setState({ walletName: name });
  }

  render() {
    const { debugMode } = this.props;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer} >
            <View style={styles.navContainer}>
              <BackWithMenuNav
                showMenu={false}
                showBack={true}
                navigation={this.props.navigation}
                backPage={'createOrRestore'}
              />
            </View>
            <Text style={styles.textHeader} >Wallet Name</Text>
            <View style={styles.boxShadowContainer}>
              <View style={styles.contentContainer}>
                <BoxShadowCard>
                    <View>
                        <Text style={styles.cardText}>
                            Create a name for your wallet, for example: My Wallet
                        </Text>
                        <View style={styles.formInputContainer}>
                            <FormInput
                                placeholder={'Ex. My Wallet'}
                                onChangeText={this.getWalletName.bind(this)}
                                inputStyle={styles.txtWalletName}
                                selectionColor={'#12c1a2'}
                            />
                        </View>
                    </View>
                </BoxShadowCard>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <LinearButton
                onClickFunction={ this.navigateToPin }
                buttonText="Next"
                customStyles={styles.button}
                buttonStateEnabled= { debugMode ? false : !this.state.walletName }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f4f7f9',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f7f9',
    width: '100%',
  },
  navContainer: {
    flex: 0.65,
  },
  boxShadowContainer: {
    alignItems: 'center',
    flex: 2.5,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#000000',
    flex: 0.75,
  },
  contentContainer: {
    flex: 1,
    width: '82%',
  },
  cardText: {
    paddingBottom: '15%',
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    lineHeight: RF(3.9),
    color: '#000000',
    fontSize: RF(2.4),
  },
  txtWalletName: {
    width: '100%',
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    borderBottomWidth: 0.001,
  },
  formInputContainer: {
    width: '90%',
    marginLeft: '5%',
  },
  btnContainer: {
    flex: 2.5,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: '2.5%',
    marginTop: '2.5%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
});

const mapStateToProps = ({ Debug, Wallet }) => {
  const { debugMode} = Debug;
  // const { wallets, tempWalletName } = Wallet;
  return {
    debugMode
  };
};

export default connect(mapStateToProps, {
  setTempWalletName
})(CreateWalletName);

// export default connect(mapStateToProps, {
//   setTempWalletName, initializeAppWallet,
// })(CreateWalletName);
