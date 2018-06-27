import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

/**
 * Not using this screen 
 */

class ChangePassword extends Component {
    static navigationOptions = {
        title: "Change Password"
    };

    constructor(props) {
        super(props);
        this.state = {
            current: "",
            new: "",
            confirm: ""
        }
    }

    navigate = () => {
        const navigateToPassphrase = NavigationActions.navigate({
            routeName: "generatePassphrase",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateToPassphrase);
    };

    renderCurrent(currentPassword) {
        var add = currentPassword.trim();
        this.setState({ current: add });
        console.log(add)
    }

    renderNew(newPassword) {
        var add = newPassword.trim();
        this.setState({ new: add });
        console.log(add)
    }

    renderConfirm(confirmedPassword) {
        var add = confirmedPassword.trim();
        this.setState({ confirm: add });
        console.log(add)
    }

    checkPassword() {
        if (this.state.new == this.state.confirm) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >
                    <View style={styles.form} >
                        <FormLabel >Current Password </FormLabel>
                        <FormInput
                            onChangeText={this.renderCurrent.bind(this)}
                            placeholder={"Current Password"}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.form} >
                        <FormLabel >Enter New Password </FormLabel>
                        <FormInput
                            onChangeText={this.renderNew.bind(this)}
                            placeholder={"Enter New Password"}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.form} >
                        <FormLabel>Confirm New Password </FormLabel>
                        <FormInput
                            onChangeText={this.renderConfirm.bind(this)}
                            placeholder={"Family wallet, Work Fund.."}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.btnContainer} >
                        <Button
                            disabled={this.state.current === "" || this.state.new == "" || this.state.confirm == "" || this.checkPassword() == false}
                            title='Update'
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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25,
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20
    },
    form: {
        width: Dimensions.get('window').width - 20,
        paddingTop: 10,
        paddingBottom: 10
    },
})



export default ChangePassword;
