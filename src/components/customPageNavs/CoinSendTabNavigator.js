import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { NavigationActions } from "react-navigation";
import RF from "react-native-responsive-fontsize";

class CoinSendTabNavigator extends Component {

    /**
     * Navigates to the coinHistory Page
     */
    navigateToHistory = () => {
        const navigateHistory = NavigationActions.navigate({
          routeName: "coinHistory",         
        });
        this.props.navigation.dispatch(navigateHistory);  
    }
    
    /**
     * Navigates to the coinSend Page
     */
    navigateToSend = () => {
        const navigateCoinSend = NavigationActions.navigate({
            routeName: "coinSend",       
        });
        this.props.navigation.dispatch(navigateCoinSend);
    }

    /**
     * Navigates to the coinReceive Page
     */
    navigateToReceive = () => {
        const navigateCoinReceive = NavigationActions.navigate({
            routeName: "coinReceive",        
        });
        this.props.navigation.dispatch(navigateCoinReceive);
    }

    /**
     * Component the contains the tab navigation for the main Wallet Functionality
     */
    render() {

        const {
            tabHeader,
            headerButton,
            headerSend,
            fullHeight,
            greenShade,
            headerActivity,
            activityLine,
            headerReceive,
            receiveLine,
        } = styles;

        return (
            <View style={tabHeader}>
                <TouchableOpacity 
                    style={headerButton}
                    onPress={this.navigateToSend} >                   
                    <Text style={[headerSend, fullHeight , this.props.sendActive ? greenShade : null ]}>Send</Text>
                    <View style={this.props.sendActive ? styles.sendLine : null }></View>
                </TouchableOpacity>         
                <TouchableOpacity 
                    style={ headerButton}
                    onPress={this.navigateToHistory}>                   
                    <Text style={[headerActivity, fullHeight, this.props.activityActive ? greenShade : null]}>Activity</Text>
                    <View style={this.props.activityActive ? activityLine : null}></View>
                </TouchableOpacity>             
                <TouchableOpacity 
                    style={headerButton}
                    onPress={this.navigateToReceive}>                                    
                    <Text style={[headerReceive, fullHeight, this.props.receiveActive ? greenShade : null]} >Receive</Text>
                    <View style={this.props.receiveActive ? receiveLine : null}></View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabHeader:{
        flexDirection:'row',  
        width:'82%',
        justifyContent:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b3b3b3',
        paddingBottom: '3.5%',
        marginRight: '9%',
        marginLeft: '9%',
    },
    headerSend :{
        alignSelf:'flex-start',
        fontSize: RF(3.3),
        fontFamily: "Cairo-Light", 
        letterSpacing: 0.6,     
    },
    headerActivity: {
        alignSelf:'center',
        fontSize: RF(3.3),
        fontFamily: "Cairo-Light", 
        letterSpacing: 0.6, 
    },
    headerReceive: { 
        alignSelf:'flex-end',
        fontSize: RF(3.3),
        fontFamily: "Cairo-Light", 
        letterSpacing: 0.6, 
    },
    headerButton: {
        width: '33%'
    },
    fullHeight: {
        height: '100%'
    },
    greenShade: {
        color: '#12c1a2'
    },
    sendLine: {
        justifyContent: 'flex-end' , 
        borderBottomColor: '#12c1a2', 
        borderBottomWidth: 1.5, 
        width: '60%'
    },
    activityLine:{
        justifyContent: 'flex-end', 
        borderBottomColor: '#12c1a2', 
        borderBottomWidth: 1.5
    },
    receiveLine:{
        justifyContent: 'flex-end', 
        borderBottomColor: '#12c1a2', 
        borderBottomWidth: 1.5, 
        marginLeft:'20%'
    },
});

export default CoinSendTabNavigator
