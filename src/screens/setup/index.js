import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button } from 'react-native-elements';
import { restoreWallet } from '../../actions/ActionCreator';

/**
 * Initial setup screen used to allow the user to either restore a previously
 * generated wallet or to create a new one.
 */
class CreateOrRestore extends Component {

    /**
     * Sets the title to "Create or Restore Wallet"
     */
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fafbfe"
        }
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
                <View style={styles.textContainer}>
                    <Text style={styles.textHeader} > WeiPay</Text>
                    <Text style={styles.textHeaderDescription} > ERC20 Token Wallet </Text>
                </View>
                <View style={styles.secondaryContainer}>
                    <View style={styles.contentContainer} >
                        <View style={styles.btnContainer} >
                            <Button
                                title='Create Wallet'
                                icon={{ size: 28 }}
                                buttonStyle={{
                                    backgroundColor: '#12c1a2', borderRadius: 100, width: 340,
                                    height: 60, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10
                                }}
                                textStyle={{ textAlign: 'center', color: 'white', fontSize: 20, fontFamily:"Cairo-Regular" }}
                                onPress={this.navigateCreate}
                            />
                            <Button
                                title='Restore Wallet'
                                icon={{ size: 28 }}
                                buttonStyle={{
                                    backgroundColor: '#061f46', borderRadius: 100, width: 340,
                                    height: 60, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20
                                }}
                                textStyle={{ textAlign: 'center', color: 'white', fontSize: 20, fontFamily:"Cairo-Regular" }}
                                onPress={this.navigateRestore}
                            />
                        </View>
                    </View>
                    <Text style={styles.textFooter} >Powered by Chainsafe </Text> 
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
        paddingTop: 70,       
        justifyContent: 'flex-start',
        backgroundColor: '#fafbfe',
    },
    textContainer : {
        paddingLeft: 40,
    },
    contentContainer: {
        marginTop: 25,
        flex: 1,    
    },
    secondaryContainer : {
        flex:1,
        alignItems: 'center'
    },
    companyDisplayContainer: {
        marginTop: 50,     
    },
    textHeader: {       
        fontFamily: "Cairo-Light",
        fontSize: 50,        
        marginBottom:-15,
       color: '#1a1f3e'
    },
    textHeaderDescription: {      
        color: '#1a1f3e',
        fontFamily: "Cairo-Regular",
        fontSize: 20,
        paddingLeft: 10,     
        letterSpacing: 3,
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 16,
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'center', 
        alignItems: 'center' ,
        color: '#c0c0c0'
    },
    btnContainer: {
        marginTop: 20,
        justifyContent: 'flex-end'
    },
})

export default connect(null, { restoreWallet })(CreateOrRestore);

