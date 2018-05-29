import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Terms } from './terms';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Input } from '../../Components/common/Input';
import { newWalletCreation, newWalletNameEntry } from '../../Actions/actionCreator';
const ethers = require('ethers');

var walletItem;

class CreateWalletName extends Component {

    static navigationOptions = {
        title: "Create Wallet Name"
    };

    navigate = () => {
        //Creating the wallet by random, pass the object to the next screen
        var wallet = ethers.Wallet.createRandom();
        this.props.newWalletCreation(wallet);
        const navigateToPassphrase = NavigationActions.navigate({ routeName: "generatePassphrase" });
        this.props.navigation.dispatch(navigateToPassphrase);
    };

    getWalletName(name) {
        this.props.newWalletNameEntry(name);
    }

    render() {

        // const storeWallet = async () => {
        //     console.log("store call");
        //     try {
        //         await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
        //     } catch (error) {
        //         // Error saving data
        //     }
        // }

        // const getWallet = async () => {
        //     console.log("get wallet call");
        //     try {
        //         const value = await AsyncStorage.getItem('@MySuperStore:key');
        //         if (value !== null) {
        //             // We have data!!
        //             console.log("Retrieved Value " + value);
        //         } else {
        //             console.log("value is empty");
        //         }
        //     } catch (error) {
        //         // Error retrieving data
        //     }
        // }

        // storeWallet();
        // getWallet();



        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >
                    <View style={styles.form} >
                        <FormLabel>Enter wallet name </FormLabel>
                        <FormInput placeholder={"Family wallet, Work Fund.."}
                            onChangeText={this.getWalletName.bind(this)}
                        />
                    </View>
                    <View style={styles.btnContainer} >
                        <Button
                            disabled={this.props.walletName === ""}
                            title='Next'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
                                justifyContent: 'center', marginBottom: 30, marginTop: 5.5
                            }}
                            textStyle={{ textAlign: 'center' }}
                            onPress={this.navigate}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25
    },
    form: {
        width: 340
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },
})

const mapStateToProps = ({ newWallet }) => {
    const { walletName } = newWallet;
    return { walletName }
}


export default connect(mapStateToProps, { newWalletNameEntry, newWalletCreation })(CreateWalletName);
//export default CreateWalletName;
