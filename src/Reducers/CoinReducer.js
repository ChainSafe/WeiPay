import data from '../Reducers/json/CoinList.json';
import { CHANGE_COINLIST } from '../Actions/actionTypes';

const INITIAL_STATE = data

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    // case CHANGE_COINLIST:
    //   new_state = state
    //   new_state.splice(action.payload.id - 1, 1).push(action.payload)
    //   return new_state
    default:
      return state
  }
}
