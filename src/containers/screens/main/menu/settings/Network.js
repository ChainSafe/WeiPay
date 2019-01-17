import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView,
} from 'react-native';
// import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../../components/shadowCards/BoxShadowCard';
import ClearButton from '../../../../components/linearGradient/ClearButton';
import { setNetwork } from '../../../../store/actions/creators/AppConfig';

const ethers = require('ethers');


/**
 * Screen is used to display the passphrase (mnemonic) of the wallet
 */
class Network extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenNetork: null,
    };
  }

  selectNetwork = (network) => {
    this.props.setNetwork(network);
    this.setState({ chosenNetork: network });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
              <View style={styles.navContainer}>
                <BackWithMenuNav
                    showMenu={false}
                    showBack={true}
                    navigation={this.props.navigation}
                  />
              </View>
              <Text style={styles.textHeader}>Choose Network</Text>
     
              <View style={styles.boxShadowContainer}>
                <View style={styles.contentContainer}>
                    <BoxShadowCard>
                        <View style={{ justifyContent: 'space-around', flex:1 }}> 
                        <Text style={styles.mnemonicText}> Current Network: { this.props.network } </Text> 
                            <ClearButton
                                onClickFunction={() => this.selectNetwork('mainnet') }
                                buttonText= 'Switch to Mainet'
                                customStyles={styles.button}
                                // buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
                            />
                            <ClearButton
                                onClickFunction={() => this.selectNetwork('ropsten') }
                                buttonText= 'Switch to Ropsten'
                                customStyles={styles.button}
                                // buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
                            />
                            <ClearButton
                                onClickFunction={() => this.selectNetwork('kovan') }
                                buttonText= 'Switch to Kovan'
                                customStyles={styles.button}
                                // buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
                            />
                             <ClearButton
                                onClickFunction={() => this.selectNetwork('rinkeby') }
                                buttonText= 'Switch to Rinkeby'
                                customStyles={styles.button}
                                // buttonStateEnabled={ this.props.debugMode ? false : this.state.buttonDisabled}
                            />
                        </View>
                    </BoxShadowCard>
                </View>
              </View>
            <View style={styles.btnContainer}></View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    );
  }
}

/**
 * Styles used in the BackupPhrase screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f4f7f9',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f4f7f9',
    justifyContent: 'center',
    width: '100%',
  },
  navContainer: {
    flex: 0.75,
  },
  boxShadowContainer: {
    alignItems: 'center',
    flex: 5,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.75,
  },
  contentContainer: {
    width: '82%',
    flex: 1,
  },
  cardText: {
    paddingBottom: '7.5%',
    paddingTop: '7.5%',
    paddingLeft: '7.5%',
    paddingRight: '7.55%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    letterSpacing: 0.4,
    fontSize: RF(2.4),
    lineHeight: RF(2.8),
  },
  mnemonicText: {
    paddingTop: '2.5%',
    paddingLeft: '7.5%',
    paddingRight: '7.55%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    color: '#12c1a2',
    fontSize: RF(2.2),
    lineHeight: RF(3),
  },
  btnContainer: {
    flex: 2,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
});

const mapStateToProps = ({ Debug, Wallet }) => {
  // unnecessary props
	// const wallet = HotWallet.hotWallet;
  const debugMode = Debug.debugMode;
  const { network } = Wallet;
  return { debugMode, network };
};

export default connect(mapStateToProps, { setNetwork })(Network);
