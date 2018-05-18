import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Terms } from './terms';
import { Button } from 'react-native-elements';
//import { BtnSubmit } from '../../Components/Buttons/BtnSubmit';
//import { incrementAction, decrementAction } from "../Actions/actionCreator";
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
        console.log("wtf");
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
                <Text style={styles.pageTitle} > WeiPay </Text>
                <Text style={styles.pageDescription} > First digital offline crypto wallet </Text>
                <Image style={styles.logo} source={require('../../Assets/images/eth.png')} />

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
        paddingBottom: 7, alignItems: 'center', fontSize: 22
    },
    pageDescription: {
        alignItems: 'center', fontSize: 15
    },
    termsContainer: {
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30
    },
    logo: {
        width: 130,
        height: 220,
        marginTop: 25,
        marginBottom: 25,
    },
    btnContainer: {
        marginTop: 20
    },
    btn: {
        width: 225,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2.5,
        marginTop: 2.5,
    }
})


export default connect(null, { newWalletCreation, restoreWallet })(CreateOrRestore);
//export default CreateOrRestore;
