import * as actions from '../../actions/ActionTypes';
import * as configActions from '../../actions/types/AppConfig';

const INITIAL_STATE = {
  invoker: '',
  coinInvoker: '',
  data: "",
};

/**
 * Reducer handles all the actions invoked during the process of
 * invoking the QRScanner
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case configActions.QR_SCANNER_INVOKER:
      return { ... state, invoker: action.payload };
    case configActions.SAVE_QR_SCANNER_DATA:
      return { ... state, data: action.payload };
    case actions.QRSCANNER_PAGE_INVOKER:
      return { ...state, invoker: action.payload };
    case actions.QRSCANNER_COIN_INVOKER:
      return { ...state, coinInvoker: action.payload };
    case actions.NUKE_QR:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
