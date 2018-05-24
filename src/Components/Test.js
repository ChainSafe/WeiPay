import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import RadioGroup from 'react-native-radio-buttons-group';

class Test extends Component {
    // state = {
    //     data: [
    //         {
    //             label: 'USD',
    //             size: 25,
    //         },
    //         {
    //             label: 'Default value is same as label',
    //         },
    //         {
    //             label: 'Value is different',
    //             value: "I'm not same as label",
    //         },
    //         {
    //             label: 'Color',
    //             color: 'green',
    //         },
    //         {
    //             disabled: true,
    //             label: 'Disabled',
    //         },
    //         {
    //             label: 'Size',
    //             size: 32,
    //         },
    //     ],
    // };
    state = {
        data: this.props.currency
    };

    // update state
    onPress = data => this.setState({ data });

    render() {
        let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.valueText}>
                        Value = {selectedButton}
                    </Text>
                    <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        fontSize: 18,
        marginBottom: 50,
    },
});


const mapStateToProps = state => {
  return {
    currency: state.currency
  }
}


export default connect(mapStateToProps, null)(Test);
//export default Test;
