import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
import { addTokenToSetup } from '../Actions/actionCreator';

class ListItem extends Component {
    render() {
        const { coin } = this.props;
        const { title } = styles;
        //console.log(this.props);
        return (

            <Card>
                <CheckBox center
                    title={coin.title}
                    iconLeft
                    iconType='material'
                    checkedIcon='clear'
                    uncheckedIcon='add'
                    checkedColor='red'
                    style={title}
                    onPress={() => this.props.addTokenToSetup(coin.id)}

                />
            </Card>

        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        paddingLeft: 15
    }
})

export default connect(null, { addTokenToSetup })(ListItem)
