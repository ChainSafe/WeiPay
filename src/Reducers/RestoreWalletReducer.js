import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = { restoreWallet: false,
                        recoveryKey: '' };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    //console.log(action);
    case actions.RESTORE_WALLET:
      return { ...state, restoreWallet: true };
    case actions.RESTORE_RECOVERY_KEY:
      return { ...state, recoveryKey: action.payload };
    default:
      return state;

  }

}
