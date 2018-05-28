import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Terms } from './terms';
import { Button } from 'react-native-elements';
import { BtnSubmit } from '../../Components/Buttons/BtnSubmit';

import provider from '../../constants/Providers';
var ethers = require('ethers');
var utils = ethers.utils;
var Wallet = ethers.Wallet;

class ViewTerms extends Component {
    static navigationOptions = {
        title: "Terms and Conditions",
        headerStyle: {
            borderBottomWidth: 0,
        }
    };

    constructor() {
        super();

        var privateKey = "0x9436a5c70623f162df33b93ca29f9430e55202d157b0355b7cd4761b121c3c4f";
        var wallet = new Wallet(privateKey);
        wallet.provider = provider;

        console.log(wallet);

        var walletRandom = Wallet.createRandom();
        walletRandom.provider = provider;
        console.log("Address: " + walletRandom.address);


        var amount = ethers.utils.parseEther('10.0');
        var sendPromise = wallet.send(walletRandom.address, amount);

        sendPromise.then(function (transactionHash) {
            console.log(transactionHash);

            provider.getBalance(wallet.address).then(function (balance) {

                // balance is a BigNumber (in wei); format is as a sting (in ether)
                var etherString = utils.formatEther(balance);

                console.log("first Balance: " + etherString);
            });


            provider.getBalance(walletRandom.address).then(function (balance) {

                // balance is a BigNumber (in wei); format is as a sting (in ether)
                var etherString = utils.formatEther(balance);

                console.log("random Balance: " + etherString);
            });


        });


        // // These will query the network for appropriate values
        // var options = {
        //     //gasLimit: 21000
        //     //gasPrice: utils.bigNumberify("20000000000")
        // };

        // var promiseSend = wallet.send(address, amount, options);

        // promiseSend.then(function(transaction) {
        //     console.log(transaction);
        // });





    }

    navigate = () => {
        console.log("hello");
        const navigateToCreateOrRestore = NavigationActions.navigate({
            routeName: "createOrRestore",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateToCreateOrRestore);
    };

    render() {
        const { counterCount, incrementAction, decrementAction } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.termsContainer}>
                    <ScrollView style={styles.list}>
                        <Text>{Terms}</Text>
                    </ScrollView>
                    <View style={styles.btnContainer}>
                        <Button
                            title='SUBMIT'
                            icon={{ size: 28 }}
                            buttonStyle={{ backgroundColor: 'blue', borderRadius: 10 }}
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
    termsContainer: {
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30
    },
    btnContainer: {
        paddingTop: 25
    }, list: {
        backgroundColor: 'white', padding: 10
    }
})



export default ViewTerms;
