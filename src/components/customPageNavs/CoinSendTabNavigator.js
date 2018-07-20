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
            <View style={styles.tabHeader}  >
                <TouchableOpacity 
                    style={styles.headerButton}
                    onPress={this.navigateToSend} >
                    <Text style={styles.headerSend}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.headerButton}
                    onPress={this.navigateToHistory}>
                    <Text style={styles.headerActivity}>Activity</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.headerButton}
                    onPress={this.navigateToReceive}>
                    <Text style={styles.headerReceive} >Receive</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabHeader:{
        flexDirection:'row',  
        backgroundColor:'red', 
        width:'82%',
        justifyContent:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b3b3b3',
        paddingBottom: '2%',
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
