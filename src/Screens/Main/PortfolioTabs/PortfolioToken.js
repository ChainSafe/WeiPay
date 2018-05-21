import { TabNavigator } from 'react-navigation';
import TokenSend from './TokenSend';
import TokenReceive from './TokenReceive';

export default TabNavigator({
  tokensend: { screen: TokenSend },
  tokenreceive: { screen: TokenReceive }
}, {
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
})
