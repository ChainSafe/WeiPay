import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { Input } from './common/Input';
import { CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import addContactAction from '../Actions/actionCreator';


class AddContactListItem extends Component {

    render() {
        const { coin } = this.props;

        return (
            <View style={styles.componentStyle}>
                <CardSection>

                    <View style={styles.section}>
                        <Text style={styles.title}>{coin.title} 's Address</Text>
                        <Card
                        >
                            <TextInput placeholder="Enter or Paste Address here" />
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

export default connect(mapStateToProps, { addContactAction })(AddContactListItem)
//export default AddContactListItem;