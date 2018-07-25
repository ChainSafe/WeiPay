import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Platform } from "react-native";
import { NavigationActions } from "react-navigation";
import { Terms } from '../../../constants/Terms';
import LinearButton   from '../../../components/LinearGradient/LinearButton'

/**
 * Initial terms and condition screen when the app is oppened for the first time.
 */
class TermsAndConditions extends Component {

    /**
     * Method used to navigate to the "createOrRestore" screen
     */
    navigate = () => {
        const navigateToCreateOrRestore = NavigationActions.navigate({
            routeName: "createOrRestore",
        });
        this.props.navigation.dispatch(navigateToCreateOrRestore);
    };

    /**
     * Returns the scrollable component that displays the terms and conditions with a submit button
     */
    render() {      
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.textHeader} >Terms & Conditions </Text>
                <ScrollView>
                    <Text style={styles.textBody} >{Terms}</Text>
                </ScrollView>                        
                <View style={styles.btnContainer}>
                    <LinearButton 
                        onClickFunction={this.navigate}
                        buttonText="Agree"
                        customStyles={styles.button}
                    />
                </View>
                <View style={{alignItems:"center"}}>
                    <Text style={styles.textFooter}>Powered by ChainSafe </Text> 
                </View>            
            </View>
        );
    }
}

/**
 * Styles used in the terms and condition screen
 */
const styles = StyleSheet.create({    
    mainContainer: {
        flex: 1,             
        backgroundColor: '#fafbfe',
        width: '100%',           
    },
    textHeader : {
        fontFamily: "Cairo-Light",
        fontSize: 26,
        paddingLeft: '10%',
        paddingBottom: '2.5%',
        marginTop:"10%",
        letterSpacing: 0.8,   
        color: '#1a1f3e'    
    },
    textBody : {
        fontFamily: "WorkSans-Light",
        fontSize: 12,   
        paddingLeft: '10%',
        paddingRight: '10%', 
        lineHeight:16  
    },
    btnContainer: {  
        marginTop: '5%',    
        marginBottom: '3.5%',      
        width: '100%',
    },
    button: {
        width: '82%'
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 12,
        paddingBottom: '5%',
        justifyContent: 'center', 
        alignItems: 'center',
        color: '#c0c0c0'
    } 
})

export default TermsAndConditions;
