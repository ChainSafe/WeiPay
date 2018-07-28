import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import NavigationStack from './navigationStack';

/**
 * React-Component
 * Global Navigation Component used to navigate to different screens within the app
 */
class AppNavigation extends Component {
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
