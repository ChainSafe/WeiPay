import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {
  restoreWallet: false,
  mnemonic: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.RESTORE_WALLET:
      return { ...state, restoreWallet: true };
    case actions.RESTORE_RECOVERY_KEY:
      return { ...state, mnemonic: action.payload };
    /* Bad habbit, but i'm disregarding the action above - restore-recovery-key */
    case actions.RESTORE_RECOVERY_PASSPHRASE:
      return { ...state, mnemonic: action.payload };
    default:
      return state;
  }
}
