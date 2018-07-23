import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, Platform } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';
import { newWalletCreation } from '../../../actions/ActionCreator'; //gonna save this passphrase to state
import provider from '../../../constants/Providers';
import LinearButton from '../../../components/LinearGradient/LinearButton';
const ethers = require('ethers');

/**
 * Screen used to recover a previously generated wallet
 */
class RecoverWallet extends Component {

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
             <View style={styles.headerBack}> 
                 <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('createWalletNameRecovered')} >
                    <Image
                        source={require('../../../assets/icons/back.png')}
                        style={styles.btnBack}
                    /> 
                </TouchableOpacity>
            </View>   
                <Text style={styles.textHeader} >Recovery Passphrase</Text>                               
                <View style={styles.contentContainer} >
                    <Card containerStyle={ styles.cardContainer}> 
                        <Text style={styles.cardText}>
                            Enter your 12 word recovery passphrase to recover your wallet.
                        </Text>                
                        <FormInput
                            placeholder={"Ex. man friend love long phrase ... "}
                            onChangeText={this.renderRecoveryKey.bind(this)}
                            inputStyle={styles.txtMnemonic}
                        />                        
                    </Card>
                </View>
                <View style={styles.btnContainer}>
                    <LinearButton 
                        onClickFunction={this.navigate }
                        buttonText="Recover"   
                        customStyles={styles.button}                                        
                    />                  
                </View>  
                <View style={styles.footerGrandparentContainer} >    
                    <View style={styles.footerParentContainer} >
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
    headerBack: {
        marginTop: Platform.OS === 'ios' ? '5%' : '5%',
        ...Platform.select({
          ios: { backgroundColor: '#fafbfe'},
          android: { backgroundColor: '#fafbfe'}
        }),
        marginLeft: '9%',       
    },   
    btnBack:{
        height:20, 
        width:20
    },
    textHeader: {       
        fontFamily: "Cairo-Light",
        fontSize: 24,        
        paddingLeft: '10%',   
        paddingBottom: '3%',
        marginTop: '5%',
        color: '#1a1f3e'
    },
    txtMnemonic: {
        width:'100%', 
        flexWrap: 'wrap', 
        color:'#12c1a2'
    },
    contentContainer : {
        alignItems: 'center',
        flex: 1
    },
    cardContainer : {
        width: '82%', 
        height: '55%', 
        borderRadius: 7.5, 
        shadowOpacity: 0.5, 
        shadowRadius: 1.3, 
        shadowColor: '#dbdbdb',
        shadowOffset: { width: 1, height: 2 } 
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
    btnContainer: {
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        width: '100%',      
    }, 
    button: {
        width: '82%'
    },  
    footerGrandparentContainer : {
        alignItems:'center'
    },
    footerParentContainer :{ 
        alignItems:'center'
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 11,      
        marginTop: '3.5%',      
        color: '#c0c0c0'
    }
})

export default connect(null, { newWalletCreation })(RecoverWallet);
