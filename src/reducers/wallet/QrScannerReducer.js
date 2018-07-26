import * as actions from '../../actions/ActionTypes';

const INITIAL_STATE = {
  data: {},
  invoker: '',
};

/**
 * Reducer handles all the actions invoked during the process of
 * invoking the QRScanner
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.QRSCANNER_PAGE_INVOKER:

      return { ...state, invoker: action.payload };

    case actions.SAVING_ADDCONTACT_INPUTS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
