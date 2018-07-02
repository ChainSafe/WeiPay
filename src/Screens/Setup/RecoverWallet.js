import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { newWalletCreation } from '../../Actions/actionCreator'; //gonna save this passphrase to state
import provider from '../../constants/Providers';
const ethers = require('ethers');

/**
 * Screen used to recover a previously generated wallet
 */
class RecoverWallet extends Component {

    /**
     * Sets the title of the screen
     */
    static navigationOptions = {
        title: "Restore"
    };

    /**
     * Navigates the state to view the enableTokens screen if the mnemonic entered
     * is valid otherwise an error is displayed
     */
    navigate = () => {

        const navigateToTokens = NavigationActions.navigate({
            routeName: "enableTokens",
            params: { name: "Shubhnik" }
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
                <View style={styles.contentContainer} >
                    <View style={styles.form} >
                        <Text style={styles.walletName}>Enter Passphrase to Recover </Text>
                        <FormInput
                            placeholder={"Ex. Cat Fish Hello Man Women Etc."}
                            onChangeText={this.renderRecoveryKey.bind(this)}
                            inputStyle={{ width: 300 }}
                            multiline={true}
                            numberOfLines={3}
                        />
                        <View style={styles.btnContainer} >
                            <Button
                                // disabled={this.state.mnemonic === ""}
                                title='Restore'
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
 * Styles used in the RecoverWallet screen
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -100
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

export default connect(null, { newWalletCreation })(RecoverWallet);
