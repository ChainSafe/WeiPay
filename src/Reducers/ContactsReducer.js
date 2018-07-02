import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {
  contacts: [],
  currentContact: {},
  addingContact: true,
  contactName: "",
  contactAddress: {}
}

/**
 * Reducer used to handle all actions occurring during the process of 
 * adding a new contact. Each case represents an Action
 */
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

      // console.log("Contact Details: ");
      // console.log(contact);

      return { ...state, currentContact: contact }

    case actions.CONTACT_ADDRESS:
      return { ...state, contactAddress: action.payload }
    case actions.COMPLETE_CONTACT:
      var old = state.contacts

      // old.push(state.currentContact)
      // [...old, state.currentContact]

      let newContact = [...state.contacts, action.payload]
      return { ...state, contacts: newContact }

    default:
      return state;
  }
  // console.log("Total Contacts: ");
  // console.log(state.contacts);
  // console.log("Currenct Contact: ");
  // console.log(state.currentContact);

}
