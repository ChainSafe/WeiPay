import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import CoinList from '../../../components/tokens/CoinList';
import LinearButton   from '../../../components/LinearGradient/LinearButton'

/**
 * Screen used to aquire the tokens/coins that the user wants to use
 * in their portfolio
 */
class EnableCrypto extends Component {

    state = {
        tokenList: this.props.tokenList,
        changeState: true
    }

    /**
     * Method used to navigate to the main portfolio Screen
     */
    navigate = () => {
        const navigateToPassphrase = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
        });
        this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Main Component
     * Contains the CoinList Component and button.
     * Where the button is simply acting as navigating button (going from one screen to another)
     * which stays disabled until at least one coin/token has been selected.
     */
    render() {
        return (
            <View style={styles.mainContainer} >
                <Text style={styles.textHeader} >Enable Tokens </Text>   
                <View style={{alignItems:"stretch", width:"100%", marginLeft: '9%', marginBottom:"2.5%"}}>             
                    <ScrollView style={{height:"70%"}} >
                        <CoinList />
                    </ScrollView>
                </View>
                <View style={styles.btnContainer} >
                    {/* <LinearButton 
                        onClickFunction={this.navigate}
                        buttonText="Add"
                        customStyles={styles.button}
                    /> */}
                    <Button
                        // disabled={this.props.tokenList.length === 0}
                        title='Add'
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
                        onPress={() => this.props.navigation.navigate('Drawer')}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                </View>
            </View>
        );
    }
}

/**
 * Styles used in the EnableTokens screen
 */
const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        backgroundColor: "#fafbfe",
        width:"100%"
    },
    textHeader: {       
        fontFamily: "Cairo-Light",
        fontSize: 26,        
        marginLeft: '9%',
        marginTop:"10%",
        paddingBottom: '2.5%',
        color: '#1a1f3e'
    },
    btnContainer: {
        alignItems: 'stretch',
        width: '100%',
        justifyContent: 'flex-end',
        marginBottom: '2.5%',
        flex:1
    },
    footerContainer: {
        alignItems:"center"
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 11,
        marginBottom: '3.5%',
        alignItems: 'center' ,
        color: '#c0c0c0'
    }
})

/**
 * Reterives the list of tokens that have been selected by the user.
 * Method returns an object which contains the token list
 * @param {Object} state 
 */
const mapStateToProps = state => {
    return {
        tokenList: state.newWallet.tokens,
    }
};

export default connect(mapStateToProps)(EnableCrypto);
