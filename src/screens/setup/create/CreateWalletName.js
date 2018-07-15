import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, AsyncStorage, Dimensions, Text } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';
import { Input } from '../../../components/common/Input';
import { newWalletCreation, newWalletNameEntry } from '../../../actions/ActionCreator';

var {height, width} = Dimensions.get('window');
const ethers = require('ethers');

/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * a new wallet has been created
 */
class CreateWalletName extends Component {

    /**
     * Method is used to save the newly generated wallet (via ethers.js) in the global state
     * variable and to navigate to the "generatePassphrase" screen  
     */
    navigate = () => {
        const wallet = ethers.Wallet.createRandom();
        this.props.newWalletCreation(wallet);
        const navigateToPassphrase = NavigationActions.navigate({ routeName: "generatePassphrase" });
        this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Sets the title to "Create Wallet Name"
     */
    static navigationOptions = ({ navigation }) =>  {
        return {
            headerStyle: {
                borderBottomWidth: 0,
                backgroundColor: "#fafbfe"
            },
            headerLeft: (
                <View style={{ marginLeft: 35, alignItems:'stretch', backgroundColor: "#fafbfe",  paddingTop: 15, borderBottomWidth: 0 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('createOrRestore')} >
                        <Image
                            source={require('../../../assets/icons/back.png')}
                            style={{height:20, width:20}}
                        /> 
                    </TouchableOpacity>
                </View>                
            )   
        }    
    };

    /**
     * Executes the action "newWalletNameEntry" with "name" as the parameter
     * in order to update the name of the wallet in the global state variable
     * @param {String} name 
     */
    getWalletName(name) {
        this.props.newWalletNameEntry(name);
    }

    /**
     * Main Component
     * Returns the form required for the user to set the name of their wallet
     */
    render() {
        return (
            <View style={styles.mainContainer}>              
                <Text style={styles.textHeader} >Wallet Name</Text>                               
                <View style={styles.contentContainer} >
                    <Card containerStyle={{ 
                        width: '80%', 
                        height: '55%', 
                        borderRadius: 7.5, 
                        shadowOpacity: 0.5, 
                        shadowRadius: 1.3, 
                        shadowColor: '#dbdbdb',
                        shadowOffset: { width: 1, height: 2 },                    
                    }}> 
                        <Text style={styles.cardText}>
                            Create a name for your wallet, for example: My Wallet
                        </Text>
                        <FormInput
                            placeholder={"Ex. My Wallet"}
                            onChangeText={this.getWalletName.bind(this)}
                            // inputStyle={{ width: 300 }}
                        /> 
                    </Card>
                </View>

                <View style={styles.btnContainer}>
                    <Button
                        //disabled={this.props.walletName === ""}
                        title='Next'
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
                        textStyle={{ textAlign: 'center', 
                        color: 'white', 
                        fontSize: 16, 
                        fontFamily:"Cairo-Regular" }}
                        onPress={this.navigate}
                    />
                </View>  
                
                <View style={{ alignItems:'center'}} >    
                    <View style={{ alignItems:'center'}} >
                        <Text style={styles.textFooter} >Powered by ChainSafe </Text> 
                    </View>  
                </View>   
            </View>
        );
    }
}

/**
 * Styles used in the "CreateWalletNameRecovery" screen
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: '5%',   
        backgroundColor: "#fafbfe",
        width: '100%',
        height: '100%'
    },
    contentContainer : {
        alignItems: 'center',
        flex: 1
    },
    cardText : {
        paddingBottom: '20%',
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        fontFamily: "WorkSans-Light",  
        color: '#000000',
        fontSize: 16,
    },
    textHeader: {       
        fontFamily: "Cairo-Light",
        fontSize: 24,        
        paddingLeft: 35,  //cannot set custom navbar with % so we are having an app standard for 30px left for titles  
        paddingBottom: '3%',
        color: '#1a1f3e'
    },
    btnContainer: {
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        width: '100%',      
    },
    footerContainer: {
        alignItems:"center",         
        alignItems:"center", 
        justifyContent:'flex-end',
        position: 'absolute', 
        bottom: '5%',       
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 12,      
        marginTop: '3.5%',      
        color: '#c0c0c0'
    },
})

/**
 * This method is not being used here
 * @param {Object} param0 
 */
const mapStateToProps = ({ newWallet }) => {
    const { walletName } = newWallet;
    return { walletName }
}

export default connect(mapStateToProps, { newWalletNameEntry, newWalletCreation })(CreateWalletName);

