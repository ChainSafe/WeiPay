import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button } from 'react-native-elements';
import { restoreWallet } from '../../Actions/actionCreator';

/**
 * Initial setup screen used to allow the user to either restore a previously
 * generated wallet or to create a new one.
 */
class CreateOrRestore extends Component {

    /**
     * Sets the title to "Create or Restore Wallet"
     */
    static navigationOptions = {
        title: "Create or Restore Wallet"
    };

    /**
     * Method is used to navigate to the "createWalletName" if and only if the 
     * user decides to create a new wallet
     */
    navigateCreate = () => {
        const navigateToWalletName = NavigationActions.navigate({
            routeName: "createWalletName",
        });
        this.props.navigation.dispatch(navigateToWalletName);
    };

    /**
     * Method is used to navigate to the "createWalletNameRecovered" if and only if the 
     * user decides to recover thier wallet
     */
    navigateRestore = () => {
        const navigateToRecover = NavigationActions.navigate({
            routeName: "createWalletNameRecovered",
        });
        this.props.restoreWallet();
        this.props.navigation.dispatch(navigateToRecover);
    };

    /**
     * Returns a full screen component which presents the user with the choices in the form of
     * buttons
     */
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >
                    <View style={styles.companyDisplayContainer} >
                        <Image style={styles.logo} source={require('../../Assets/images/eth.png')} />
                        <Text style={styles.pageTitle} > WeiPay </Text>
                        <Text style={styles.pageDescription} > Mobile Wallet  </Text>
                    </View>
                    <View style={styles.btnContainer} >
                        <Button
                            title='Create Wallet'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10
                            }}
                            textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
                            onPress={this.navigateCreate}
                        />
                        <Button
                            title='Restore Wallet'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10
                            }}
                            textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
                            onPress={this.navigateRestore}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

/**
 * Styles used in the "CreateOrRestore" setup screen
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25,
        flex: 1,
        alignItems: 'center'
    },
    companyDisplayContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageTitle: {
        paddingBottom: 7,
        paddingTop: 10,
        alignItems: 'center',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '200'
    },
    pageDescription: {
        alignItems: 'center',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '100'
    },
    logo: {
        width: 65,
        height: 110,
        marginTop: 25,
        marginBottom: 25,
    },
    btnContainer: {
        marginTop: 20,
        justifyContent: 'flex-end'
    },
})

export default connect(null, { restoreWallet })(CreateOrRestore);

