import React, { Component } from 'react';
import {
	Text,
	Dimensions,
	View,
	StyleSheet,
} from 'react-native';
import ContractInput from './ContractInput';
import ClearButton from '../linearGradient/ClearButton';

class ContractInputContainer extends Component {
	render() {
		const { item } = this.props;

		return (
			<View>
				<View style={styles.inputContainer}>
					{
						item.inputs.names.map((inputName, i) =>
							<ContractInput
								key={i}
								inputName={inputName}
								inputType={item.inputs.types[i]}
								funcName={item.name}
								processContractInput={this.props.processInput}
							/>)
					}
				</View>
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
	inputContainer: {
		flex: 2,
	},
	btnContainer: {
		// fixed broken UI
		// marginTop: '5%',
		marginLeft: '1%',
		flex: 1,
		width: '100%',
		// marginRight: '5%',
	},
	btnFunctionInput: {
		height: Dimensions.get('window').height * 0.05,
		width: Dimensions.get('window').width * 0.82,
		marginLeft: '0%',
	},
});

export default ContractInputContainer;
