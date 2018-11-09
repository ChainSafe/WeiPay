import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BoxShadowCard = (props) => {
  return (
    <LinearGradient
      colors={['transparent', 'rgba(109, 108, 108,.05)', 'transparent']}
      style={[styles.GradientStyling, { justifyContent: 'center' }, props.customStyling]}>
        <View style={[styles.ChildContainerStyles, props.containerStyling]}>
          {props.children}
        </View>
    </LinearGradient>
  );
};

const gradientColors = {
  Shadow: ['transparent', 'rgb(181, 177, 177, .2)', 'rgba(109, 108, 108,.2)', 'rgb(181, 177, 177, .2)', 'transparent'],
};
const styles = StyleSheet.create({
  GradientStyling: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    zIndex: 0,
    borderRadius: 20,
  },
  ChildContainerStyles: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    margin: '1%',
    borderColor: '#c9c9c9',
    borderWidth: 1,
  },

});
export default BoxShadowCard;
