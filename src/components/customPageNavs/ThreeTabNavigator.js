import React, { Component } from 'react';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TouchableOpacity, // Pressable container
  View, // Container component
} from 'react-native';
import RF from 'react-native-responsive-fontsize';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



export default class Tabs extends Component {
    // Initialize State
    state = {
      // First tab is active by default
      activeTab: 0,
    }

    onSwipe(gestureName, gestureState) {
      const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
      // this.setState({ gestureName: gestureName });
      switch (gestureName) {
        
        case SWIPE_LEFT:
          if (this.state.activeTab === 1) {
            this.setState({ activeTab: 2 })
          }else if (this.state.activeTab === 0) {
            this.setState({ activeTab: 1 })
          }
          break;
        case SWIPE_RIGHT:
          if (this.state.activeTab === 2) {
            this.setState({ activeTab: 1 })
          }else if (this.state.activeTab === 1) {
            this.setState({ activeTab: 0 })
          }
          break;
      }
    }

    // Pull children out of props passed from App component
    render({ children } = this.props) {

      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      };

      return (
        <GestureRecognizer 
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          config={config}
          style={{ flex: 1 }}
          >
          <View style={styles.container}>
            {/* Tabs row */}
            <View style={styles.tabsContainer}>
              {/* Pull props out of children, and pull title out of props */}
              {children.map(({ props: { title } }, index) => {return <TouchableOpacity
                  style={[
                    // Default style for every tab
                    styles.tabContainer,
                    // Merge default style with styles.tabContainerActive for active tab
                    index === this.state.activeTab ? styles.tabContainerActive : []
                  ]}
                  // Change active tab
                  onPress={() => this.setState({ activeTab: index }) }
                  // Required key prop for components generated returned by map iterator
                  key={index}
                >
                  <Text style={ index === this.state.activeTab ? styles.tabTextActive : styles.tabText}>
                    {title}
                  </Text>
                </TouchableOpacity>},)}
            </View>
            {/* Content */}
            <View style={styles.contentContainer}>
              {children[this.state.activeTab]}
            </View>
          </View>
        </GestureRecognizer>
      );
    }
}

const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1, // Take up all available space
  },
  // Tabs row container
  tabsContainer: {
    flexDirection: 'row', // Arrange tabs in a row
  },
  // Individual tab container
  tabContainer: {
    flex: 1, // Take up equal amount of space for each tab
    borderBottomWidth: 3, // Add thick border at the bottom
    borderBottomColor: 'transparent', // Transparent border for inactive tabs
  },
  // Active tab container
  tabContainerActive: {
    borderBottomColor: '#12c1a2', // White bottom border for active tabs
  },
  // Tab text
  tabText: {
    alignSelf:'center',
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Light', 
    letterSpacing: 0.6, 
  },
  tabTextActive: {
    alignSelf:'center',
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Light', 
    letterSpacing: 0.6, 
    color: '#12c1a2',
  },
  // Content container
  contentContainer: {
    flex: 1, // Take up all available space
  },
});
