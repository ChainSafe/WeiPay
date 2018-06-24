import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { newWalletCreation } from '../../Actions/actionCreator'; //gonna save this passphrase to state

const ethers = require('ethers');
import provider from '../../constants/Providers';


class RecoverWallet extends Component {

    static navigationOptions = {
        title: "Restore"
    };

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
            var wallet = new ethers.Wallet("0x923ed0eca1cee12c1c3cf7b8965fef00a2aa106124688a48d925a778315bb0e5");
            wallet.provider = provider;

            console.log(wallet.address);
            console.log(wallet.mnemonic);
            console.log(wallet.privateKey);
            console.log(wallet.balance);

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

    constructor(props) {
        super(props)
        this.state = {
            mnemonic: "",
            value: ""
        }
    }

    renderRecoveryKey(mnemonicInput) {
        this.setState({ value: mnemonicInput.toLowerCase() })
        this.setState({ mnemonic: mnemonicInput.toLowerCase() });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >
                    <View style={styles.form} >
                        <FormLabel>Enter passphrase to recover </FormLabel>
                        <FormInput
                            value={this.state.value}
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={this.renderRecoveryKey.bind(this)}
                            ref={ref => this.inputMnemonic = ref} />
                        <View style={styles.btnContainer} >
                            <Button
                                // disabled={this.state.mnemonic === ""}
                                title='Restore'
                                icon={{ size: 28 }}
                                buttonStyle={{
                                    backgroundColor: 'white', borderColor: '#2a2a2a', borderWidth: 2, borderRadius: 10, width: 300,
                                    height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 30, marginTop: 5.5
                                }}
                                textStyle={{ textAlign: 'center', color: '#2a2a2a' }}
                                onPress={this.navigate}
                            />
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25
    },
    form: {
        width: Dimensions.get('window').width - 20,
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 25
    },
})

export default connect(null, { newWalletCreation })(RecoverWallet);
