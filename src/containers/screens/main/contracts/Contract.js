import React, { Component } from 'react';
import {
	Picker, View, Text, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView, TextInput,
} from 'react-native';
import { FormInput, Card } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import RF from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import {
	processContractByAddress, processFunctionCall2,
} from '../../../../scripts/contracts/contractHelper';
import {
	checkInputs, checkPayable
} from '../../../../scripts/contracts/contractValidation';
import LinearButton from '../../../components/linearGradient/LinearButton';
import ClearButton from '../../../components/linearGradient/ClearButton';

import getNetworkProvider from '../../../../constants/Providers';
// import ContractInputContainer from '../../../components/contracts/ContractInputContainer';
// import ContractInputConstant from '../../../components/contracts/ContractInputConstant';
import { setNetwork } from '../../../store/actions/creators/AppConfig';

/**
 * Screen is used to display the passphrase (mnemonic) of the wallet
 */
class Contract extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// contractLoaded: false,
			provider: null,
			address: '',
			// wallet: this.props.hotWallet.wallet,
			// contractEvents: null,
			contractFunctions: null,
			contract: null,
			withInputs: null,
			functionsWithInputs: null,
			payable: null,
			// functions: [],
			currentInput: {},
		};
	}

	componentDidMount = async () => {
		const provider = await getNetworkProvider(this.props.network);
		this.setState({ provider });
	}

	getContract = async () => {
		// error handling  
		const { success, objects } = await processContractByAddress(this.props.hotWallet.wallet,
			this.state.address, this.state.provider, this.props.network);
		if (success) {
			// unused contract events
			const { contractFunctions, contract, functionsWithInputs } = objects;
			// console.log("in getContract success", contractFunctions, contract, withInputs);
			this.setState({ contractFunctions, contract, functionsWithInputs });
			Toast.show('Success', Toast.LONG);
		}
		else {
			// error in getting contract
			Toast.show('Error loading contract', Toast.LONG);
			console.log("in getContract error from contract");
		}
	}

	processFunctionInput = (text, inputName, inputType, funcName) => {
		let currentInput = this.state.currentInput;

		if (!currentInput[funcName]) {
			currentInput[funcName] = {};
		}

		if (inputType === "string") {
			currentInput[funcName][inputName] = "'" + text + "'";
		} else {
			currentInput[funcName][inputName] = text;
		}
		console.log("in input: ", currentInput);
		this.setState({ currentInput });
	}

  /**
   * Need to check if contract method has no parameters, if it has paramaters, if is payable.
   */
	contractFuncCheck = async (functionItem) => {
		console.log("function check functionItem", functionItem);

		const isFunctionPayable = functionItem.payable;
		const hasFunctionParameters = functionItem.inputs ? functionItem.inputs.names.length > 0 : false;

		let inputs = this.state.currentInput[functionItem.name];


		if (!isFunctionPayable && !hasFunctionParameters) {
			const result = await processFunctionCall2(this.props.hotWallet.wallet,
				functionItem, {}, this.state.contract, this.state.provider);

			// better suited
			if (result.success) {
				if (typeof result.data === "object") result.data = JSON.stringify(result.data);
				Toast.show('Success,result - \n' + result.data, Toast.LONG);
				console.log(result.data);
			}
			else {
				Toast.show('Failed - \n' + result.msg, Toast.LONG);
				console.log(result.msg);
			}
		} else if (!isFunctionPayable && hasFunctionParameters) {
			if (checkInputs(functionItem, inputs)) {

				const result = await processFunctionCall2(this.props.hotWallet.wallet,
					functionItem, inputs, this.state.contract, this.state.provider);

				// better suited
				if (result.success) {
					if (typeof result.data === "object") result.data = JSON.stringify(result.data);
					Toast.show('Success,result - \n' + result.data, Toast.LONG);
					console.log(result.data);
				}
				else {
					Toast.show('Failed - \n' + result.msg, Toast.LONG);
					console.log(result.msg);
				}
			}
			else {
				Toast.show('Please provide all inputs', Toast.LONG);
			}
		} else if (isFunctionPayable && !hasFunctionParameters) {
			if (checkPayable(inputs)) {
				const result = await processFunctionCall2(this.props.hotWallet.wallet,
					functionItem, {}, this.state.contract, this.state.provider);

				// better suited
				if (result.success) {
					if (typeof result.data === "object") result.data = JSON.stringify(result.data);
					Toast.show('Success,result - \n' + result.data, Toast.LONG);
					console.log(result.data);
				}
				else {
					Toast.show('Failed - \n' + result.msg, Toast.LONG);
					console.log(result.msg);
				}
			}
			else {
				Toast.show('Please provide all inputs', Toast.LONG);
			}
		} else if (isFunctionPayable && hasFunctionParameters) {
			if (checkInputs(functionItem, inputs) && checkPayable(inputs)) {
				const result = await processFunctionCall2(this.props.hotWallet.wallet,
					functionItem, inputs, this.state.contract, this.state.provider);

				if (result.success) {
					if (typeof result.data === "object") result.data = JSON.stringify(result.data);
					Toast.show('Success,result - \n' + result.data, Toast.LONG);
					console.log(result.data);
				}
				else {
					Toast.show('Failed - \n' + result.msg, Toast.LONG);
					console.log(result.msg);
				}
			}
			else {
				Toast.show('Please provide all inputs', Toast.LONG);
			}
		}
	}

	parseFunctions = () => {

		const allFunctionsWithInputs = this.state.functionsWithInputs;

		return (
			<View style={styles.contractInputContainer}>
				{
					allFunctionsWithInputs.map((item, i) =>
						<View key={i} style={styles.functionContainer} >
							<Card>
								<View style={styles.functionInputContainer}>
									{/* <Text>Signature: {item.functionSignature} </Text> */}
									<Text>Signature: {item.name} </Text>
								</View>
								{
									item.payable
										?
										<View style={styles.functionInputContainer}>
											<Text style={styles.textInput}> Ether value </Text>
											<FormInput
												// placeholder={this.state.payable ? this.state.payable.text : "Ether Value (Payable)"}
												placeholder={"Ether Value (Payable)"}
												onChangeText={(text) => this.processFunctionInput(text, 'payable', 'payable', item.name)}
												inputStyle={styles.functionInputStyle}
												selectionColor={'#12c1a2'}
											/>
										</View>
										: null
								}
								{
									(item.inputs && item.inputs.names && item.inputs.names.length)
										?
										item.inputs.names.map((name, i) =>
											<View style={styles.functionInputContainer} key={i}>
												<Text style={styles.textInput}> {name} </Text>
												<FormInput
													// placeholder={this.state.payable ? this.state.payable.text : "Ether Value (Payable)"}
													placeholder={item.inputs.types[i]}
													onChangeText={(text) => this.processFunctionInput(text, name, item.inputs.types[i], item.name)}
													inputStyle={styles.functionInputStyle}
													selectionColor={'#12c1a2'}
												/>
											</View>
										)
										:
										null
								}
								<ClearButton
									buttonText={`Call ${item.name}`}
									onClickFunction={() => this.contractFuncCheck(item)}
									customStyles={styles.btnFunctionInput}
								/>
							</Card>
						</View>)
				}
			</View>
		);
	}

  /**
   * Returns a component that allows the user to view the passphrase
   */
	render() {
		// console.log(this.props.network);
		return (
			<SafeAreaView style={styles.safeAreaView}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.mainContainer}>
						<View style={styles.navContainer}>
							<BackWithMenuNav
								showMenu={false}
								showBack={true}
								navigation={this.props.navigation}
							/>
						</View>
						{
							this.state.functionsWithInputs === null
								?
								<View style={styles.topFormInput}>
									<Text style={styles.textHeader}>Contract Interaction</Text>
									<Text style={styles.textDescription}>Load contract address</Text>
									<View style={styles.addressField}>
										<FormInput
											placeholder={'Contract Address'}
											onChangeText={(add) => { return this.setState({ address: add }); }}
											inputStyle={styles.inputContactName}
											placeholderTextColor={'#b3b3b3'}
											value={this.state.address}
										/>
										<Picker
											selectedValue={this.props.network}
											style={styles.picker}
											textStyle={styles.pickerItem}
											onValueChange={(itemValue) => this.props.setNetwork(itemValue)}>
											<Picker.Item label="mainnet" value="mainnet" />
											<Picker.Item label="ropsten" value="ropsten" />
											<Picker.Item label="kovan" value="kovan" />
											<Picker.Item label="rinkeby" value="rinkeby" />
										</Picker>
									</View>
								</View>
								:
								<View style={styles.scrollViewContainer} >
									<ScrollView style={styles.scrollView}>
										{this.parseFunctions()}
									</ScrollView>
								</View>
						}

						<View style={styles.btnContainer}>
							{
								this.state.contractFunctions === null
									?
									<LinearButton
										buttonText='Load Contract'
										onClickFunction={() => this.getContract(this)}
										customStyles={styles.loadButton}
									/>
									: <LinearButton
										buttonText='Reset Contract'
										onClickFunction={() => this.getContract(this)}
										customStyles={styles.loadButton}
									/>
							}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		);
	}
}

/**
 * Styles used in the BackupPhrase screen
 */
const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: '#f4f7f9',
	},
	mainContainer: {
		flex: 1,
		backgroundColor: '#f4f7f9',
		justifyContent: 'center',
		width: '100%',
	},
	navContainer: {
		flex: 0.75,
	},
	topFormInput: {
		flex: 5,
		paddingLeft: '5%',
		paddingRight: '5%',
		paddingTop: '5%',
	},
	textHeader: {
		fontFamily: 'Cairo-Light',
		fontSize: RF(4),
		letterSpacing: 0.8,
		paddingLeft: '9%',
		color: '#1a1f3e',
		paddingTop: '2.5%',
		marginBottom: '5%',
	},
	textDescription: {
		fontFamily: 'Cairo-Light',
		fontSize: RF(3),
		letterSpacing: 0.8,
		paddingLeft: '9%',
		color: '#1a1f3e',
	},
	addressField: {
		marginLeft: '5%',
		marginTop: '5%',
		width: '90%',
	},
	scrollViewContainer: {
		flex: 5,
		paddingBottom: '2.5%',
		paddingTop: '2.5%',
	},
	scrollView: {
		height: '100%',
	},
	contractInputContainer: {
		flex: 1,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: '90%',
	},
	functionContainer: {
		flex: 1,
		alignSelf: 'center',
		alignItems: 'stretch',
		justifyContent: 'space-around',
	},
	functionInputContainer: {
		marginBottom: '5%',
	},
	functionInputStyle: {
		maxWidth: '100%',
		fontSize: RF(2.4),
		flexWrap: 'wrap',
		color: '#12c1a2',
		letterSpacing: 0.4,
		fontFamily: 'WorkSans-Light',
		borderBottomWidth: 0.0001,
	},
	inputContactName: {
		fontSize: RF(2.4),
		flexWrap: 'wrap',
		color: '#12c1a2',
		letterSpacing: 0.4,
		fontFamily: 'WorkSans-Light',
		borderBottomWidth: 0.0001,
	},
	topInputContainer: {
		flex: 1,
	},
	btnFunctionInput: {
		height: Dimensions.get('window').height * 0.05,
		width: Dimensions.get('window').width * 0.82,
		marginLeft: "0%"
	},
	loadButton: {
		width: '82%',
		height: Dimensions.get('window').height * 0.082,
	},
	btnContainer: {
		width: '100%',
		flex: 0.9,
		marginTop: '2.5%',
	},
	button: {
		width: '82%',
		height: Dimensions.get('window').height * 0.082,
	},
	picker: {
		flexWrap: 'wrap',
		marginLeft: '5%',
		borderBottomWidth: 0.0001,
	},
	pickerItem: {
		fontFamily: 'WorkSans-Light',
		fontSize: RF(2.4),
	}
});

const mapStateToProps = ({ HotWallet, Wallet }) => {
	const { hotWallet } = HotWallet;
	const { network } = Wallet;
	return { hotWallet, network };
};

export default connect(mapStateToProps, { setNetwork })(Contract);
