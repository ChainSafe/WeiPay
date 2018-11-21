import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Platform, Image, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";

class ContactBackWithMenuNav extends Component {

    navigateBack = () => {
        if (typeof this.props.backPage == 'undefined'){
            this.props.navigation.goBack()
        } else {
            const navigateToPassphrase = NavigationActions.navigate({ routeName: this.props.backPage });
            this.props.navigation.dispatch(navigateToPassphrase);
        }
    }

    navigateMenu = () => {
        const navigateToPassphrase = NavigationActions.navigate({ routeName: "DrawerOpen" });
        this.props.navigation.dispatch(navigateToPassphrase);
    }

    /**
     *  Props:
     *      showMenu: type=boolean, Determines if the Drawer icon will be displayed
     *      backPage: type=string, Specifies the page to go back to from the current screen (Optional)
     *      showBack: type=boolean, Determines if the back icon will be displayed on Main header
     */
    render() {
        return (
            <View style={styles.container}>
              { this.props.showBack ?
                <View style={[styles.boxContainer, styles.boxOne]}>
                  <TouchableOpacity
                    onPress={this.props.backButton} >
                    <Image
                      source={require('../../../assets/icons/back.png')}
                      style={styles.btnBack}
                    />
                  </TouchableOpacity>
                </View> : null}
              { this.props.showMenu ?
                <View style={[styles.boxContainer, styles.boxTwo]} >
                  <TouchableOpacity
                    onPress={this.navigateMenu} >
                    <Image
                      source={require('../../../assets/icons/menu.png')}
                      style={styles.btnMenu}
                    />
                  </TouchableOpacity>
                </View> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? '3.5%' : '2%',
        marginRight: '9%',
        marginLeft: '9%',
        height: Platform.OS === 'ios' ? 40 : 40,
        justifyContent:'center'
    },
     boxContainer:{
         flex:1,
         alignItems: 'center',
         justifyContent: 'center',
     },
     boxOne: {
         alignItems:'flex-start'
     },
     boxTwo: {
        alignItems:'flex-end',
        zIndex: 100
    },
    btnBack: {
        height: Dimensions.get('window').height * 0.03,  
        width: Dimensions.get('window').width * 0.05,  
    },
    btnMenu: {
        height: Dimensions.get('window').height * 0.02,  
        width: Dimensions.get('window').width * 0.05,  
    },
})

export default ContactBackWithMenuNav
