import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native";
import LinearGradient  from 'react-native-linear-gradient'



const BoxShadowCard = (props) => {
    
        return (
        <LinearGradient
                colors={['transparent', 'rgba(109, 108, 108,.05)', 'transparent']}
                style={[styles.GradientStyling, {justifyContent: 'center'}, props.customStyling]}
            >
            <View style={[styles.ChildContainerStyles]}>
                {props.children}
            </View>
        </LinearGradient>   
    );
}

const gradientColors = {
    Shadow: ['transparent', 'rgb(181, 177, 177, .2)', 'rgba(109, 108, 108,.2)', 'rgb(181, 177, 177, .2)', 'transparent']
}
const styles = StyleSheet.create({
  GradientStyling: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    zIndex: 0,
    borderRadius: 10, 
  },
  
  ChildContainerStyles: {
    backgroundColor: 'white',
    flex: 1, 
    borderRadius: 10,
    margin: '1%',
    marginTop: '2%',
    marginBottom: '2%'
  },

});
export default BoxShadowCard;
