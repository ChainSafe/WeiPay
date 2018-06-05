import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { Input } from './common/Input';
import { CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import *  as actions from '../Actions/actionCreator.js';


class AddContactListItem extends Component {


    renderAddress(address, coinName) {
        var check = this.props.coin.title
        console.log("From AddContactListItem: " + coinName);

        var coinAddress = {}
        coinAddress[coinName] = address
        this.props.addingContact(coinAddress)
    }

    render() {
        const { coin } = this.props;

        return (
            <View style={styles.componentStyle}>
                <CardSection>

                    <View style={styles.section}>
                        <Text style={styles.title}>{coin.title} 's Address</Text>
                        <Card
                        >
                            <TextInput placeholder="Enter or Paste Address here"
                                onChangeText={(text) => this.renderAddress(text, coin.title)}
                            />
                        </Card>
                    </View>
                </CardSection>

            </ View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 13,
        color: "black",
        textShadowRadius: 3
    },

    section: {
        flex: 1,
        flexDirection: 'column'
    },

    componentStyle: {
        paddingTop: 3,
        paddingLeft: 2,
        paddingRight: 2
    }
});



const mapStateToProps = state => {
    return {
        contacts: state.contacts.contacts
    }
};

export default connect(mapStateToProps, { addingContact: actions.addingContact })(AddContactListItem)
//export default AddContactListItem;