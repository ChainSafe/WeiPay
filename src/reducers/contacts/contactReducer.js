import * as actions from '../../actions/ActionTypes';

const INITIAL_STATE = {
  contacts: [],
  currentContact: {},
  addingContact: true,
  contactName: '',
  contactAddress: {},
};

/**
 * Reducer used to handle all actions occurring during the process of
 * adding a new contact. Each case represents an Action
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.ADDING_CONTACT:
      var contact = state.currentContact;

      // Object.keys(contact)[0]

      const actionKey = Object.keys(action.payload)[0];
      const actionKeyValue = action.payload[Object.keys(action.payload)[0]];

      if (actionKey in contact) {
        contact[actionKey] = actionKeyValue;
      } else {
        contact[actionKey] = actionKeyValue;
      }

      // console.log("Contact Details: ");
      // console.log(contact);

      return { ...state, currentContact: contact };


    case actions.COMPLETE_CONTACT:
      var old = state.contacts;

      // old.push(state.currentContact)
      // [...old, state.currentContact]

      const newContact = [...state.contacts, action.payload];
      console.log(newContact);

      return { ...state, contacts: newContact, currentContact: {} };

    case actions.EDIT_CONTACT:
      let nameIndex = state.contacts.map(contact => contact.name).indexOf(action.payload.name)

      let editedContactList = [
        ...state.contacts.slice(0,nameIndex),
        action.payload,
        ...state.contacts.slice(nameIndex + 1)
      ]

      return { ...state, contacts: editedContactList }

    default:
      return state;
  }
};
