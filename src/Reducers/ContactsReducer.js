import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {

    contacts: [],
    currentContact: {},
    addingContact: true,

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.ADDING_CONTACT:
            var contact = state.currentContact;
            //Object.keys(contact)[0]

            const actionKey = Object.keys(action.payload)[0]
            const actionKeyValue = action.payload[Object.keys(action.payload)[0]]

            if (actionKey in contact) {
                contact[actionKey] = actionKeyValue
            } else {
                contact[actionKey] = actionKeyValue
            }

            console.log("Contact Details: ");
            console.log(contact);

            return { ...state, currentContact: contact }

        case actions.COMPLETE_CONTACT:
            var old = state.contacts
            old.push(state.currentContact)

            return { ...state, currentContact: action.payload, contacts: old }

        default:
            return state;
    }
    console.log("Total Contacts: ");
    console.log(state.contacts);
    console.log("Currenct Contact: ");
    console.log(state.currentContact);




}
