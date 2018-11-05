import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import RF from 'react-native-responsive-fontsize';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

/**
 * Custom Tab Navigator Component
 * To create a tab:
 *  - Create a "View" tag with a title prop.
 *  - Place the JSX or Screen in with-in the View tag
 *  *** SPECIFY THE FOLLOWING PROP WHEN USING THIS COMPONENT***
 *    - tabs ( Integer component, represents the total amount of tabs being inserted )
 */
export default class Tabs extends Component {
    state = {
      activeTab: this.getActiveTab(),
      totalTabs: (this.props.tabs - 1),
    }

    getActiveTab() {
      if (this.props.activeTab != undefined) {
        const tab = this.props.activeTab - 1; 
        if (this.props.activeTab == 0) {
          return 0;
        } else {
          return tab;
        }
      } else {
        return 0;
      }
    }

    onSwipe(gestureName) {
      const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
      switch (gestureName) {
        case SWIPE_LEFT:
          if (this.state.activeTab < this.state.totalTabs) {
            this.setState({ activeTab: (this.state.activeTab + 1) });
          }
          break;
        case SWIPE_RIGHT:
          if (this.state.activeTab > 0) {
            this.setState({ activeTab: (this.state.activeTab - 1) });
          }
          break;
        default:
          break;
      }
    }

    render({ children } = this.props) {
      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      };

      return (
        <GestureRecognizer
          onSwipe={(direction, state) => { return this.onSwipe(direction, state); }}
          config={config}
          style={{ flex: 1 }}
          >
          <View style={styles.container}>
            <View style={styles.tabsContainer}>
              {children.map(({ props: { title } }, index) => {
                return <TouchableOpacity
                  style={[
                    styles.tabContainer,
                    index === this.state.activeTab ? styles.tabContainerActive : { borderBottomColor: '#bcbcbc', borderBottomWidth: 1 },
                  ]}
                  onPress={() => { return this.setState({ activeTab: index }); } }
                  key={index}
                >
                  <Text style={ index === this.state.activeTab ? styles.tabTextActive : styles.tabText}>
                    {title}
                  </Text>
                </TouchableOpacity>;
              })}
            </View>
            <View style={styles.contentContainer}>
              {children[this.state.activeTab]}
            </View>
          </View>
        </GestureRecognizer>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginLeft: '9%',
    marginRight: '9%',
  },
  tabContainer: {
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabContainerActive: {
    borderBottomColor: '#12c1a2',
  },
  tabText: {
    alignSelf: 'center',
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Light',
    letterSpacing: 0.6,
  },
  tabTextActive: {
    alignSelf: 'center',
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Light',
    letterSpacing: 0.6,
    color: '#12c1a2',
  },
  contentContainer: {
    flex: 1,
  },
});
