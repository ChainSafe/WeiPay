import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Platform, Image } from "react-native";
import { NavigationActions } from "react-navigation";

class BackWithMenuNav extends Component {

    navigateBack = () => {
        const navigateToPassphrase = NavigationActions.navigate({ routeName: "mainStack" });
        this.props.navigation.dispatch(navigateToPassphrase);
    }
    
    navigateMenu = () => {
        const navigateToPassphrase = NavigationActions.navigate({ routeName: "DrawerOpen" });
        this.props.navigation.dispatch(navigateToPassphrase);
    }
    
    /**
     *  Props:
     *      showMenu: type=boolean, Determines if the Drawer icon will be displayed
     */
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.boxContainer, styles.boxOne]}>
                    <TouchableOpacity
                        onPress={this.navigateBack} >
                        <Image
                            source={require('../../assets/icons/back.png')}
                            style={{height:20, width:20}}
                        /> 
                    </TouchableOpacity>
                </View>
                { this.props.showMenu ? 
                <View style={[styles.boxContainer, styles.boxTwo]} >
                    <TouchableOpacity
                         onPress={this.navigateMenu} >
                         <Image
                             source={require('../../assets/icons/menu.png')}
                             style={{height:13, width:22}}
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
        marginTop: Platform.OS === 'ios' ? '5%' : '2%',
        marginRight: '9%',
        marginLeft: '9%',
        height: Platform.OS === 'ios' ? 45 : 40,
        backgroundColor: 'purple',
        justifyContent:'center'
    },
     boxContainer:{
         flex:1,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: "blue"
     },
     boxOne: {
         backgroundColor: 'blue',
         alignItems:'flex-start'
     },
     boxTwo: {
        backgroundColor: 'green',
        alignItems:'flex-end',
    
        zIndex: 100
    }
})
  
export default BackWithMenuNav