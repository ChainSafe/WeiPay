import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import NavigationStack from './navigationStack';

/**
 * React-Component
 * Global Navigation Component used to navigate to different screens within the app
 */
class AppNavigation extends Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch } = this.props;

    if (this.props.navigationState.index > 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };


  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <NavigationStack
        navigation={addNavigationHelpers({ dispatch, state: navigationState })}
      />
    );
  }
}

/**
 * Returns the current screen the state is pointing to
 * @param {Object} state
 */
const mapStateToProps = (state) => {
  return {
    navigationState: state.NavigationReducer,
  };
};

export default connect(mapStateToProps)(AppNavigation);
