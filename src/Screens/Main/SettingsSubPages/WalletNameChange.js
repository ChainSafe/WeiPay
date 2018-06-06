import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, List, ListItem, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';



class WalletNameChange extends Component {
    static navigationOptions = {
        title: "Change Wallet Name"
    };

    constructor(props) {
        super(props);
        this.state = {
            nameChange: "",
        }
    }


    renderNameChange(nameInput) {
        var add = nameInput.trim();
        this.setState({ nameChange: add });
        console.log(add)
    }

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
        marginTop: 25,
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },
    form: {
        width: Dimensions.get('window').width - 20,
        paddingTop: 15,
        paddingBottom: 15
    }
})



export default WalletNameChange;
