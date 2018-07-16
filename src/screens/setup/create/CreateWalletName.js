import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, AsyncStorage, Dimensions, Text } from "react-native";
import { KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { newWalletCreation, newWalletNameEntry } from '../../../actions/ActionCreator';
import {Card} from '../../../components/common/Card'
import LinearGradient from 'react-native-linear-gradient';
const ethers = require('ethers');

/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * a new wallet has been created
 */
class CreateWalletName extends Component {

    /**
     * Sets the title to "Create Wallet Name"
     */
    // static navigationOptions = {
    //     title: "Create Wallet Name"
    // };

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
    // static navigationOptions = ({ navigation }) =>  {
    //     return {
    //         headerStyle: {
    //             borderBottomWidth: 0,
    //             backgroundColor: "#fafbfe"
    //         },
    //         headerLeft: (
    //             <View style={{ marginLeft: 35, alignItems:'stretch', backgroundColor: "#fafbfe",  paddingTop: 15, borderBottomWidth: 0 }}>
    //                 <TouchableOpacity
    //                     onPress={() => navigation.navigate('createOrRestore')} >
    //                     <Image
    //                         source={require('../../../assets/icons/back.png')}
    //                         style={{height:20, width:20}}
    //                     /> 
    //                 </TouchableOpacity>
    //             </View>                
    //         )   
    //     }    
    // };

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
        // return (
        //     <View style={styles.mainContainer}>


        //             <View style={styles.formExcludingButton}>

        //                 <Text style={styles.walletName}>Wallet Name </Text>
        //                 <View style={styles.formInputform} >
        //                     <Text style={styles.formInputHeaderText}>Create a name for you wallet,</Text> 
        //                     <Text style={[styles.formHeadingText, styles.formInputHeaderText]} >for example: <Text style={{color: "#27c997"}}>My Wallet</Text></Text>
        //                     <FormInput
        //                         placeholder={"Ex. My Wallet"}
        //                         onChangeText={this.getWalletName.bind(this)}
        //                         inputStyle={styles.formInput}
        //                     />
        //                 </View>

        //             </View>
                    

        //             <View style={styles.btnContainer} >
                        // <Button
                        //     // disabled={this.props.walletName === ""}
                        //     title='Next'
                        //     icon={{ size: 28 }}
                        //     buttonStyle={{
                        //         backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                        //         height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30
                        //     }}
                        //     textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
                        //     onPress={this.navigate}
                        // />
                        // <Text style={{paddingTop: 4, color: '#c0c0c0'}}>Mantained by ChainSafe</Text>
        //             </View>
            
        //     </View>
        // );


        return (
            <View style={styles.mainContainer}>

                <View style={styles.walletNameView} >
                    <Text style={styles.walletNameText}>Wallet Name</Text>
                </View>
                
                    <View style={styles.formContainer}>
                        <Text style={styles.formText}>Create a name for you wallet,</Text> 
                        <Text style={[styles.formText, {paddingBottom: "20%"}]} >for example: <Text style={{color: "#27c997"}}>My Wallet</Text></Text>
                        <FormInput
                            placeholder={"Ex. My Wallet"}
                            onChangeText={this.getWalletName.bind(this)}
                            inputStyle={styles.formInput}
                        />
                    </View>
                    
                        <View style={styles.btnContainer}>
                            <TouchableOpacity>   
                                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.button} >
                                    <Text>Next</Text>
                                </LinearGradient>
                            </TouchableOpacity> 
                            <Text style={{paddingTop: 4, color: '#c0c0c0'}}>Mantained by ChainSafe</Text>

                        </View>


                




            </View>

        );
    }
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'stretch',
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#fafbfe", 
    },

    formContainer: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20, 
        alignItems: 'flex-start',
        backgroundColor: "#ffffff",
        // borderWidth: 5,
        // borderRadius: 6,
        // borderColor: '#000',
        // borderBottomWidth: 6,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 10 },
        shadowRadius: 12,

        
    },

    button: {
        borderColor: '#2a2a2a',
        borderWidth: 1,
        borderRadius: 100,
        width: 300,
        height: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30

    },

    btnContainer: {
        
        
        alignItems: 'center',
        justifyContent: 'flex-end',

    },

    formInput: {
        color: '#27c997',
        fontFamily: "WorkSans-Regular",
        fontSize: 16,
        
    },

    formText: {
        fontFamily: "WorkSans-Light",
        fontSize: 20,
        color: "#000000",
            

    },

    walletNameView: {
        paddingBottom: "10%",
    },

    walletNameText: {
        fontFamily: "Cairo-Light",
        fontSize: 40,
        color: '#000000',
    },



    


})





/**
 * Styles used in the "CreateWalletNameRecovery" screen
 */
// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//         flexDirection: 'column',    
//         backgroundColor: "#fafbfe", 
//         backgroundColor: "yellow",
        
        
//     },

//     form: {
//         width: Dimensions.get('window').width - 10,
//         justifyContent: 'center'
         
//     },

//     walletName: {
//         fontFamily: "Cairo-Light",
//         fontSize: 30,
//         color: '#000000',
//         paddingTop: 45,
//         paddingBottom: 25,
//         justifyContent: "flex-start"
       
        
//     },
//     formInput: {
//         width: 300,
//         color: '#27c997',
//         fontFamily: "WorkSans-Regular",
//         fontSize: 16
//     },

//     formInputHeaderText: {
//         fontFamily: "WorkSans-Light",
//         fontSize: 16,
//         color: "#000000"
        
        
//     },
    
//     formExcludingButton: {
//         alignItems: 'center',
//     },

//     formInputform: {
//         backgroundColor: "red",
//         width: 306,
//         height: 220,
//         paddingTop: 33,
//         paddingLeft: 30,
//         paddingRight: 42,
//         borderWidth: 1,
//         borderRadius: 6,
//         borderColor: '#fff',
//         borderBottomWidth: 1,
//         shadowOpacity: 1,
//         shadowColor: 'black',
      
        
//     },

//     formHeadingText: {
//         paddingBottom: 50
//     },

//     btnContainer: {
//         justifyContent: 'flex-end',
//         alignItems: 'center'
        

//     },
// })



/**
 * This method is not being used here
 * @param {Object} param0 
 */
const mapStateToProps = ({ newWallet }) => {
    const { walletName } = newWallet;
    return { walletName }
}

export default connect(mapStateToProps, { newWalletNameEntry, newWalletCreation })(CreateWalletName);

/*

borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 10 },
        shadowRadius: 12,

    */





//    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} >
//    <View style={styles.btnContainer}>
//        <Button
//            // disabled={this.props.walletName === ""}
//            title='Next'
//            icon={{ size: 28 }}
//            buttonStyle={{
//                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
//                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30
//            }}
//            textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
//            onPress={this.navigate}
//        />
//        <Text style={{paddingTop: 4, color: '#c0c0c0'}}>Mantained by ChainSafe</Text>
   
//    </View>
// </LinearGradient>