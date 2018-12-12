import React, { Component } from 'react';
import {
  View, TouchableOpacity, StyleSheet, Dimensions, Text, Platform, Image 
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import RF from 'react-native-responsive-fontsize';

class BackWithMenuNav extends Component {
  navigateBack = () => {
    if (typeof this.props.backPage === 'undefined') {
      this.props.navigation.goBack();
    } else {
      const navigateToPassphrase = NavigationActions.navigate({ routeName: this.props.backPage });
      this.props.navigation.dispatch(navigateToPassphrase);
    }
  }

  navigateMenu = () => {
    const navigateToPassphrase = NavigationActions.navigate({ routeName: 'DrawerOpen' });
    this.props.navigation.dispatch(navigateToPassphrase);
  }

  skipSetup = () => {
    const navigateToHoldings = NavigationActions.navigate({ routeName: 'mainStack' });
    this.props.navigation.dispatch(navigateToHoldings);
  }

  /**
     *  Props:
     *      showMenu: type=boolean, Determines if the Drawer icon will be displayed
     *      backPage: type=string, Specifies the page to go back to from the current screen (Optional)
     *      showBack: type=boolean, Determines if the back icon will be displayed on Main header
     */
  render() {
    return (
        <View style={styles.container}>
            { this.props.showBack ?
            <View style={[styles.boxContainer, styles.boxOne]}>
                <TouchableOpacity
                onPress={this.navigateBack} >
                <Image
                    source={require('../../../assets/icons/back.png')}
                    style={styles.btnBack}
                />
                </TouchableOpacity>
            </View> : null}
            { this.props.showMenu ?
            <View style={[styles.boxContainer, styles.boxTwo, styles.extraSpace]} >
                <TouchableOpacity
                onPress={this.navigateMenu} >
                <Image
                    source={require('../../../assets/icons/menu.png')}
                    style={styles.btnMenu}
                />
                </TouchableOpacity>
            </View> : null}
            { this.props.showSkip ?
            <View style={[styles.boxContainer, styles.boxTwo]} >
                <TouchableOpacity
                onPress={this.skipSetup} >
                <Text> Skip </Text>
                </TouchableOpacity>
            </View> : null}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop:  getStatusBarHeight(),
    marginRight: '9%',
    marginLeft: '9%',
    height: Platform.OS === 'ios' ? 40 : 40,
    justifyContent: 'center',
  },
  boxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOne: {
    alignItems: 'flex-start',
  },
  boxTwo: {
    alignItems: 'flex-end',
    zIndex: 100,
  },
  extraSpace: {
    padding: 10,
  },
  btnBack: {
    height: Dimensions.get('window').height * 0.03,  
    width: Dimensions.get('window').width * 0.05,  
  },
  btnMenu: {
    height: Dimensions.get('window').height * 0.02,  
    width: Dimensions.get('window').width * 0.05,  
  },
});

export default BackWithMenuNav;
