import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {

    contacts: []
}

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload);
    switch (action.type) {

        case actions.ADD_CONTACT:
            var contact = state.contacts;
            contact.push(action.payload);
            return { ...state, contacts: contact }

        default:
            return state;
    }

}
