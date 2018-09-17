import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import { CardSection } from '../common/CardSection';
import { Card } from '../common/Card';
import { Input } from '../common/Input';

/**
 * This component is not being used anywhere
 */
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
        flexDirection: 'column',
    },
    componentStyle: {
        paddingTop: 3,
        paddingLeft: 2,
        paddingRight: 2
    }
});

const mapStateToProps = state => {
    return {
        tokenList: state.newWallet.tokens,
    }
};

export default AddContactListItem;
