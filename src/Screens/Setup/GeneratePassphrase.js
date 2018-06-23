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
        title: "Generate Passphrase",
        headerLeft: null
    };

    navigate = () => {
        const navigateToEnableTokens = NavigationActions.navigate({
            routeName: "confirmPassphrase",
            params: { wallet: this.props.navigation.state.wallet }
        });
        this.props.navigation.dispatch(navigateToEnableTokens);
    };

    render() {
        const { walletInfo } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >

                    <View style={styles.content} >

                        <CardSection>
                            <Text style={styles.walletName} >Wallet Name: {walletInfo.walletName}</Text>
                        </CardSection>
                        <CardSection>
                            <Text style={styles.headerText} >Please save this passphrase as you will need it to recover your crypto.</Text>
                        </CardSection>
                        <CardSection>
                            <Text style={styles.passphrase}>{walletInfo.wallet.mnemonic}</Text>
                        </CardSection>
                    </View>

                    <View style={styles.btnContainer} >
                        <Button
                            title='Next'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'white', borderColor: '#2a2a2a', borderWidth: 2, borderRadius: 10,
                                width: 300, height: 50, padding: 10, alignItems: 'center',
                                justifyContent: 'center', marginBottom: 30, marginTop: 5.5
                            }}
                            textStyle={{ textAlign: 'center', color: '#2a2a2a' }}
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
        width: 350,
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },
    walletName: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 15,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 20
    },
    passphrase: {
        padding: 15
    }
})

const mapStateToProps = ({ newWallet }) => {
    return { walletInfo: newWallet }
}

export default connect(mapStateToProps, null)(GeneratePassphrase)
