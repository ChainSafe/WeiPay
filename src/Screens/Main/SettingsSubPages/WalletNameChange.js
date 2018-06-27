import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, List, ListItem, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


/**
 * Screen is used to the change the name of the wallet
 */
class WalletNameChange extends Component {

    /**
     * Sets the screen title to "Change Wallet Name"
     */
    static navigationOptions = {
        title: "Change Wallet Name"
    };

    /**
     * Sets the local state variable to keep track of the name
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            nameChange: "",
        }
    }

    /**
     * Updates the local state with the text that was entered into the 
     * input field
     * @param {String} nameInput 
     */
    renderNameChange(nameInput) {
        var add = nameInput.trim();
        this.setState({ nameChange: add });
        console.log(add)
    }

    /**
     * Empty method
     */
    navigate = () => {
        // const navigateToPassphrase = NavigationActions.navigate({
        //     routeName: "generatePassphrase",
        //     params: { name: "Shubhnik" }
        // });
        // this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Returns a form , which the user can use to change the name of the 
     * wallet
     */
    render() {

        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >
                    <View style={styles.form} >
                        <FormLabel>Wallet name </FormLabel>
                        <FormInput
                            onChangeText={this.renderNameChange.bind(this)}
                            placeholder={"Wallet name"}
                        />
                    </View>
                    <View style={styles.btnContainer} >
                        <Button
                            disabled={this.state.nameChange === ""}
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

/**
 * Styles used in the "WalletNameChange" screen
 */
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
        paddingTop: 15,
        paddingBottom: 15
    }
})



export default WalletNameChange;
