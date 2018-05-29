import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
//import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
const ethers = require('ethers');
import Provider from '../../constants/Providers';


class RecoverWallet extends Component {
    static navigationOptions = {
        title: "Restore"
    };

    navigate = () => {

        console.log(this.state.mnemonic);
        var mnemonic = this.state.mnemonic;
        var wallet = ethers.Wallet.fromMnemonic(mnemonic);
        console.log("Address: " + wallet.address);


        //console.log(this.state.mnemonic);

        // const navigateToTokens = NavigationActions.navigate({
        //     routeName: "enableTokens",
        //     params: { name: "Shubhnik" }
        // });

        // this.props.navigation.dispatch(navigateToTokens);
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
                        <FormInput onChangeText={this.renderRecoveryKey.bind(this)} />
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

export default RecoverWallet;
