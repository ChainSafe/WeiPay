import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {
    currency: "CAD",
    language: "English"
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case actions.SELECT_WALLET_CURRENCY:
            return { ...state, currency: action.payload }

        case actions.SELECT_WALLET_LANGUAGE:
            return { ...state, language: action.payload }

        default:
            return state;
    }

}
