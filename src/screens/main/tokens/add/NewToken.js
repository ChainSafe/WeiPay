import React, { Component } from 'react';
import {
 View, Text, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView, TouchableWithoutFeedback, Dimensions, Keyboard, ActivityIndicator 
} from 'react-native';
import { connect } from 'react-redux';
import { FormInput, Button, Card } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import RF from "react-native-responsive-fontsize"
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { getQRCodeData, addTokenInfo } from '../../../../actions/ActionCreator';
import Provider from '../../../../constants/Providers';
import { qrScannerInvoker, updateTxnFee } from '../../../../actions/ActionCreator';
import CoinSendTabNavigator from '../../../../components/customPageNavs/CoinSendTabNavigator';
import ERC20ABI from '../../../../constants/data/json/ERC20ABI.json';
import LinearButton from '../../../../components/LinearGradient/LinearButton';
import ClearButton from '../../../../components/LinearGradient/ClearButton';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../../components/ShadowCards/BoxShadowCard';
import MaliciousAddresses from '../../../../constants/data/json/addresses_darklist.json';

const ethers = require('ethers');

class NewToken extends Component {
    render() {
        return (
          <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.mainContainer}>

                <View style={[{ flex: 1.25, marginLeft: '9%', marginRight: '9%', marginTop: '10%'} ]}>
                    <BoxShadowCard>
                        <Text style={styles.cardText}>
                            Enter ERC20 Token Address with it's name
                        </Text>
                        <View style= {styles.barcodeImageContainer}>
                        <TouchableOpacity>
                          <Image
                            source={require('../../../../assets/icons/barcode.png')}
                            style={styles.barcodeImage}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.formInputContainer}>
                        <FormInput
                            placeholder={'Token Address'}
                            // onChangeText={this.renderAddress.bind(this)}
                            // ref={ref => {return this.inputAddress = ref}}
                            // inputStyle={styles.formAddress}
                            // value={this.state.inputValue}
                        />
                      </View>

                      <View style={styles.formInputContainer}>
                        <FormInput
                            placeholder={'Token Name'}
                            // onChangeText={this.renderAddress.bind(this)}
                            // ref={ref => {return this.inputAddress = ref}}
                            // inputStyle={styles.formAddress}
                            // value={this.state.inputValue}
                        />
                      </View>
                        
                    </BoxShadowCard>
                </View>
    
              <View style={styles.btnContainer}>
                <LinearButton
                  onClickFunction={this.navigate}
                  buttonText='Add New Token'
                  customStyles={styles.button}
                />
                <View style={styles.footerGrandparentContainer}>
                    <View style={styles.footerParentContainer} >
                        <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                    </View>
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
      backgroundColor: '#fafbfe',
    },
    navContainer: {
      flex: 0.65,
    },
    navHeaderContainer: {
      flex: 0.3,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: '#fafbfe',
      justifyContent: 'center',
      width: '100%',
    },
    activityContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    activityHorizontal: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    warningText: {
      color: 'white',
      fontSize: RF(2.8),
      fontFamily: 'Cairo-Light',
      letterSpacing: 0.4,
      paddingBottom: '10%', 
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    maliciousCommentText: {
      color: 'red',
      fontSize: RF(2.1),
      marginLeft: '5%',
    },
    boxShadowContainer: {
      alignItems: 'center',
      marginTop: '10%',
      flex: 3.75,
      width: '100%',
    },
    contentContainer: {
      width: '82%',
      flex: 1,
    },
    cardText: {
      paddingBottom: '5%',
      paddingTop: '10%',
      paddingLeft: '10%',
      paddingRight: '10%',
      fontFamily: 'WorkSans-Light',
      fontSize: RF(2.4),
      color: '#000000',
      letterSpacing: 0.4,
    },
    barcodeImageContainer: {
      paddingTop: '5%',
      paddingBottom: '5%',
      paddingLeft: '10%',
    },
    barcodeImage: {
      height: Dimensions.get('window').height * 0.1,
      width: Dimensions.get('window').width * 0.18,
    },
    formAmount: {
      width: '90%',
      fontSize: RF(2.2),
      color: '#12c1a2',
      flexWrap: 'wrap',
      fontFamily: 'WorkSans-Light',
      letterSpacing: 0.4,
    },
    formAddress: {
      width: '90%',
      fontSize: RF(2.2),
      color: '#12c1a2',
      flexWrap: 'wrap',
      fontFamily: 'WorkSans-Light',
      letterSpacing: 0.4,
      paddingBottom: '3%',
    },
    displayFeeText: {
      width: '90%',
      marginLeft: '10.5%',
      fontSize: RF(1.4),
      letterSpacing: 0.3,
      fontFamily: 'WorkSans-Light',
      marginTop: '2%',
    },
    formInputContainer: {
      marginLeft: '4.5%',
      marginRight: '4.5%',
    },
    btnContainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-end',
      width: '82%',
      alignContent: 'center',
      marginLeft: '9%',
      marginRight: '9%',
    },
    button: {
      width: '82%',
      height: Dimensions.get('window').height * 0.082,
    },
    footerGrandparentContainer: {
      alignItems: 'center',
      marginBottom: '5%',
      marginTop: '5%',
    },
    footerParentContainer: {
      alignItems: 'center',
    },
    textFooter: {
      fontFamily: 'WorkSans-Regular',
      fontSize: RF(1.7),
      color: '#c0c0c0',
      letterSpacing: 0.5,
    },
  
  });
export default NewToken;
