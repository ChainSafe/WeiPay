import React, { Component } from "react";
import { View, Button, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Input } from '../../Components/common/Input';
import { CardSection } from '../../Components/common/CardSection';
var shuffle = require('shuffle-array'); //to randomize order

class ConfirmPassphrase extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTags: [],
            scrambledTags: []
        }
    }

    componentDidMount() {

        const state = this.state;
        const words = this.props.mnemonic.split(' ');
        var orderArray = [];

        for (var i = 0; i < words.length; i++) {
            orderArray.push({ "word": words[i], "index": i });
        }

        console.log(shuffle(orderArray));

        for (var i = 0; i < words.length; i++) {
            state.scrambledTags.push(orderArray[i]);
        }

        this.setState(state)
        console.log(state);
    }


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

    addTag(tagItem, action, x) {

        console.log("unique index is : " + x);
        const state = this.state;
        console.log(action + " " + tagItem.index);

        if (action == "init") {
            console.log("in action init");
            this.swapTag(tagItem, "selectedTags", x);
        } else if (action == "revert") {
            this.swapTag(tagItem, "scrambledTags", x);
        } else {
            console.log("fuck in the add");
        }
    }

    /* Pass in index and remove it out of whatever state -> just removed an item from any state, pass in state and index */
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
            console.log("fuck in the swap");
        }
        console.log(state);
    }


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
                                        return <Button style={styles.tag} title={item.word} key={item.index} onPress={() => this.addTag(item, "revert", index)} />
                                    })
                                }
                            </View>
                        </CardSection>

                        <View style={styles.tagContainer} >
                            {
                                scrambledTags.map((item, index) => {
                                    return <Button title={item.word} key={item.index} onPress={() => this.addTag(item, "init", index)} />
                                })
                            }
                        </View>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25
    },
    tagContainer: {
        // backgroundColor: 'red',
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
        backgroundColor: '#ADD1C7'
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

const mapStateToProps = ({ newWallet }) => {
    console.log("---");
    const mnemonic = newWallet.wallet.mnemonic;
    return { mnemonic }
}

//export default ConfirmPassphrase;
export default connect(mapStateToProps, null)(ConfirmPassphrase)