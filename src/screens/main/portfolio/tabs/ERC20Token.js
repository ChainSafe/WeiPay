import { TabNavigator } from 'react-navigation';
import CoinSend from '../../tokens/send/ERC20TokenSend';
//import CoinActivity from '../../tokens/history/CoinActivity';
import CoinReceive from '../../tokens/receive/CoinReceive';

/**
 * Creates a Tabbed navigation system to easily switch between
 * CoinSend, CoinActivity, and CoinReceive screens
 */
export default TabNavigator({
        coinsend: { screen: CoinSend },
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
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontWeight: 'normal',
            fontSize: 100,
            color: '#606060'
        }
    })