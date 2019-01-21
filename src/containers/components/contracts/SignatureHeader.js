import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'

class SignatureHeader extends Component {
	render() {
		const { item, signature, processFunctionCall } = this.props;
		return (
			<View>
				<Text> {signature} </Text>
				<ClearButton
					buttonText={`Call ${item.property}`}
					onClickFunction={() => processFunctionCall(item)}
					customStyles={styles.btn}
				/>
			</ View>
		);
	}
}

const styles = StyleSheet.create({
	btn: {
		height: Dimensions.get('window').height * 0.05,
		width: Dimensions.get('window').width * 0.82,
	}
});

export default SignatureHeader;
