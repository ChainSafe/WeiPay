import { SWITCH_LANGUAGE } from '../Actions/actionTypes'

const INITIAL_STATE = 'english'

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return action.payload
    default:
      return state
  }
}
