import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import CardSection from './common/CardSection';
import Card from './common/Card';
import { Input } from './common/Input';
import { CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import *  as actions from '../Actions/actionCreator';


class AddContactListItem extends Component {

    constructor() {
        super()
        this.state = {
            addressInput: "",
            value: "",

        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('NEXT PROPS!!!!', nextProps)
        if (nextProps.clearInput) {
          this.setState({ value: "" })
        }
    }



    renderAddress(address, coinName) {

        var check = this.props.coin.title
        // console.log("From AddContactListItem: " + coinName);
        this.setState({value: address})
        var coinAddress = {}
        coinAddress[coinName] = address
        if (!(Object.keys(this.props.current).length === 0)) {
            // console.log("This is from AddContactListItem: ");
            this.setState({ addressInput: address })
            this.props.addingContact(coinAddress)
        } else {
            this.setState({ addressInput: "" })
        }

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
                      ref={ref => this.state.addressInput = ref}
                      value={this.state.value}
                    />
                  </Card>
                </View>
              </CardSection>

            </View>
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
        current: state.contacts.currentContact,
        contacts: state.contacts.contacts,
        clearInput: state.contacts.clearInput
    }
};

export default connect(mapStateToProps, { addingContact: actions.addingContact })(AddContactListItem)
//export default AddContactListItem;
