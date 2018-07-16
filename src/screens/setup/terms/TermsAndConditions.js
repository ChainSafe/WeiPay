import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { Terms } from '../../../constants/Terms';
import { Button } from 'react-native-elements';

/**
 * Initial terms and condition screen when the app is oppened for the first time.
 */
class TermsAndConditions extends Component {

    /**
     * Sets the Screen title to "Terms and Conditions"
     */
    static navigationOptions = {     
        headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fafbfe"
        },     
    };

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
                    <Button
                        title='Agree'
                        icon={{ size: 28 }}
                        buttonStyle={{ 
                            backgroundColor: '#12c1a2', 
                            borderRadius: 100, 
                            width: '84%',
                            height: 52,                                  
                            alignItems: 'center', 
                            justifyContent: 'center',                                  
                            marginLeft: '7.5%'
                        }}
                        textStyle={{ 
                            textAlign: 'center', 
                            color: 'white', 
                            fontSize: 16, 
                            fontFamily:"Cairo-Regular" 
                        }}
                        onPress={this.navigate}
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
        paddingLeft: '9%',
        paddingBottom: '2.5%',
        letterSpacing: 0.84,       
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
        alignItems:'stretch',
        width: '100%',
    }  ,
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
