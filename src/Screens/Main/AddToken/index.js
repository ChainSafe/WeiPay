import { TabNavigator } from 'react-navigation';

import Coins from './Coins'
import Tokens from './Tokens'

export default TabNavigator({
    coins: { screen: Coins },
    tokens: { screen: Tokens }
  },{
    navigationOptions: {
      headerStyle: {
        borderBottomWidth: 0
      }
  },
    tabBarPosition: 'top',
    tabBarOptions: {
      labelStyle: { fontSize: 16, marginBottom: 13 },
      style: {
        borderTopColor: 'transparent'
      }
    }
  })
