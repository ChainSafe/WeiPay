import {
  CONFIG_HOT_WALLET, 
  NUKE_HOT_WALLET,
} from '../../actions/types/AppConfig';

const INITIAL_STATE = {
  hotWallet: null,
};

/**
 * Hot wallet reducer will have the current decrypted wallet
 * { Name pubKey wallet }
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONFIG_HOT_WALLET:
      const { wallet, publicKey, name } = action.payload;
      return {
        ...state, hotWallet: { wallet, pubKey: publicKey, name },
      };
    case NUKE_HOT_WALLET:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};