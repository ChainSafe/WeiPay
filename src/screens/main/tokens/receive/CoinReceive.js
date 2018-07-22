import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux'
import CoinSendTabNavigator from '../../../../components/customPageNavs/CoinSendTabNavigator'
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
    return (
      <View style={styles.mainContainer}>
        <BackWithMenuNav 
          backFunction={this.navigateBack} 
          menuFunction={this.navigateMenu} 
          showMenu={true}
          navigation={this.props.navigation}
        />

        <CoinSendTabNavigator navigation={this.props.navigation} />
        <View style={styles.contentContainer} >
          <View style={styles.form} >
            <View style={styles.imageContainer}>
              <QRCode
                value={this.props.walletAddress}
                size={200}
                bgColor='black'
                fgColor='white' />
            </View>
            <FormLabel> My Address </FormLabel>
            <FormInput 
                style={styles.formInputElement} 
                value={this.props.walletAddress}
                multiline={true} />         
          </View>
          <View style={styles.btnContainer} >
            <Button
              A title='Next'
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 30, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
            />
          </View>
        </View>
      </View>
    )
  }
}
/**
 * Styles
 */
const styles = StyleSheet.create({
  barcode: {
    width: 165,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '2.5%'
  },
  contentContainer: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 340,
    flex: 1
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 35
  }
})

/**
 * Returns an object containing the wallet address that was 
 * create/reterived during the initial process
 * @param {Object} state 
 */
const mapStateToProps = state => {
  return {
    walletAddress: state.newWallet.wallet.address,
  }
}

export default connect(mapStateToProps, null)(CoinReceive)

