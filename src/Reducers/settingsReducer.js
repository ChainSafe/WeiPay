import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {
      language: "English"
}

export default (state = INITIAL_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case actions.SELECT_WALLET_CURRENCY:
        return { ...state, language: action.payload }

    default:
        return state;
  }

}
