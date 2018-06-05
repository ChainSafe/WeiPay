import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
const ethers = require('ethers');
import Provider from '../../constants/Providers'; //this gives us access to the local test rpc network to test
//import { recoverPassphrase } from '../../Actions/actionCreator'; //gonna save this passphrase to state
import { newWalletCreation } from '../../Actions/actionCreator'; //gonna save this passphrase to state



class RecoverWallet extends Component {
    static navigationOptions = {
        title: "Restore"
    };

    navigate = () => {

        const navigateToTokens = NavigationActions.navigate({
            routeName: "enableTokens",
            params: { name: "Shubhnik" }
        });

        var mnemonic, wallet;
        try {
            mnemonic = this.state.mnemonic.trim();
            wallet = ethers.Wallet.fromMnemonic(mnemonic);
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
            mnemonic: ""
        }
    }

    renderRecoveryKey(mnemonicInput) {
        this.setState({ mnemonic: mnemonicInput });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >
                    <View style={styles.form} >
                        <FormLabel> Enter passphrase to recover </FormLabel>
                        <FormInput
                            onChangeText={this.renderRecoveryKey.bind(this)}
                            ref={ref => this.inputMnemonic = ref} />
                    </View>
                    <View style={styles.btnContainer} >
                        <Button
                            disabled={this.state.mnemonic === ""}
                            title='Restore'
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25
    },
    form: {
        width: '90%'
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
})

export default connect(null, { newWalletCreation })(RecoverWallet);

