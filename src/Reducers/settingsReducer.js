import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {
      language: "English"
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case actions.SELECT_WALLET_LANGUAGE:
        return { ...state, language: action.payload }

    default:
        return state;
  }

}
