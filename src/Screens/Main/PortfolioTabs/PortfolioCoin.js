import { TabNavigator } from 'react-navigation'
import CoinSend from './CoinSend'
import CoinActivity from './CoinActivity'
import CoinReceive from './CoinReceive'

export default TabNavigator({
  coinsend: { screen: CoinSend },
  coinactivity: { screen: CoinActivity },
  coinrecive: { screen: CoinReceive }
},
{
  navigationOptions: {
    headerStyle: {
      borderBottomWidth: 0,
    }
  },
  tabBarPosition: 'top',
  tabBarOptions: {
    labelStyle: { fontSize: 16, marginBottom: 13 },
    style: {
      borderTopColor: 'transparent'
    }
  }
},
{
  headerTitleStyle: { textAlign: 'center', alignSelf: 'center', fontWeight: 'normal', fontSize: 100, color: '#606060' }
})
