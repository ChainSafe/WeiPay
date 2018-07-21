import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Platform, Image } from "react-native";
import { NavigationActions } from "react-navigation";

class BackWithMenuNav extends Component {


      /**
     * Navigates back and pass route in from props
     */
    // navigateBack = (route) => {
    //     const navigateHistory = NavigationActions.navigate({
    //       routeName: "coinHistory",
    //       params: { name: "Shubhnik" }
    //     });
    //     this.props.navigation.dispatch(navigateHistory);  
    // }
    
    // /**
    //  * Navigates to the coinSend Page
    //  */
    // navigateToMenu = () => {
    //     const navigateToMenu = NavigationActions.navigate({
    //         routeName: "DrawerOpen",
    //         params: { name: "Shubhnik" }
    //     });
    //     this.props.navigation.dispatch(navigateToMenu);
    // }


    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.boxContainer, styles.boxOne]}>
                    <TouchableOpacity
                        onPress={this.props.backFunction} >
                        <Image
                            source={require('../../assets/icons/back.png')}
                            style={{height:20, width:20}}
                        /> 
                    </TouchableOpacity>
                </View>
                <View style={[styles.boxContainer, styles.boxTwo]}>
                    <TouchableOpacity
                         onPress={this.props.menuFunction} >
                         <Image
                             source={require('../../assets/icons/menu.png')}
                             style={{height:13, width:22}}
                         /> 
                    </TouchableOpacity>
                </View>
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