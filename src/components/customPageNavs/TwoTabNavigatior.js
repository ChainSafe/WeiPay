import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Platform, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import RF from "react-native-responsive-fontsize"

class TwoTabNavigator extends Component {

    /**
     * Props:
     *  leftTabScreen: String, Must contain the name of the screen that you want the tab to navigate to upon click
     *  leftTabText: String, Text that gets displayed on the left tab
     *  rightTabScreen: String, Must contain the name of the screen that you want the tab to navigate to upon click
     *  rightTabText: String, Text that gets displayed on the right tab
     */

    /**
     * Navigates to the coinSend Page
     */
    navigateLeftFunc = () => {
        const navigateLeft = NavigationActions.navigate({
            routeName: this.props.leftTabScreen,            
        });
        this.props.navigation.dispatch(navigateLeft);
    }

    /**
     * Navigates to the coinReceive Page
     */
    navigateRightFunc = () => {
        const navigateRight = NavigationActions.navigate({
            routeName: this.props.rightTabScreen,           
        });
        this.props.navigation.dispatch(navigateRight);
    }

    /**
     * Component the contains the tab navigation for the main Wallet Functionality
     */
    render() {

        const {
            tabHeader,
            headerButtonOneActive,
            headerButtonOne,
            headerContact,
            headerButtonTwoActive,
            headerButtonTwo,
            headerAddContact,
        } = styles;

        return (
            <View style={tabHeader}  >
                <TouchableOpacity 
                    style={this.props.Active ? headerButtonOneActive : headerButtonOne}
                    onPress={this.navigateLeftFunc} >
                    <Text style={headerContact}>{this.props.leftTabText}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={!this.props.Active ? headerButtonTwoActive : headerButtonTwo}
                    onPress={this.navigateRightFunc}>
                    <Text style={headerAddContact}>{this.props.rightTabScreen}</Text>
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
        marginRight: '9%',
        marginLeft: '9%',
    },
    headerContact :{
        alignSelf:'flex-start',
        fontSize: RF(3.3),
        fontFamily: "Cairo-Light", 
        letterSpacing: 0.6,     
    },
    headerAddContact: { 
        alignSelf:'flex-end',
        fontSize: RF(3.3),
        fontFamily: "Cairo-Light", 
        letterSpacing: 0.6, 
    },
    headerButtonOne: {
        width: '50%',
        padding: '2%'
    },
    headerButtonOneActive: {
        width: '50%',
        borderBottomWidth: 1,
        borderBottomColor: '#27c997',
        padding: '2%'
    },
    headerButtonTwo: {
        width: '50%',
        padding: '2%',
    },
    headerButtonTwoActive: {
        width: '50%',
        borderBottomWidth: 1,
        borderBottomColor: '#27c997',
        padding: '2%'
    },
});

export default TwoTabNavigator
