import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native";
import LinearGradient  from 'react-native-linear-gradient'


class Button extends Component {

    /**
     * Component must have the following props:
     *      onClickFunction
     *      buttonText
     * 
     * Optional props:
     *      customStyles
     *      customTextStyles
     *      
     *      
     */

    render() {
        return (
            <View>
                <TouchableOpacity 
                    onPress={this.props.onClickFunction}
                >
                    <LinearGradient 
                        colors={['#04b79f', '#5cfab1']} 
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

const styles = StyleSheet.create({
    buttonStyles: {
        borderRadius: 100, 
        width: '84%',
        height: 52,                                  
        alignItems: 'center', 
        justifyContent: 'center',                                  
        marginLeft: '7.5%'
    },

    textStyles: {
        fontFamily: "Cairo-Regular",
        fontSize: 20,
        color: "#ffffff",
    }

})
  

export default Button
