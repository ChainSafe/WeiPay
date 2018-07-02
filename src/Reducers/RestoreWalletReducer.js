import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {
  restoreWallet: false,
  mnemonic: ''
};
/**
 * Reducer handles all actions invoked when going through the process of
 * recoverying a previous wallet
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.RESTORE_WALLET:
      return { ...state, restoreWallet: true };

    default:
      return state;
  }
}
