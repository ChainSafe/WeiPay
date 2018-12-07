import AppNavigator from '../../../navigation/stack/navigationStack';
/**
 * Reducer used to handle all actions invoked by the NavigationActions when navigating
 * to different screens
 */
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('splash')
);

const navigationReducer = (state = initialState, action) => {
  console.log("nav", "action", action,"state", state);
  const newState = AppNavigator.router.getStateForAction(action, state);
  console.log("nav", "action", action," new state", newState);
  return newState || state;
};

export default navigationReducer;
