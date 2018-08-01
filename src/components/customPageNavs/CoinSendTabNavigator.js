import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Platform, Image } from "react-native";
import { NavigationActions } from "react-navigation";

class CoinSendTabNavigator extends Component {

    /**
     * Navigates to the coinHistory Page
     */
    navigateToHistory = () => {
        const navigateHistory = NavigationActions.navigate({
          routeName: "coinHistory",
          params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateHistory);  
    }
    
    /**
     * Navigates to the coinSend Page
     */
    navigateToSend = () => {
        const navigateCoinSend = NavigationActions.navigate({
            routeName: "coinSend",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateCoinSend);
    }

    /**
     * Navigates to the coinReceive Page
     */
    navigateToReceive = () => {
        const navigateCoinReceive = NavigationActions.navigate({
            routeName: "coinReceive",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateCoinReceive);
    }

    /**
     * Component the contains the tab navigation for the main Wallet Functionality
     */
    render() {
        return (
            <View style={styles.tabHeader}>
                <TouchableOpacity 
                    style={styles.headerButton}
                    onPress={this.navigateToSend} >                   
                    <Text style={[styles.headerSend, { height: '100%'}, this.props.sendActive ? { color: '#12c1a2'} : null ]}>Send</Text>
                    <View style={this.props.sendActive ? { justifyContent: 'flex-end' , borderBottomColor: '#12c1a2', borderBottomWidth: 1.5, width: '60%'} : null }></View>
                </TouchableOpacity>
         
                <TouchableOpacity 
                    style={ styles.headerButton}
                    onPress={this.navigateToHistory}>                   
                    <Text style={[styles.headerActivity, { height: '100%'}, this.props.activityActive ? { color: '#12c1a2'} : null]}>Activity</Text>
                    <View style={this.props.activityActive ? { justifyContent: 'flex-end', borderBottomColor: '#12c1a2', borderBottomWidth: 1.5} : null}></View>
                </TouchableOpacity>
             
                <TouchableOpacity 
                    style={styles.headerButton}
                    onPress={this.navigateToReceive}>                                    
                    <Text style={[styles.headerReceive, { height: '100%'}, this.props.receiveActive ? { color: '#12c1a2' } : null]} >Receive</Text>
                    <View style={this.props.receiveActive ? { justifyContent: 'flex-end', borderBottomColor: '#12c1a2', borderBottomWidth: 1.5, marginLeft:'20%'} : null}> </View>
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
        fontSize: 19,
        fontFamily: "Cairo-Light", 
        letterSpacing: 0.6,     
    },
    headerActivity: {
        alignSelf:'center',
        fontSize: 19,
        fontFamily: "Cairo-Light", 
        letterSpacing: 0.6, 
    },
    headerReceive: { 
        alignSelf:'flex-end',
        fontSize: 19,
        fontFamily: "Cairo-Light", 
        letterSpacing: 0.6, 
    },
    headerButton: {
        width: '33%'
    },
})

export default CoinSendTabNavigator
