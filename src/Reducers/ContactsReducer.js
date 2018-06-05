import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {

    contacts: [],
    name: ""
}

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload);
    switch (action.type) {

        case actions.ADD_CONTACT:

            var contact = state.contacts;
            contact.push(action.payload);
            return { ...state, contacts: contact }

        case actions.ADDING_CONTACT:
            return { ...state, name: action.payload }

        default:
            return state;
    }

}
