import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, List, ListItem, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';



class WalletNameChange extends Component {
    static navigationOptions = {
        title: "Change Wallet Name"
    };

    navigate = () => {
        // const navigateToPassphrase = NavigationActions.navigate({
        //     routeName: "generatePassphrase",
        //     params: { name: "Shubhnik" }
        // });
        // this.props.navigation.dispatch(navigateToPassphrase);
    };

    render() {

        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >
                    <View style={styles.form} >
                        <FormLabel>Wallet name </FormLabel>
                        <FormInput placeholder={"Wallet name"} />
                    </View>
                    <View style={styles.btnContainer} >
                        <Button
                            title='Update'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
                                justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
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
        marginTop: 25,
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },
    form: {
        width: 340,
        paddingTop: 15,
        paddingBottom: 15
    }
})



export default WalletNameChange;
