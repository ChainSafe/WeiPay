import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native";
import LinearGradient  from 'react-native-linear-gradient'


/**
 * Component must have the following props:
 *      onClickFunction
 *      buttonText
 *      buttonStateEnabled
 * 
 * Optional props:
 *      customStyles
 *      customTextStyles
 *      
 *      
 */

class LinearButton extends Component {

    render() {
        return (
            <View>
                <TouchableOpacity 
                    onPress={this.props.onClickFunction}
                    disabled={this.props.buttonStateEnabled}
                >
                    <LinearGradient 
                        colors={!this.props.buttonStateEnabled ? gradientColors.Enabled : gradientColors.Disabled} 
                        start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        style={[styles.buttonStyles, this.props.customStyles]}
                        >
                        <Text
                            style={[styles.textStyles, this.props.customTextStyles]}
                        >{this.props.buttonText}</Text>   
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }
}

const gradientColors = {
    Enabled: ['#04b79f', '#5cfab1'],
    Disabled: ['#a2a3a5', '#e5e5e5']
}
const styles = StyleSheet.create({
    buttonStyles: {
        borderRadius: 100,         
        // height: 52,
                                          
        alignItems: 'center', 
        justifyContent: 'center',                                  
        marginLeft: '9%'
    },
    textStyles: {
        fontFamily: "Cairo-Regular",
        fontSize: 16,
        color: "#ffffff",
        letterSpacing: 0.4
    },
})
  

export default LinearButton
