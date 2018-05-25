import React, { Component } from "react";
import { View, Button, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Input } from '../../Components/common/Input';
import { CardSection } from '../../Components/common/CardSection';
var shuffle = require('shuffle-array'); //to randomize order

var chosenTags = [];

class ConfirmPassphrase extends Component {

    constructor(props) {
        super(props);
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



    placeTag(tagItem) {
        chosenTags.push(tagItem);
        console.log(tagItem);
        this.displayNewTags();
    }

    displayNewTags() {
        console.log(chosenTags.length);

        var x = [];
        x.push(chosenTags.map(n =>
            <TouchableOpacity
                key={n.index}
                onPress={() => this.placeTag(this)}
                style={styles.tag}
            >
                <Text> {n.word} </Text>
            </TouchableOpacity>
        ))
        return x
    }

    generateMnemonic = () => {
        const words = this.props.mnemonic.split(' ');
        const mnemonicLength = words.length; //just to bed safe
        var wordsObjArray = [], scrambledArray = [];

        for (var i = 0; i < mnemonicLength; i++) {
            var obj = { "word": words[i], "index": i }
            wordsObjArray.push(obj);
        }

        console.log(shuffle(wordsObjArray));
        let ar = [];
        ar.push(wordsObjArray.map(n =>
            <TouchableOpacity
                key={n.index}
                onPress={() => this.placeTag(this)}
                style={styles.tag}
            >
                <Text> {n.word} </Text>
            </TouchableOpacity>
        ))
        return ar
    }

    render() {

        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer} >

                    <View style={styles.content} >
                        <CardSection>
                            <Text style={styles.headerText} >Please assemble your passphrase in the correct order </Text>
                        </CardSection>

                        <CardSection>
                            {/* {this.displayNewTags()} */}
                        </CardSection>

                        <View style={styles.tagContainer} >
                            {this.generateMnemonic()}
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
        backgroundColor: 'red',
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

const mapStateToProps = ({ newWallet }) => {
    console.log("---");
    const mnemonic = newWallet.wallet.mnemonic;
    return { mnemonic }
}

//export default ConfirmPassphrase;
export default connect(mapStateToProps, null)(ConfirmPassphrase)