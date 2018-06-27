import AppNavigator from "../Navigation/navigationStack";



/**
 * Reducer used to handle all actions invoked by the NavigationActions when navigating
 * to different screens
 */

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("terms")
);
const navigationReducer = (state = initialState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

export default navigationReducer;
