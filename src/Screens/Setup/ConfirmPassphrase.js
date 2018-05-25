import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Input } from '../../Components/common/Input';
import { CardSection } from '../../Components/common/CardSection';

class ConfirmPassphrase extends Component {

    static navigationOptions = {
        title: "Confirm Passphrase"
    };

    navigate = () => {
        const navigateToEnableTokens = NavigationActions.navigate({
            routeName: "enableTokens",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateToEnableTokens);
    };

    render() {


        // const { params } = this.props.navigation.state;
        // console.log("----");
        // console.log(params.wallet.mnemonic);

        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >

                    <View style={styles.content} >
                        <CardSection>
                            <Text style={styles.headerText} >Please assemble your passphrase in the correct order </Text>
                        </CardSection>
                        <CardSection>
                            <Text style={styles.headerText} ></Text>
                        </CardSection>
                        <CardSection>
                            <Text style={styles.passphrase}></Text>
                        </CardSection>
                    </View>

                    <View style={styles.btnContainer} >
                        <Button
                            title='Next'
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
    content: {
        width: 350
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 20
    },
    passphrase: {
        padding: 20
    }
})


export default ConfirmPassphrase;
