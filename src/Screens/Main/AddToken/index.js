import { TabNavigator } from 'react-navigation';

import Coins from './Coins'
import Tokens from './Tokens'

/**
 * Tab Navigation to switch between adding coins and tokens
 */
export default TabNavigator({
  coins: { screen: Coins },
  tokens: { screen: Tokens }
}, {
    navigationOptions: {
      headerStyle: {
        borderBottomWidth: 0
      }
    },

    headerLeft: null,
    tabBarPosition: 'top',
    tabBarOptions: {
      labelStyle: { fontSize: 16, marginBottom: 13 },
      style: {
        borderTopColor: 'transparent'
      }
    }
  })
