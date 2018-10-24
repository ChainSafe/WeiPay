import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import CoinSendTabNavigator from '../../../../components/customPageNavs/CoinSendTabNavigator';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import RF from "react-native-responsive-fontsize"

/**
 * React Component
 * Screen containing a QrCode which can be used to conduct a positive transction (receiving coins/tokens)
 */
class CoinReceive extends Component {
  /**
   * Returns a component that be used to display the Wallet public key in a form of text
   * and QrCode
   */
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer} >
            <View style={styles.imageContainer}>
              <QRCode
                value={this.props.walletAddress}
                size={ 225}
                bgColor='#27c997'
                fgColor='#fafbfe' />
            </View>
            <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>Address: </Text>
                <Text style={styles.addressValue}>{this.props.walletAddress}</Text>
            </View>            
          </View>
          <View style={styles.footerGrandparentContainer}>
            <View style={styles.footerParentContainer}>
                <Text style={styles.textFooter} >Powered by ChainSafe </Text>
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
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fafbfe',
  },
  navContainer: {
    flex: 0.65,
  },
  navHeaderContainer: {
    flex: 0.3,
  },
  contentContainer: {
    flex:4.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '1.5%',
    paddingTop: '10%',
    width: 225,
  },
  addressTitle: {
    fontFamily: 'Cairo-Regular',
    color: 'black',
    fontSize: RF(2.1),
    lineHeight: RF(2.6),
    letterSpacing: 0.6,
  },
  addressValue: {
    fontSize: RF(2.1),
    lineHeight: RF(2.6),
    letterSpacing: 0.6,
    fontFamily: 'Cairo-Light',
    color: 'black',
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    paddingBottom: '5%',
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    marginBottom: '5%',
    color: '#c0c0c0',
    fontSize: RF(1.7),
    letterSpacing: 0.5
  },
});

const mapStateToProps = ({ HotWallet }) => {
  return {
    walletAddress: HotWallet.hotWallet.pubKey,
  };
};

export default connect(mapStateToProps, null)(CoinReceive);
