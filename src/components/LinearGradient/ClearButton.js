import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native";

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

class ClearButton extends Component {

    render() {
        return (
            <View>
                <TouchableOpacity 
                    onPress={this.props.onClickFunction}
                    disabled={this.props.buttonStateEnabled}
                >
                    <View                        
                        style={[
                            styles.buttonStyles, 
                            this.props.customStyles,
                            !this.props.buttonStateEnabled ? styles.buttonActive : styles.buttonInactive
                        ]}
                        >
                        <Text
                            style={[styles.textStyles, this.props.customTextStyles]}
                        >{this.props.buttonText}</Text>
                        
                    </View>
                </TouchableOpacity>
            </View>
        );
    }


}

const styles = StyleSheet.create({

    buttonActive:{
        borderColor: "#27c997", 
        // borderColor:"#b3b3b3"
    },
    buttonInactive:{
        borderColor:"#b3b3b3"
        
    },
    buttonStyles: {
        borderRadius: 100, 
        // borderColor: "#27c997",
        borderWidth: 1,
        // width: '82%',
        height: 52,                                  
        alignItems: 'center', 
        justifyContent: 'center',                                  
        marginLeft: '9%'
    },

    textStyles: {
        fontFamily: "Cairo-Regular",
        fontSize: 16,
        color: "#27c997",
        letterSpacing: 0.4
    }

})
  

export default ClearButton
