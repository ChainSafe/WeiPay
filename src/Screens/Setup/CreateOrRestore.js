import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button } from 'react-native-elements';
import { restoreWallet } from '../../Actions/actionCreator';

class CreateOrRestore extends Component {

    static navigationOptions = {
        title: "Create or Restore Wallet"
    };

    navigateCreate = () => {
        const navigateToWalletName = NavigationActions.navigate({
            routeName: "createWalletName",
        });
        this.props.navigation.dispatch(navigateToWalletName);
    };

    navigateRestore = () => {
        const navigateToRecover = NavigationActions.navigate({
            routeName: "createWalletNameRecovered",
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
                                backgroundColor: 'white', borderColor: '#2a2a2a', borderWidth: 2, borderRadius: 10, width: 300,
                                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 5.5
                            }}
                            textStyle={{ textAlign: 'center', color: '#2a2a2a' }}
                            onPress={this.navigateCreate}
                        />
                        <Button
                            title='Restore Wallet'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'white', borderColor: '#2a2a2a', borderWidth: 2, borderRadius: 10, width: 300,
                                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 5.5
                            }}
                            textStyle={{ textAlign: 'center', color: '#2a2a2a' }}
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
        alignItems: 'center',
        fontSize: 25,
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
        marginTop: 20
    },
})

export default connect(null, { restoreWallet })(CreateOrRestore);

