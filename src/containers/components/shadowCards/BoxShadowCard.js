import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BoxShadowCard = (props) => {
  return (
      <View style={[styles.GradientStyling, { justifyContent: 'center' }, props.customStyling]}>
          <View style={[styles.ChildContainerStyles, props.containerStyling]}>
              {props.children}
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  GradientStyling: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    zIndex: 0,
    borderRadius: 10,
  },
  ChildContainerStyles: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    margin: '1%',
  },
});
export default BoxShadowCard;