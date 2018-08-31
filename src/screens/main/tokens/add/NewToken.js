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
            <Text>Hello there</Text>
        );
    }


}

export default NewToken;
