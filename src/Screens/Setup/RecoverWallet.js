import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


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

    render() {
        return (
            <View style={styles.mainContainer}>
              <View style={styles.contentContainer} >

                <FormLabel> Enter passphrase to recover </FormLabel>
                <FormInput />
                <View style={styles.btnContainer} >
                  <Button
                    title='Restore'
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
        marginTop: 25
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },
})



export default RecoverWallet;
