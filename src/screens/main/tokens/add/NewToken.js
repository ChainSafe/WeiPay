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
        backgroundColor: '#fafbfe'
    },
    mainContainer: {
        flex: 1 ,
        backgroundColor: '#fafbfe',
    },
    NavBarButton: {
        flex: 0.65, 
        justifyContent: 'center',
        paddingBottom: '2%',
    },
    tabNavContainer: { 
        flex: 0.3, 
        justifyContent: 'center',
        marginBottom: '2%',
    },
    coinListContainer: {
        alignItems: 'stretch',
        marginLeft: '9%',
        marginRight: '9%',
        flex:5,
        paddingBottom: "2.5%",
        paddingTop: "2.5%",
    },
    btnContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    button: {
        width: '82%',
        height: Dimensions.get('window').height * 0.082,  
    },
    footerGrandparentContainer: {
        alignItems: 'center',
        marginBottom: '3%',
        marginTop: '3%',
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
export default NewToken;
