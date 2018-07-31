import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import CoinSendTabNavigator from '../../../../components/customPageNavs/CoinSendTabNavigator';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';

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
    const {
      mainContainer,
      contentContainer,
      imageContainer,
      addressContainer,
      addressTitle,
      addressValue,
      footerGrandparentContainer,
      footerParentContainer,
      textFooter,
    } = styles;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={mainContainer}>
          <BackWithMenuNav
            showMenu={true}
            showBack={true}
            navigation={this.props.navigation}
            backPage={'mainStack'}
          />
          <CoinSendTabNavigator navigation={this.props.navigation} />
          <View style={contentContainer} >
            <View style={imageContainer}>
              <QRCode
                value={this.props.walletAddress}
                size={ 225}
                bgColor='#27c997'
                fgColor='#fafbfe' />
            </View>
            <View style={addressContainer}>
                <Text style={addressTitle}>Address: </Text>
                <Text style={addressValue}>{this.props.walletAddress}</Text>
            </View>
          </View>
          <View style={footerGrandparentContainer}>
                <View style={footerParentContainer}>
                    <Text style={textFooter} >Powered by ChainSafe </Text>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '2.5%',
    backgroundColor: '#fafbfe',
  },
  contentContainer: {
    marginTop: '10%',
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
    fontSize: 13,
    lineHeight: 17,
  },
  addressValue: {
    fontSize: 13,
    fontFamily: 'Cairo-Light',
    color: 'black',
    justifyContent: 'center',
    lineHeight: 17,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
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
    fontSize: 11,
    marginBottom: '3.5%',
    color: '#c0c0c0',
  },
});

/**
 * Returns an object containing the wallet address that was
 * create/reterived during the initial process
 * @param {Object} state
 */
const mapStateToProps = state => ({
  walletAddress: state.newWallet.wallet.address,
});

export default connect(mapStateToProps, null)(CoinReceive);
