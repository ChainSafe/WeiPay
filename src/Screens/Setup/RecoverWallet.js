import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { recoverPassphrase } from '../../Actions/actionCreator';


class RecoverWallet extends Component {
    static navigationOptions = {
        title: "Restore"
    };

    navigate = () => {

        const navigateToTokens = NavigationActions.navigate({
            routeName: "enableTokens",
            params: { name: "Shubhnik" }
        });

        this.props.navigation.dispatch(navigateToTokens);
    };

    // renderRecoveryKey(key) {
    //     this.props.recoveryKey(key);
    // }

    renderRecoveryKey(passphrase) {
        this.props.recoverPassphrase(passphrase);
    }



    render() {
        return (
            <View style={styles.mainContainer}>
              <View style={styles.contentContainer} >
                <View style={styles.form} >
                  <FormLabel> Enter passphrase to recover </FormLabel>
                  <FormInput onChangeText={this.renderRecoveryKey.bind(this)} />
                </View>
                <View style={styles.btnContainer} >
                  <Button
                    disabled={this.props.backupPassphrase === ""}
                    title='Restore'
                    icon={{ size: 28 }}
                    buttonStyle={{
                      backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
                      justifyContent: 'center', marginBottom: 30, marginTop: 5.5
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
        marginTop: 25
    },
    form: {
        width: 340
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },
})


//
const mapStateToProps = ({ newWallet }) => {
    const { backupPassphrase } = newWallet
    return { backupPassphrase }
}



export default connect(mapStateToProps, { recoverPassphrase })(RecoverWallet);
//export default RecoverWallet;
