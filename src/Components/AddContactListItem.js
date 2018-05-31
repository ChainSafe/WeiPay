import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';


class AddContactListItem extends Component {

    render() {
        const { coin } = this.props;

        return (
            <Card
                style={[styles.check, coin.selected ? styles.valid : styles.invalid]}
            >
                <Text>{coin.title}</Text>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        paddingLeft: 15, alignItems: 'flex-start',
    },

    invalid: {
        // borderColor: 'red',
        alignItems: 'flex-start',
    },

    valid: {
        // borderColor: 'green',
        alignItems: 'flex-start',
    }
})



const mapStateToProps = state => {
    return {
        tokenList: state.newWallet.tokens,
    }
};

export default connect(mapStateToProps, null)(AddContactListItem)
