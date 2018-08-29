import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Platform, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import RF from "react-native-responsive-fontsize"

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
    navigateToContacts = () => {
        const navigateContacts = NavigationActions.navigate({
            routeName: "contacts",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateContacts);
    }

    /**
     * Navigates to the coinReceive Page
     */
    navigateToAddContact = () => {
        const navigateAddContact = NavigationActions.navigate({
            routeName: "addContact",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateAddContact);
    }

    /**
     * Component the contains the tab navigation for the main Wallet Functionality
     */
    render() {
        return (
            <View style={styles.tabHeader}  >
              <TouchableOpacity
                style={this.props.tab === 'contacts' ? styles.headerButtonOneActive : styles.headerButtonOne}
                onPress={this.props.setContactTab} >
                <Text style={styles.headerContact}>Contacts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={this.props.tab === 'addcontact' ? styles.headerButtonTwoActive : styles.headerButtonTwo}
                onPress={this.props.setAddContactTab}>
                <Text style={styles.headerAddContact}>Add Contact</Text>
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
        fontSize: RF(2.8),
        fontFamily: "Cairo-Light",
        letterSpacing: 0.6,
    },
    headerAddContact: {
        alignSelf:'flex-end',
        fontSize: RF(2.8),
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
})

export default CoinSendTabNavigator
