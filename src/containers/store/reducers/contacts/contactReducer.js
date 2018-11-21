import * as actions from '../../actions/ActionTypes';

const INITIAL_STATE = {
  contacts: [],
  currentContact: {},
  incompleteContactInputs: { name: '', contactAddress: {}, images: {} },
  addingContact: true,
  contactName: '',
  editContactState: false,
  contactAddress: {},
  activeTab: 'contacts',
  contactDataforCoinSend: '',
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
      const initialVal = { name: '', contactAddress: {}, images: {} }
      const newContact = [...state.contacts, action.payload];
      return { ...state, contacts: newContact, currentContact: {}, incompleteContactInputs: initialVal };

    case actions.SAVING_ADDCONTACT_INPUTS:
      return { ...state, incompleteContactInputs: action.payload };
    case actions.UPDATE_SAVED_CONTACT_INPUTS:
      return { ...state, incompleteContactInputs: action.payload };
    case actions.ACTIVE_CONTACT_TAB:
      return { ...state, activeTab: action.payload };
    case actions.EDIT_CONTACT:
      let nameIndex = state.contacts.map(contact => contact.name).indexOf(action.payload)
      let editedContactList = [
        ...state.contacts.slice(0,nameIndex),
        action.payload,
        ...state.contacts.slice(nameIndex + 1),
      ];
      return { ...state, contacts: editedContactList, editContactState: true };

    case actions.CONTACT_ADDRESS_TO_COINSEND:
      return { ...state, contactDataforCoinSend: action.payload };

    case actions.DELETE_CONTACT:
      let deleteIndex = state.contacts.map(contact => contact.name).indexOf(action.payload)
      let deletedContactList = [
        ...state.contacts.slice(0,deleteIndex),
        ...state.contacts.slice(deleteIndex + 1)
      ]

      return { ...state, contacts: deletedContactList }
    case actions.NUKE_CONTACTS:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
