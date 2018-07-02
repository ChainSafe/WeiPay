import { TabNavigator } from 'react-navigation';
import TokenSend from './TokenSend';
import TokenReceive from './TokenReceive';

/**
 * Creates a navigation system to switch between
 * TokenSend and TokenReceive Screens
 * 
 * THIS CLASS IS ONLY BEING USED IN THE THE NAVIGATION STACK.
 */
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
      labelStyle: {
        fontSize: 16,
        marginBottom: 13
      },
      style: {
        borderTopColor: 'transparent'
      }
    }
  })
