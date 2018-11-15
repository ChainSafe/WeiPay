import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";

import NavigationStack from './navigationStack';

/**
 * React-Component
 * Global Navigation Component used to navigate to different screens within the app
 */
class AppNavigation extends Component {

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
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
const mapStateToProps = state => ({
  navigationState: state.NavigationReducer,
});

export default connect(mapStateToProps)(AppNavigation);
