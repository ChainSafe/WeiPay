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
        fontSize: 30,
        paddingLeft: '9%',
        paddingBottom: '2.5%',
        letterSpacing: 1.68,
        // alignSelf: 'flex-start',   
    },
    textBody : {
        fontFamily: "WorkSans-Light",
        fontSize: 14,   
        paddingLeft: '10%',
        paddingRight: '10%',   
        // height: '40%'   
    },
    btnContainer: {
        // paddingTop: 15,   
        marginTop: '4%',    
        marginBottom: '2.75%',
        alignItems:'stretch',
        width: '100%',
    }  ,
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 12,
        paddingBottom: '2.75%',
        // paddingTop: 15,
        justifyContent: 'center', 
        alignItems: 'center' ,
        color: '#c0c0c0'
    } 
})

export default TermsAndConditions;
