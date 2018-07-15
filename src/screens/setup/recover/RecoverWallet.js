import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';
import { newWalletCreation } from '../../../actions/ActionCreator'; //gonna save this passphrase to state
import provider from '../../../constants/Providers';
const ethers = require('ethers');

/**
 * Screen used to recover a previously generated wallet
 */
class RecoverWallet extends Component {

    /**
     * Sets the title of the screen
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
                        onPress={() => navigation.navigate('createWalletNameRecovered')} >
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
     * Navigates the state to view the enableTokens screen if the mnemonic entered
     * is valid otherwise an error is displayed
     */
    navigate = () => {

        const navigateToTokens = NavigationActions.navigate({
            routeName: "enableTokens",
        });

        try {
            /*
                Hardcoded to private key for testing
                var mnemonic, wallet;\
                mnemonic = this.state.mnemonic.trim();
                wallet = ethers.Wallet.fromMnemonic(mnemonic);
            */
            const wallet = new ethers.Wallet("0x923ed0eca1cee12c1c3cf7b8965fef00a2aa106124688a48d925a778315bb0e5");
            wallet.provider = provider;
            this.props.newWalletCreation(wallet); //pass state to redux to save it
            this.props.navigation.dispatch(navigateToTokens);
        }
        catch (err) {
            Alert.alert(
                'Mnemonic Error',
                'Your mnemonic was invalid, please re-enter.',
                [
                    { text: 'OK', onPress: () => this.inputMnemonic.clearText() },
                ],
                { cancelable: false }
            )
        }
    };

    /**
     * Set the local state to keep track of the mnemonic entered to recover the wallet
     * @param {Object} props 
     */
    constructor(props) {
        super(props)
        this.state = {
            mnemonic: "",
            value: ""
        }
    }

    /**
     * Updates the local state with the latest mnemonic that was inputted in the input field 
     * @param {String} mnemonicInput 
     */
    renderRecoveryKey(mnemonicInput) {
        this.setState({ value: mnemonicInput.toLowerCase() })
        this.setState({ mnemonic: mnemonicInput.toLowerCase() });
    }

    /**
     * Returns the form required to recover the wallet
     */
    render() {
        return (
            <View style={styles.mainContainer}>              
                <Text style={styles.textHeader} >Recovery Passphrase</Text>                               
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
                            Enter your 12 word recovery passphrase to recover your wallet.
                        </Text>
                        {/* <View style={{flexDirection:'row'}}> */}
                            <FormInput
                                placeholder={"Ex. man friend love long phrase ... "}
                                onChangeText={this.renderRecoveryKey.bind(this)}
                                inputStyle={{width:'100%', flexWrap: 'wrap', color:'#12c1a2'}}
                            /> 
                        {/* </View> */}
                    </Card>
                </View>
                <View style={styles.btnContainer}>
                    <Button
                        //disabled={this.state.mnemonic === ""}
                        title='Recover'
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
 * Styles used in the RecoverWallet screen
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
        // bottom: '5%',       
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 11,      
        marginTop: '3.5%',      
        color: '#c0c0c0'
    }
})

export default connect(null, { newWalletCreation })(RecoverWallet);
