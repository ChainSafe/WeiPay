import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Dimensions } from "react-native";
import PropTypes from 'prop-types'
import RF from "react-native-responsive-fontsize"

/**
 * Component must have the following props:
 *      onClickFunction
 *      buttonText
 * 
 * Optional props:
 *      customStyles
 *      customTextStyles
 *      unlockButton -> home screen active button
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
                            this.props.unlockButton ? styles.buttonActive : styles.buttonInactive
                        ]}
                        >
                        <Text
                            style={[
                                styles.textStyles, 
                                this.props.customTextStyles,
                                this.props.buttonStateEnabled ? styles.textActive : styles.textInactive,
                                this.props.unlockButton ? styles.textActive : styles.textInactive
                            ]}
                        >{this.props.buttonText}</Text>
                        
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

ClearButton.propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
    buttonActive: {
        borderColor: "#27c997", 
    },
    buttonInactive: {
        borderColor:"#b3b3b3"
    },
    textActive: {
        color: "#27c997", 
    },
    textInactive: {
        color:"#b3b3b3"
    },
    buttonStyles: {
        borderRadius: 100,        
        borderWidth: 1,                               
        alignItems: 'center', 
        justifyContent: 'center',    
        marginLeft: '9%',                                
    },
    textStyles: {
        fontFamily: "Cairo-Regular",
        fontSize: RF(2.5),
        color: "#27c997",
        letterSpacing: 0.4
    }
})
  

export default ClearButton