import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Terms } from './terms';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Input } from '../../Components/common/Input';
import { CardSection } from '../../Components/common/CardSection';

/**
 * Screen used to display the passphrase (mnemonic)
 */
class GeneratePassphrase extends Component {

    /**
     * Sets the title of the screen to be "Generate Passphrase"
     */
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
                    <View style={styles.form} >
                        <Text style={styles.walletName}>Wallet Name: {walletInfo.walletName}</Text>
                        <Text style={styles.passphraseHeading}> Passphrase </Text>
                        <CardSection>
                            <Text style={styles.passphrase}>{walletInfo.wallet.mnemonic}</Text>
                        </CardSection>

                        <View style={styles.btnContainer} >
                            <Button
                                // disabled={this.props.walletName === ""}
                                title='Next'
                                icon={{ size: 28 }}
                                buttonStyle={{
                                    backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                                    height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30
                                }}
                                textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
                                onPress={this.navigate}
                            />
                        </View>
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
        justifyContent: 'center',
        marginTop: -100
    },
    walletName: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 5,
    },
    passphraseHeading: {
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 10
    },
    passphrase: {
        padding: 15,
        fontSize: 18,
        fontWeight: '400',
        alignItems: 'center',
        width: 330,
    },
    formInput: {
        width: 300
    },
    form: {
        width: Dimensions.get('window').width - 10,
        alignItems: 'center'
    },
    btnContainer: {
        alignItems: 'center',
    },
})

const mapStateToProps = ({ newWallet }) => {
    return { walletInfo: newWallet }
}

export default connect(mapStateToProps, null)(GeneratePassphrase)
