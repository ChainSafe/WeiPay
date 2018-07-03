import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import CoinList from '../../Components/CoinList';

/**
 * Screen used to aquire the tokens/coins that the user wants to use
 * in their portfolio
 */
class EnableTokens extends Component {
    state = {
        tokenList: this.props.tokenList,
        changeState: true
    }

    /**
     * Sets the screen title to "Enable Tokens Page"
     */
    static navigationOptions = {
        title: "Enable Tokens Page",
        headerLeft: null
    };

    /**
     * Method used to navigate to the main portfolio Screen
     */
    navigate = () => {
        const navigateToPassphrase = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
        });
        this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Main Component
     * Contains the CoinList Component and button.
     * Where the button is simply acting as navigating button (going from one screen to another)
     * which stays disabled until at least one coin/token has been selected.
     */
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CoinList />
                <View style={styles.btnContainer} >
                    <Button
                        disabled={this.props.tokenList.length === 0}
                        title='Add'
                        icon={{ size: 28 }}
                        buttonStyle={{
                            backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                            height: 50, padding: 10, alignItems: 'center', justifyContent: 'center'
                        }}
                        textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
                        onPress={() => this.props.navigation.navigate('Drawer')}
                    />
                </View>
            </View>
        );
    }
}

/**
 * Styles used in the EnableTokens screen
 */
const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        height: 80,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: "center"
    }
})

/**
 * Reterives the list of tokens that have been selected by the user.
 * Method returns an object which contains the token list
 * @param {Object} state 
 */
const mapStateToProps = state => {
    return {
        tokenList: state.newWallet.tokens,
    }
};

export default connect(mapStateToProps)(EnableTokens);
