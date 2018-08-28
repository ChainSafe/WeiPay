import React, { Component } from 'react';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View, // Container component
} from 'react-native';
import ThreeTabNavigator from '../../../components/customPageNavs/ThreeTabNavigator';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import CoinSend from './send/CoinSend';
import CoinActivity from './history/CoinActivity';
import CoinReceive from './receive/CoinReceive';


class TokenFunctionality extends Component {
  
    render() {
        return (
            <View style={styles.container}>
                <BackWithMenuNav
                    showMenu={true}
                    showBack={true}
                    navigation={this.props.navigation}
                    backPage={'mainStack'}
                />
                <ThreeTabNavigator>
                    {/* First tab */}
                    <View title="SEND" style={styles.content}>
                      <CoinSend />  
                    </View>
                    {/* Second tab */}
                    <View title="ACTIVITY" style={styles.content}>
                        <CoinActivity />
                    </View>
                    {/* Third tab */}
                    <View title="RECEIVE" style={styles.content}>
                        <CoinReceive />
                    </View>
                    

                </ThreeTabNavigator>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    // App container
    container: {
      flex: 1,                            // Take up all screen
      backgroundColor: '#fafbfe',         // Background color
    },
    // Tab content container
    content: {
      flex: 1,                            // Take up all available space
    //   justifyContent: 'center',           // Center vertically
    //   alignItems: 'center',               // Center horizontally
      backgroundColor: '#fafbfe',         // Darker background for content area
    },
  });

export default TokenFunctionality;
