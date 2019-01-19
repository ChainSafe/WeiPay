import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import ClearButton from '../linearGradient/ClearButton';

class ContractInputConstant extends Component {

	render() {
		const { item } = this.props;
		// console.log(result); t  
		return (
			<View style={styles.inputContainer}>
				<Text style={styles.text}>Constant Method Call</Text>
				<View style={styles.btnContainer}>
					<ClearButton
						buttonText={`Call ${item.name}`}
						onClickFunction={() => this.props.contractExecution(item)}
						customStyles={styles.btnFunctionInput}
					/>
				</View>
			</ View>
		);
	}
}

const styles = StyleSheet.create({
	callResult: {
		flex: 1,
	},
	inputContainer: {
		flex: 2,
	},
	text: {
		fontFamily: 'Cairo-Light',
		fontSize: RF(2.2),
		letterSpacing: 0.8,
		color: '#1a1f3e',
		marginLeft: "5%"
	},
	btnContainer: {
		// fixed broken UI
		// marginTop: '5%',
		marginLeft: '1%',
		flex: 1,
		// marginRight: '5%',
	},
	btnFunctionInput: {
		height: Dimensions.get('window').height * 0.05,
		width: Dimensions.get('window').width * 0.82,
	},
});

export default ContractInputConstant;
