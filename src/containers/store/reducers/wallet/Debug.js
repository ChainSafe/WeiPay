import {
  DEBUG_MODE,
} from '../../actions/types/AppConfig';

const INITIAL_STATE = {
  debugMode: false,
  testWalletName: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DEBUG_MODE:
      const { walletName } = action.payload;
      return { ...state, debugMode: true, testWalletName: walletName };
    default:
      return state;
  }
};
