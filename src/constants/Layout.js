import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

/**
 * Dimension's for a windows
 */
export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  buttonWidth: width - 60,
};
