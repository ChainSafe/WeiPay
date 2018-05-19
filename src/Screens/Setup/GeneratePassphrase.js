import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Terms } from './terms';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Input } from '../../Components/common/Input';
import { CardSection } from '../../Components/common/CardSection';

class GeneratePassphrase extends Component {
    static navigationOptions = {
        title: "Generate Passphrase"
    };

    navigate = () => {
        const navigateToEnableTokens = NavigationActions.navigate({
            routeName: "enableTokens",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateToEnableTokens);
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >

                    <View style={styles.content} >
                        <CardSection>
                            <Text style={styles.headerText} >Please save this passphrase as you will need it to recover your crypto. </Text>
                        </CardSection>
                        <CardSection>
                            <Text style={styles.passphrase}>Cat Hat Trap That Passphrase Hockey Game Johnny Crypto Car Rat play </Text>
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



export default GeneratePassphrase;
