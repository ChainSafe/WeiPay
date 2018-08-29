import * as actions from '../../actions/ActionTypes';

const INITIAL_STATE = {
  contacts: [],
  currentContact: {},
  incompleteContactInputs: { name: '', contactAddress: {}, images: {} },
  addingContact: true,
  contactName: '',
  contactAddress: {},
  activeTab: '',
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
      return { ...state, currentContact: contact };

    case actions.COMPLETE_CONTACT:
      var old = state.contacts;
      const newContact = [...state.contacts, action.payload];
      return { ...state, contacts: newContact, currentContact: {} };

    case actions.SAVING_ADDCONTACT_INPUTS:

      return { ...state, incompleteContactInputs: action.payload };

    case actions.EDIT_CONTACT:
      const nameIndex = state.contacts.map(contact => {return contact.name}).indexOf(action.payload.name);
      const editedContactList = [
        ...state.contacts.slice(0, nameIndex),
        action.payload,
        ...state.contacts.slice(nameIndex + 1),
      ];

      return { ...state, contacts: editedContactList };

    default:
      return state;
  }
};
