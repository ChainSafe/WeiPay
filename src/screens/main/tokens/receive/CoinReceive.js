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
          showBack={true}
          navigation={this.props.navigation}
        />
        <CoinSendTabNavigator navigation={this.props.navigation} />
        <View style={styles.contentContainer} >
          
            <View style={styles.imageContainer}>
              <QRCode
                value={this.props.walletAddress}
                size={280}
                bgColor='#27c997'
                fgColor='#fafbfe' />
            </View>

            <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>Address: </Text>   
                <Text style={styles.addressValue}>{this.props.walletAddress}</Text> 
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
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '2.5%',
    backgroundColor: '#fafbfe'
  },
  contentContainer: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  addressContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap', 
    paddingBottom: '1.5%',
    paddingTop: '2.5%',
    width: 280
  },
  addressTitle : {   
    fontFamily: "Cairo-Regular",  
    color: 'black',
    fontSize: 13,  
    lineHeight: 17
  },   
  addressValue : {
    fontSize:13,
    fontFamily: "Cairo-Light",  
    color: 'black',  
    justifyContent:'center',
    lineHeight: 17    
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2.5%',
    paddingBottom: '2.5%'
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

