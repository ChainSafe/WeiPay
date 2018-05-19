import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Terms } from './terms';
import { Button } from 'react-native-elements';

import { newWalletCreation, restoreWallet } from '../../Actions/actionCreator';

class CreateOrRestore extends Component {
    static navigationOptions = {
        title: "Create/Restore Wallet"
    };

    navigateCreate = () => {
        const navigateToWalletName = NavigationActions.navigate({
            routeName: "createWalletName",
            params: { name: "Shubhnik" }
        });
        this.props.newWalletCreation();
        this.props.navigation.dispatch(navigateToWalletName);
    };

    navigateRestore = () => {
        const navigateToRecover = NavigationActions.navigate({
            routeName: "recoverWallet",
            params: { name: "Shubhnik" }
        });
        this.props.restoreWallet();
        this.props.navigation.dispatch(navigateToRecover);
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >

                    <View style={styles.companyDisplayContainer} >
                        <Image style={styles.logo} source={require('../../Assets/images/eth.png')} />
                        <Text style={styles.pageTitle} > WeiPay </Text>
                        <Text style={styles.pageDescription} > First digital offline crypto wallet </Text>
                    </View>

                    <View style={styles.btnContainer} >
                        <Button
                            title='Create Wallet'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'blue', borderRadius: 10, width: 250, height: 40, alignItems: 'center',
                                justifyContent: 'center', marginBottom: 3.5, marginTop: 3.5
                            }}
                            textStyle={{ textAlign: 'center' }}
                            onPress={this.navigateCreate}
                        />
                        <Button
                            title='Restore Wallet'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'blue', borderRadius: 10, width: 250, height: 40, alignItems: 'center',
                                justifyContent: 'center', marginBottom: 3.5, marginTop: 5.5
                            }}
                            textStyle={{ textAlign: 'center' }}
                            onPress={this.navigateRestore}
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
        marginTop: 25, flex: 1, alignItems: 'center'
    },
    pageTitle: {
        paddingBottom: 7, alignItems: 'center', fontSize: 25, textAlign: 'center', fontWeight: '200'
    },
    pageDescription: {
        alignItems: 'center', fontSize: 18, textAlign: 'center', fontWeight: '100'
    },
    companyDisplayContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 65,
        height: 110,
        marginTop: 25,
        marginBottom: 25,

    },
    btnContainer: {
        marginTop: 20
    },
})


export default connect(null, { newWalletCreation, restoreWallet })(CreateOrRestore);
//export default CreateOrRestore;
