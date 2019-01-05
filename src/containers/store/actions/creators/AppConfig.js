
import * as actionType from '../types/AppConfig';
import axios from 'axios';
import {
	apiMultipleCurrencyBaseUrl, apiMulitpleResponseUrl,
} from '../../../../constants/Api';

export function enterDebug() {
	const testData = { 'walletName': 'My Test Wallet Name' };
	return (dispatch) => {
		dispatch({ type: actionType.DEBUG_MODE, payload: testData });
	};
}

export function setNetwork(network) {
	return (dispatch) => {
		dispatch({ type: actionType.SET_NETWORK, payload: network });
	};
}

/**
 * Initializes the app with the default token list
 */
export function initializeAppTokenState(initTokenData) {
	return (dispatch) => {
		dispatch({ type: actionType.INITIALIZE_APP_TOKEN_SETUP, payload: initTokenData });
	};
}

/**
 * Adds a single token to the app state
 */
export function addNewToken(tokenObject, usersTokens) {
	let tokenCopy = [...usersTokens];
	tokenCopy.push(tokenObject);
	// console.log(tokenCopy);
	return (dispatch) => {
		dispatch({ type: actionType.ADD_NEW_SINGLE_TOKEN, payload: tokenCopy });
	};
}

/**
 * Set temporary state wallet name until wallet is created/saved to async
 */
export function setTempWalletName(walletName) {
	return (dispatch) => {
		dispatch({ type: actionType.TEMP_WALLET_NAME, payload: walletName });
	};
}

export function setHotWallet(walletObj) {
	const { name, wallet } = walletObj;
	const pKey = wallet.address;
	return (dispatch) => {
		dispatch({ type: actionType.CONFIG_HOT_WALLET, payload: { 'wallet': wallet, 'publicKey': pKey, 'name': name } });
	};
}

/**
 * Initializes a wallet within the app.
 * If previosWalletState.length = 0 means its the users first wallet in the app.
 */
export function initializeAppWallet(currentWallet, walletName, previousWalletState) {
	let appWallets = [];
	if (previousWalletState.length > 0) {
		for (let i = 0; i < previousWalletState.length; i++) {
			let previousWallet = {};
			previousWallet.name = previousWalletState[i].name;
			previousWallet.hdWallet = previousWalletState[i].hdWallet;
			previousWallet.publicKey = previousWalletState[i].hdWallet.address;
			appWallets.push(previousWallet);
		}
	}
	let walletObject = {};
	walletObject.name = walletName;
	walletObject.hdWallet = currentWallet;
	walletObject.publicKey = currentWallet.address;
	appWallets.push(walletObject);
	return (dispatch) => {
		dispatch({ type: actionType.INITIALIZE_NEW_APP_WALLET, payload: appWallets });
	};
}

/**
 * This action is used to track if the user is in the setup screens.
 */
export function exitSetup(flag) {
	return (dispatch) => {
		dispatch({ type: actionType.EXIT_SETUP_SCREEN, payload: flag });
	};
}

/**
 * merging 2 dispatches into one
 * initializeAppWallet, exitSetup
 */
export function encryptSerializedWallet(hashedPassword) {
	return (dispatch) => {
		dispatch({ type: actionType.SET_APP_PASSWORD_ROOT, payload: hashedPassword });
	};
}

export function initWalletExitSetupEncryptWallet(currentWallet, walletName, previousWalletState, flag) {
	// initialize
	let appWallets = [];
	if (previousWalletState.length > 0) {
		for (let i = 0; i < previousWalletState.length; i++) {
			let previousWallet = {};
			previousWallet.name = previousWalletState[i].name;
			previousWallet.hdWallet = previousWalletState[i].hdWallet;
			previousWallet.publicKey = previousWalletState[i].hdWallet.address;
			appWallets.push(previousWallet);
		}
	}
	let walletObject = {};
	walletObject.name = walletName;
	walletObject.hdWallet = currentWallet;
	walletObject.publicKey = currentWallet.address;
	// currentWallet is the encrypted string, currentWallet.address always undefined
	appWallets.push(walletObject);

	return (dispatch) => {
		dispatch({
			type: actionType.INIT_WALLET_EXIT_SETUP_ENCRYPT_WALLET,
			payload: {
				appWallets,
				flag,
				hashedPassword: currentWallet
			}
		});
	};
}

/**
 * Set temporary state wallet name until wallet is created/saved to async
 */
export function setWalletPassword(password) {
	return (dispatch) => {
		dispatch({ type: actionType.SET_APP_PASSWORD, payload: password });
	};
}

export function saveTokenDataForTransaction(tokenBalance, symbol, address, decimals) {
	return (dispatch) => {
		dispatch({
			type: actionType.SAVE_TOKEN_DATA_FOR_TRANSACTION,
			payload: {
				tokenBalance, symbol, address, decimals,
			},
		});
	};
}

export function setUnencryptedWallet(walletObj) {
	const { name, wallet } = walletObj;
	const pKey = wallet.address;
	return (dispatch) => {
		dispatch({ type: actionType.SET_UNENCRYPTED_WALLET, payload: { wallet, 'publicKey': pKey, name } });
	};
}

export function saveAllTokenQuantities(list) {
	return (dispatch) => {
		dispatch({ type: actionType.SAVE_TOKEN_QUANTITIES, payload: list });
	};
}

// saveAllTokenQuantities(tokenQuantities);
// fetchCoinData(tokenSymbolString);
// calculateWalletBalance(tokenQuantities, tokenConversions);
// 3 dispatches converted into one

export function quantityFetchAndBalance(tokenSymbolString, tokenQuantities) {
	return (dispatch) => {
		// console.log("in dispatch");
		return axios.get(`${apiMultipleCurrencyBaseUrl}${tokenSymbolString}${apiMulitpleResponseUrl}`)
			.then(res => {
				// console.log("in success dispatch", res.data);
				const tokenConversionMatrix = res.data;
				const { walletBalanceObject, tokenPrices } = calculateBalances(tokenQuantities, tokenConversionMatrix);

				dispatch({
					type: actionType.FETCHING_COIN_DATA_SUCCESS_WITH_TOKEN_QUANTITIES_BALANCES,
					payload: {
						tokenConversions: tokenConversionMatrix,
						tokenQuantities,
						tokenPrices,
						walletBalance: walletBalanceObject
					}
				})
			})
			.catch(err => {
				// console.log("in dispatch fail", err);
				const tokenConversionMatrix = [];
				const { walletBalanceObject, tokenPrices } = calculateBalances(tokenQuantities, tokenConversionMatrix);
				// console.log("no dispatching");
				dispatch({
					type: actionType.FETCHING_COIN_DATA_FAIL_WITH_TOKENQUANTITIES,
					payload: {
						err: err.data,
						tokenPrices,
						walletBalance: walletBalanceObject,
						tokenQuantities
					}
				})
			})
	}
}

export function setGlobalAddress(address) {
	return (dispatch) => {
		dispatch({ type: actionType.SET_GLOBAL_PUBLIC_ADDRESS, payload: address });
	};
}


export function nukeHotWallet() {
	return (dispatch) => {
		dispatch({ type: actionType.NUKE_HOT_WALLET, payload: {} });
	};
}

export function nukeNewWallet() {
	return (dispatch) => {
		dispatch({ type: actionType.NUKE_NEW_WALLET, payload: {} });
	};
}

export function nukeWallet() {
	return (dispatch) => {
		dispatch({ type: actionType.NUKE_WALLET, payload: {} });
	};
}

export function nukeContacts() {
	return (dispatch) => {
		dispatch({ type: actionType.NUKE_CONTACTS, payload: {} });
	};
}

export function nukeQr() {
	return (dispatch) => {
		dispatch({ type: actionType.NUKE_QR, payload: {} });
	};
}

export function setQrInvoker(pageName) {
	return (dispatch) => {
		dispatch({ type: actionType.QR_SCANNER_INVOKER, payload: pageName });
	}
}


export function setQRData(data) {
	return (dispatch) => {
		dispatch({ type: actionType.SAVE_QR_SCANNER_DATA, payload: data });
	}
}

// balance calculating function brought from fetchCoinData file for dispatch combination
function calculateBalances(tokenQuantities, tokenConversionMatrix) {
	const tokenKeys = Object.keys(tokenConversionMatrix);
	let walletBalanceObject = {
		USD: 0,
		CAD: 0,
		EUR: 0,
		BTC: 0,
		ETH: 0,
	};
	let tokenPrices = [];
	for (let i = 0; i < tokenQuantities.length; i++) {
		let keyTracker = 0;
		for (let matrixKey = 0; matrixKey < tokenKeys.length; matrixKey++) {
			const currentTokenKey = tokenKeys[matrixKey];
			if (currentTokenKey === tokenQuantities[i].symbol) {
				let tokenPriceObject = {
					USD: 0,
					CAD: 0,
					EUR: 0,
					BTC: 0,
					ETH: 0,
				};
				walletBalanceObject.USD += tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].USD;
				walletBalanceObject.CAD += tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].CAD;
				walletBalanceObject.EUR += tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].EUR;
				walletBalanceObject.BTC += tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].BTC;
				walletBalanceObject.ETH += tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].ETH;
				tokenPriceObject.USD = tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].USD;
				tokenPriceObject.CAD = tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].CAD;
				tokenPriceObject.EUR = tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].EUR;
				tokenPriceObject.BTC = tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].BTC;
				tokenPriceObject.ETH = tokenQuantities[i].amount * tokenConversionMatrix[currentTokenKey].ETH;
				tokenPriceObject.symbol = currentTokenKey;
				tokenPrices.push(tokenPriceObject);
				break;
			} else {
				keyTracker++;
			}
			if (keyTracker < (matrixKey.length)) {
				console.log('you good', tokenQuantities[i].symbol);
			} else {
				let tokenPriceObject = {
					USD: 0,
					CAD: 0,
					EUR: 0,
					BTC: 0,
					ETH: 0,
				};
				tokenPriceObject.symbol = tokenQuantities[i].symbol;
				tokenPrices.push(tokenPriceObject);
			}
		}
	}
	return { walletBalanceObject, tokenPrices }
}
