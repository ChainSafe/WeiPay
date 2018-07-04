import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, Text, TextInput, Image, AsyncStorage, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Input } from '../../../components/common/Input';
import { newWalletCreation, newWalletNameEntry } from '../../../actions/ActionCreator';
import provider from '../../../constants/Providers';
const ethers = require('ethers');

/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * the wallet has been recovered
 */
class CreateWalletName extends Component {

    /**
     * Sets the title to "Create Wallet Name"
     */
    static navigationOptions = {
        title: "Create Wallet Name"
    };

    /**
     * Method is used to navigate back to the recoverWallet screen.
     */
    navigate = () => {
        const navigateToPassphrase = NavigationActions.navigate({ routeName: "recoverWallet" });
        this.props.navigation.dispatch(navigateToPassphrase);
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
                <View style={styles.contentContainer} >
                    <View style={styles.form} >
                        <Text style={styles.walletName}>Wallet Name </Text>
                        <FormInput
                            placeholder={"Ex. My Wallet"}
                            onChangeText={this.getWalletName.bind(this)}
                            inputStyle={{ width: 300 }}
                        />
                        <View style={styles.btnContainer} >
                            <Button
                                // disabled={this.props.walletName === ""}
                                title='Next'
                                icon={{ size: 28 }}
                                buttonStyle={{
                                    backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                                    height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30
                                }}
                                textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
                                onPress={this.navigate}
                            />
                        </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -100
    },
    walletName: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 25,
    },
    formInput: {
        width: 300
    },
    form: {
        width: Dimensions.get('window').width - 10,
        alignItems: 'center'
    },
    btnContainer: {
        alignItems: 'center',
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

