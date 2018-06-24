import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, AsyncStorage, Dimensions, Text } from "react-native";
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
        var wallet = ethers.Wallet.createRandom();
        this.props.newWalletCreation(wallet);
        const navigateToPassphrase = NavigationActions.navigate({ routeName: "generatePassphrase" });
        this.props.navigation.dispatch(navigateToPassphrase);
    };

    getWalletName(name) {
        this.props.newWalletNameEntry(name);
    }

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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -100
    },
    walletName: {
        fontSize: 20,
        paddingTop: 20,
        // alignItems: 'flex-start',
        paddingBottom: 25,
    },
    formInput: {
        width: 300
    },
    contentContainer: {
        // marginTop: 25
    },
    form: {
        width: Dimensions.get('window').width - 10,
        alignItems: 'center'
    },
    btnContainer: {
        // flex: 1,
        // justifyContent: 'flex-end',
        alignItems: 'center',
        // paddingTop: 25
    },
})

const mapStateToProps = ({ newWallet }) => {
    const { walletName } = newWallet;
    return { walletName }
}


export default connect(mapStateToProps, { newWalletNameEntry, newWalletCreation })(CreateWalletName);
//export default CreateWalletName;
