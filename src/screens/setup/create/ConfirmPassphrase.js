import React, { Component } from "react";
import { View, Button, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image, Dimensions, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Input } from '../../../components/common/Input';
import { CardSection } from '../../../components/common/CardSection';
var shuffle = require('shuffle-array'); //to randomize order

/**
 * Initial setup screen that prompts the user to re-enter the passphrase(mnemonic) using the
 * tags. 
 * This screen is only displayed in the process of creating a new wallet
 */
class ConfirmPassphrase extends Component {

    /**
     * Sets the local state to keep track of the tags which are selected and
     * unselected 
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: [],
            scrambledTags: []
        }
    }

    /**
     * Sets the screen title to "Confirm Passphrase"
     */
    static navigationOptions = {
        title: "Confirm Passphrase"
    };

    /**
     * LifeCycle Method
     * This method is executed after the component has been rendered.
     * This method add each word of the mnemonic to the local state variable object
     */
    componentDidMount() {
        const state = this.state;
        const words = this.props.mnemonic.split(' ');
        var orderArray = [];
        for (let i = 0; i < words.length; i++) {
            orderArray.push({ "word": words[i], "index": i });
        }
        shuffle(orderArray);
        for (let i = 0; i < words.length; i++) {
            state.scrambledTags.push(orderArray[i]);
        }
        this.setState(state)
    }

    /**
     * Method is used to navigate to the "enableTokens" screen.
     */
    navigate = () => {
        const navigateToEnableTokens = NavigationActions.navigate({
            routeName: "enableTokens",
        });
        this.props.navigation.dispatch(navigateToEnableTokens);
    };

    /**
     * This method is used to when a tag has been selected from either the tag box or the input
     * box and the tag is transfered either to the state.selectedTags list or to the state.scrambledTags list.
     *  
     * @param {String} tagItem 
     * @param {String} action 
     * @param {Number} x 
     */
    addTag(tagItem, action, x) {
        const state = this.state;
        if (action == "init") {
            console.log("in action init");
            this.swapTag(tagItem, "selectedTags", x);
        } else if (action == "revert") {
            this.swapTag(tagItem, "scrambledTags", x);
        } else {
            console.log("problems in the add");
        }
    }

    /* Pass in index and remove it out of whatever state -> just removed an item from any state, pass in state and index */
    /**
     * Helper method for the addTag method
     * This method goes through the logic of transfering the selected tag to the "currentStateVariable"
     * list.
     * "currentStateVariable"  = "scrambledTags" | "selectedTags"
     * @param {String} tagItem 
     * @param {String} currentStateVariable 
     * @param {Number} currenIndex 
     */
    swapTag(tagItem, currentStateVariable, currenIndex) {
        const state = this.state;
        if (currentStateVariable == "scrambledTags") {
            console.log("in swap tag function in the scrambled tags statement");
            state.scrambledTags.push(tagItem);
            state.selectedTags.splice(currenIndex, 1);
            this.setState(state)
        } else if (currentStateVariable == "selectedTags") {
            console.log("in swap tag function in the selected tags statement");
            state.selectedTags.push(tagItem);
            state.scrambledTags.splice(currenIndex, 1);
            this.setState(state)
        } else {
            console.log("problems in the swap");
        }
        console.log(state);
    }

    /**
     * This method is used to check if the order of the tags in the input
     * box match with the order of the passphrase list
     */
    validatePassphrase = () => {
        this.navigate();
        // const { scrambledTags, selectedTags } = this.state;
        // var passphraseIncomplete = true;
        // var count = 0;

        // //check if all the tags have been selected
        // if (scrambledTags.length == 0) {
        //     console.log("all selected");
        //     for (var i = 0; i < selectedTags.length; i++) {
        //         //need to use i as the selected order and compare to index of the word to check if they are equal
        //         if (selectedTags[i].index == i) {
        //             count++;
        //             passphraseIncomplete = false;
        //         }
        //     }
        //     if (count == selectedTags.length) {
        //         this.navigate();
        //     } else {
        //         Alert.alert(
        //             'Passphrase Error',
        //             'You did not enter the right passphrase in the correct order. Please try again.',
        //             [
        //                 { text: 'OK', onPress: () => console.log('OK Pressed') },
        //             ],
        //             { cancelable: false }
        //         )
        //     }
        // } else {
        //     Alert.alert(
        //         'Passphrase Error',
        //         'You must select all words.',
        //         [
        //             { text: 'OK', onPress: () => console.log('OK Pressed') },
        //         ],
        //         { cancelable: false }
        //     )
        // }
        // console.log(this.state);
    }

    /**
     * Returns the screen required for the user to go about selecting the tags
     * in the correct order
     */
    render() {
        const { selectedTags, scrambledTags } = this.state;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >
                    <View style={styles.content} >
                        <CardSection>
                            <Text style={styles.headerText} >Please assemble your passphrase in the correct order </Text>
                        </CardSection>
                        <CardSection>
                            <View style={styles.tagContainer} >
                                {
                                    selectedTags.map((item, index) => {
                                        return <Button
                                            style={styles.tag}
                                            title={item.word}
                                            key={item.index}
                                            onPress={() => this.addTag(item, "revert", index)} />
                                    })
                                }
                            </View>
                        </CardSection>
                        <CardSection>
                            <View style={styles.tagContainer} >
                                {
                                    scrambledTags.map((item, index) => {
                                        return <Button title={item.word} key={item.index} onPress={() => this.addTag(item, "init", index)} />
                                    })
                                }
                            </View>
                        </CardSection>
                    </View>
                    <View style={styles.btnContainer} >
                        <TouchableOpacity style={styles.btn} onPress={this.validatePassphrase}>
                            <Text style={styles.btnText}> Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

/**
 * Styles used the "ConfirmPassphrase" screen
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2
    },
    tag: {
        margin: 2,
        width: Dimensions.get('window').width / 3 - 15,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: 'white',
        borderColor: '#2a2a2a',
        borderWidth: 2,
        borderRadius: 10,
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 5.5
    },
    btnText: {
        color: '#2a2a2a',
        fontSize: 20
    },
    content: {
        width: 350
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
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

/**
 * Reterives the mnemonic passphrase of the wallet that was created
 * and returns an object containing that information
 * @param {Object} param0 
 */
const mapStateToProps = ({ newWallet }) => {
    const mnemonic = newWallet.wallet.mnemonic;
    return { mnemonic }
}

export default connect(mapStateToProps, null)(ConfirmPassphrase)
