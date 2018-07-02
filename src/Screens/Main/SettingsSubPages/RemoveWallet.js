import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, Text, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, List, ListItem, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

/**
 * Screen is used to delete the current wallet and Start fresh
 */
class RemoveWallet extends Component {

    /**
     * Sets the screen title to "Delete Wallet"
     */
    static navigationOptions = {
        title: "Delete Wallet"
    };

    /**
     * Empty Method
     */
    navigate = () => {
        // const navigateToPassphrase = NavigationActions.navigate({
        //     routeName: "generatePassphrase",
        //     params: { name: "Shubhnik" }
        // });
        // this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Returns a full screen component that notifies the 
     * user about the effects of deleting the wallet and provides the
     * user with a button in order for them to go about this process
     */
    render() {
        return (
            <View style={styles.mainContainer} >
                <View style={styles.contentContainer} >
                    <Text style={styles.header}>
                        If you continue your current wallet will be REMOVED
                    </Text>
                    <Text style={styles.description} >
                        If you do not remember your current wallet's password, you can set a new password by restoring
                        your wallet with your 12-word passphrase.
                    </Text>
                    <View style={styles.btnContainer} >
                        <Button
                            title='Remove Wallet'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 5.5
                            }}
                            textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
                            onPress={this.navigate}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

/**
 * Styles used in the "RemoveWallet" screen
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25,
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
    header: {
        color: 'red',
        alignItems: 'center',
        fontSize: 18,
    },
    description: {
        alignItems: 'center',
        paddingTop: 20,
        width: Dimensions.get('window').width - 80,
    }
})

export default RemoveWallet;
