import { incrementCounter, decrementCounter } from "../Actions/actionTypes";

const initialState = { counter: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case incrementCounter:
      return { ...state, counter: state.counter + 1 };

    case decrementCounter:
      return { ...state, counter: state.counter - 1 };


    // case LOGIN:
    //   return { ...state, user: action.payload.user, loading: false }
    // case LOGIN_FAILED:
    //   return { ...state, user: null, loading: false }
    // case LOGIN_LOADING:
    //   return { ...state, loading: true }
    default:
      return state;
  }
};

export default counterReducer;
