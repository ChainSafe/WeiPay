import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	SafeAreaView,
	TouchableWithoutFeedback,
	Dimensions,
	Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import * as actions from '../../../../store/actions/ActionCreator';
import * as configActions from '../../../../store/actions/creators/AppConfig';
import LinearButton from '../../../../components/linearGradient/LinearButton';
import ClearButton from '../../../../components/linearGradient/ClearButton';
import BoxShadowCard from '../../../../components/shadowCards/BoxShadowCard';
import getNetworkProvider from '../../../../../constants/Providers';
import MaliciousAddresses from '../../../../../constants/data/json/addresses_darklist.json';
import executeEtherTransaction from '../../../../../scripts/tokens/transactions/transactionsEther';
import executeERC20Transaction from '../../../../../scripts/tokens/transactions/transactionsERC20';

const ethers = require('ethers');
const img = require('../../../../../assets/icons/barcode2.png');

const utils = ethers.utils;

class CoinSend extends Component {
	constructor(props) {
		super(props);
		let validAddress = new RegExp('0x[0-9a-fA-F]{40}');
		let valid = false;
		if (validAddress.exec(this.props.gloablPublicAddress) != null) {
			valid = true;
		}
		this.state = {
			toAddress: this.props.gloablPublicAddress,
			// value: null,
			// better name
			inputAmount: '',
			txnFee: '',
			maliciousComment: '',

			isAddressValid: valid,
		};
	}

	navigate = () => {
		this.props.setQrInvoker("TokenFunctionality");
		const navigateToQRScanner = NavigationActions.navigate({
			routeName: 'QCodeScanner',
			params: { invoker: 'CoinSend' },
		});
		this.props.navigation.dispatch(navigateToQRScanner);
	};

	renderAddress(addressInput) {
		let trimmed = addressInput.trim();
		this.setState({ toAddress: trimmed });

		// avoiding dispatches 
		// this.props.setGlobalAddress(trimmed);

		let validAddress = new RegExp('0x[0-9a-fA-F]{40}');
		if (validAddress.exec(addressInput) === null) {
			this.setState({ isAddressValid: false });
		} else {
			this.setState({ isAddressValid: true });
		}
	}

	// direct onchange method
	renderAmount(amount) {
		if (!isNaN(amount) || amount === '.') {
			// if (amount < 0) {
			//   Alert.alert(
			//     'Invalid Ether Amount',
			//     'Please enter an amount greater than 0.',
			//     [
			//       { text: 'OK', onPress: () => { return console.log('OK Pressed');} },
			//     ],
			//     { cancelable: false },
			//   );
			// } else {
			//   this.setState({ inputAmount: amount });
			// }
			this.setState({ inputAmount: amount });
		}
	}

	getTxnFee = async (provider) => {
		// let provider = await getNetworkProvider(this.props.network);
		try {
			// structured code
			// let gasPriceString = 
			await provider.getGasPrice().then((gasPrice) => {
				gasPriceString = gasPrice.toString();
				let gasPriceEth = utils.formatEther(gasPrice);
				let txnFee = 21000 * gasPriceEth;
				let formattedFee = txnFee.toFixed(8);
				this.setState({ txnFee: formattedFee });
				return formattedFee;
			});

		} catch (error) {
			// necessary error checks
			console.log(error);
			return null;

		}
	}

	resetFields = () => {
		// this.props.setGlobalAddress('');
		// not using actions
		this.setState({ maliciousComment: '', inputAmount: '', toAddress: '' });
	}

	checkMaliciousAddresses = (address) => {
		for (let i = 0; i < MaliciousAddresses.length; i++) {
			if (address === MaliciousAddresses[i].address) {
				this.setState({ maliciousComment: MaliciousAddresses[i].comment });
				// return { flag: true, 'address' : MaliciousAddresses[i].address, 'comment' : MaliciousAddresses[i].comment };
				return { flag: true };
			}
		}
		return { flag: false };
	}

	processTX = async () => {
		// one provider call
		let provider = await getNetworkProvider(this.props.network);
		this.getTxnFee(provider);
		const validAddress = this.state.isAddressValid;
		const { flag } = this.checkMaliciousAddresses(this.state.toAddress);

		const isEtherTX = this.props.activeTokenData.address === '';

		if (validAddress && !flag) {
			// const provider = await getNetworkProvider(this.props.network);
			let txResponse;
			if (isEtherTX) {

				txResponse = await executeEtherTransaction(
					provider,
					this.state.toAddress,
					this.props.wallet.privateKey,
					this.state.inputAmount,
				);
			} else {
				txResponse = await executeERC20Transaction(
					provider,
					this.state.toAddress,
					this.props.wallet.privateKey,
					this.state.inputAmount,
					this.props.activeTokenData.address,
					this.props.activeTokenData.decimals,
				);
			}
			// if (Object.prototype.hasOwnProperty.call(txResponse, 'hash')) {
			// script is blocked if non existent hash field is checked on fail
			if (txResponse && txResponse.hash) {
				Toast.show('Success, check etherscan', Toast.LONG);
				this.resetFields();
			}
			else {
				Toast.show('Fail', Toast.LONG);
				console.log("fail");
			}
		} else {
			console.log('bad');
		}
	}

	render() {
		const {
			isAddressValid, maliciousComment, inputAmount, toAddress, txnFee
		} = this.state;
		return (
			<SafeAreaView style={styles.safeAreaView}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.mainContainer}>
						<View style={styles.boxShadowContainer}>
							<View style={styles.contentContainer}>
								<BoxShadowCard>
									<Text style={styles.cardText}>
										Send Ether by scanning someone's QR code or public address.
                  </Text>
									<View style={styles.barcodeImageContainer}>
										<TouchableOpacity
											onPress={() => { return this.navigate(); }} >
											<Image
												source={img}
												style={styles.barcodeImage}
											/>
										</TouchableOpacity>
									</View>
									<View style={styles.inputContainer}>
										{
											// simpler 
											maliciousComment
												? <Text style={styles.maliciousCommentText}>Malicious - {maliciousComment} </Text>
												: null
										}
										<View style={styles.formInputContainer}>
											<FormInput
												placeholder={'Public Address'}
												onChangeText={(text) => this.renderAddress(text)}
												inputStyle={[styles.formAddress, isAddressValid ? styles.colorValid : styles.colorError]}
												value={toAddress}
												selectionColor={'#12c1a2'}
											/>
										</View>
										<View style={styles.formInputContainer}>
											<FormInput
												placeholder={'Amount'}
												onChangeText={(text) => this.renderAmount(text)}
												inputStyle={styles.formAmount}
												value={inputAmount}
												selectionColor={'#12c1a2'}
											/>
										</View>
										{
											!isAddressValid || !inputAmount
												? null
												: <Text style={styles.displayFeeText}> {txnFee} </Text>
										}
									</View>
								</BoxShadowCard>
							</View>
						</View>
						<View style={styles.btnContainer}>
							<View style={styles.btnRow}>
								<View style={styles.btnFlex}>
									<ClearButton
										onClickFunction={this.resetFields}
										buttonText="Reset"
										customStyles={styles.btnReset}
									/>
								</View>
								<View style={styles.btnFlex}>
									<LinearButton
										onClickFunction={this.processTX}
										buttonText="Send"
										customStyles={styles.btnSend}
										buttonStateEnabled={!isAddressValid || !inputAmount}
									/>
								</View>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		);
	}
}

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
	boxShadowContainer: {
		alignItems: 'center',
		marginTop: '10%',
		flex: 3.75,
		width: '100%',
	},
	contentContainer: {
		width: '82%',
		flex: 1,
	},
	cardText: {
		paddingBottom: '5%',
		paddingTop: '10%',
		paddingLeft: '10%',
		paddingRight: '10%',
		fontFamily: 'WorkSans-Light',
		fontSize: RF(2.4),
		color: '#000000',
		letterSpacing: 0.4,
	},
	barcodeImageContainer: {
		paddingTop: '5%',
		paddingBottom: '5%',
		paddingLeft: '10%',
	},
	barcodeImage: {
		height: Dimensions.get('window').height * 0.1,
		width: Dimensions.get('window').width * 0.18,
	},
	maliciousCommentText: {
		color: 'red',
		fontSize: RF(2.1),
		marginLeft: '11%',
	},
	formInputContainer: {
		marginLeft: '4.5%',
	},
	formAddress: {
		width: '90%',
		fontSize: RF(2.2),
		color: '#12c1a2',
		flexWrap: 'wrap',
		fontFamily: 'WorkSans-Light',
		letterSpacing: 0.4,
		paddingBottom: '3%',
	},
	colorValid: {
		color: 'green',
	},
	colorError: {
		color: 'red',
	},
	formAmount: {
		width: '90%',
		fontSize: RF(2.2),
		color: 'black',
		flexWrap: 'wrap',
		fontFamily: 'WorkSans-Light',
		letterSpacing: 0.4,
	},
	displayFeeText: {
		width: '90%',
		marginLeft: '10.5%',
		fontSize: RF(1.6),
		letterSpacing: 0.3,
		fontFamily: 'WorkSans-Light',
		marginTop: '5%',
	},
	btnContainer: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
		width: '82%',
		alignContent: 'center',
		marginLeft: '9%',
		marginRight: '9%',
	},
	btnRow: {
		flexDirection: 'row',
	},
	btnFlex: {
		flex: 1,
	},
	btnReset: {
		marginLeft: '0%',
		marginRight: '1.75%',
		height: Dimensions.get('window').height * 0.082,
	},
	btnSend: {
		marginLeft: '1.75%',
		height: Dimensions.get('window').height * 0.082,
	},
});

const mapStateToProps = ({
	Wallet, HotWallet
}) => {
	const { gloablPublicAddress, activeTokenData, network } = Wallet;
	const { wallet } = HotWallet.hotWallet;
	return {
		wallet,
		gloablPublicAddress,
		activeTokenData,
		// txnFee: newWallet.txnFee,
		// contactAddress: contacts.contactDataforCoinSend,
		network,
	};
};

export default connect(mapStateToProps, { ...actions, ...configActions })(CoinSend);
