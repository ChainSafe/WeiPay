import { AsyncStorage } from 'react-native';
import * as actions from '../../actions/ActionTypes';
import data from '../../constants/data/json/coins.json';

const INITIAL_STATE = {
  newWallet: false,
  walletName: '',
  tokens: [],
  wallet: null,
  backupPassphrase: '',
  coinData: data,
  QrData: '',
  QrScannerInvoker: '',
  current_token: {},
  debugMode: false,
  txnFee: 0,
  newTokenName: '',
  newTokenAddress: '',
};

/**
 * Reducer used to handle all actions occuring during the process of creating a wallet.
 *
 * Also handles the action invoked by using the QrScanner Component
 */

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.QRSCANNER_DATA:
      return { ...state, QrData: action.payload };
    case actions.CREATING_NEW_WALLET:      
      return { ...state, newWallet: true, wallet: action.payload };
    case actions.NEW_WALLET_NAME:
      return { ...state, walletName: action.payload };
    case actions.ADD_TOKEN_SETUP:
      const current = state.tokens;
      const selectedToken = { ...action.payload, balance: 0}
      let newTokens = [];
      const index = current.map(token => token.id).indexOf(action.payload.id);
      if (index === -1) {      
        newTokens = [...current, selectedToken];
      } else { 
        newTokens = [...current.slice(0, index), ...current.slice(index + 1)];     
      }
      return { ...state, tokens: newTokens };
    case actions.ADD_TOKEN_INFO:
      return { ...state, current_token: action.payload };
    case actions.DEBUG_MODE:
      return { ...state, debugMode: true };
    case actions.UPDATE_TOKEN_BALANCE:      
      const token = state.tokens[action.payload.tokenID];
      const updatedToken = { ...token, balance: action.payload.balance }
      const previousTokens = state.tokens;      
      previousTokens[action.payload.tokenID] = updatedToken;
      return { ...state, tokens: previousTokens };
    case actions.TXN_FEE:
      return { ...state, txnFee: action.payload };
    case actions.ADD_NEW_TOKEN_ADDRESS:      
      return { ...state, newTokenAddress: action.payload };
    case actions.ADD_NEW_TOKEN_NAME:
      return { ...state, newTokenName: action.payload };
    case actions.COMPLETE_NEW_TOKEN:
      let lastID = state.tokens[state.tokens.length - 1].id + 1
      
      const coinObj = {
        "id": lastID,
        "type": "ERC20",
        "selected": true,
        "symbol": state.newTokenName,
        "address": state.newTokenAddress,
        "decimals": 18,
        "name": state.newTokenName,
        "ens_address": "",
        "website": "",
        "logo": {
          "src": "https://etherscan.io/token/images/binance_28.png",
          "width": 28,
          "height": 28,
          "ipfs_hash": ""
        },
        "support": {
            "email": "",
            "url": ""
        },
        "social": {
            "blog": "",
            "chat": "",
            "facebook": "",
            "forum": "",
            "github": "",
            "gitter": "",
            "instagram": "",
            "linkedin": "",
            "reddit": "",
            "slack": "",
            "telegram": "",
            "twitter": "",
            "youtube": ""
        }
      }
      const oldTokens = state.tokens
      oldTokens.push(coinObj);

      const oldcoinData = state.coinData
      oldcoinData.push(coinObj);    
      
      return { ...state, coinData: oldcoinData, tokens: oldTokens, newTokenAddress: '', newTokenName: '' };

    default:
      return state;
  }
};
