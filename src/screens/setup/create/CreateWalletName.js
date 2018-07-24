import React, { Component } from "react";
import { View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, Text, Platform, Keyboard } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';
import { newWalletCreation, newWalletNameEntry } from '../../../actions/ActionCreator';
import LinearButton   from '../../../components/LinearGradient/LinearButton'
const ethers = require('ethers');

/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * a new wallet has been created
 */
class CreateWalletName extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            buttonDisabled: true,
         }
    }

    /**
     * Method is used to save the newly generated wallet (via ethers.js) in the global state
     * variable and to navigate to the "generatePassphrase" screen  
     */
    navigate = () => {
        const wallet = ethers.Wallet.createRandom();    
        this.props.newWalletCreation(wallet);
        console.log(this.state.wallet);
        const navigateToPassphrase = NavigationActions.navigate({ routeName: "generatePassphrase" });
        this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Executes the action "newWalletNameEntry" with "name" as the parameter
     * in order to update the name of the wallet in the global state variable
     * @param {String} name 
     */
    getWalletName(name) {
        this.props.newWalletNameEntry(name);
        this.setState({buttonDisabled: false})
    }

    /**
     * Main Component
     * Returns the form required for the user to set the name of their wallet
     */
    render() {
        return (           
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.mainContainer} >        
                    <View style={styles.headerBack}> 
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('createOrRestore')} >
                            <Image
                                source={require('../../../assets/icons/back.png')}
                                style={styles.btnBack}
                            /> 
                        </TouchableOpacity>
                    </View>   
                    <Text style={styles.textHeader} >Wallet Name</Text>                               
                    <View style={styles.contentContainer} >
                        <Card containerStyle={styles.cardContainer}> 
                            <Text style={styles.cardText}>
                                Create a name for your wallet, for example: My Wallet
                            </Text>
                            <FormInput
                                placeholder={"Ex. My Wallet"}
                                onChangeText={this.getWalletName.bind(this)}
                                inputStyle={styles.txtWalletName}
                            /> 
                        </Card>
                    </View>
                    <View style={styles.btnContainer}>
                        <LinearButton 
                            onClickFunction={this.navigate}
                            buttonText="Next"
                            customStyles={styles.button}
                            // buttonStateEnabled={this.state.buttonDisabled}
                        />
                    </View>                  
                    <View style={styles.footerGrandparentContainer} >    
                        <View style={styles.footerParentContainer} >
                            <Text style={styles.textFooter} >Powered by ChainSafe </Text> 
                        </View>  
                    </View> 
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        paddingTop: '5%',   
        backgroundColor: "#fafbfe",
        width: '100%',
        height: '100%',       
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
        fontSize: 26,        
        paddingLeft: '10%',  
        paddingBottom: '3%',
        marginTop: '5%',
        color: '#1a1f3e'
    },
    contentContainer : {
        alignItems: 'center',
        flex: 1
    },
    cardContainer: {
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
    txtWalletName: {
        width:'100%', 
        flexWrap: 'wrap', 
        color:'#12c1a2'
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

/**
 * This method is not being used here
 * @param {Object} param0 
 */
const mapStateToProps = ({ newWallet }) => {
    const { walletName } = newWallet;
    return { walletName }
}

export default connect(mapStateToProps, { newWalletNameEntry, newWalletCreation })(CreateWalletName);
