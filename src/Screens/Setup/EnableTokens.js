import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import CoinList from '../../Components/CoinList';

class EnableTokens extends Component {
    state = {
      tokenList: this.props.tokenList,
      changeState: true
    }


    static navigationOptions = {
        title: "Enable Tokens Page",
        headerLeft: null
    };

    navigate = () => {
        const navigateToPassphrase = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
        });
        this.props.navigation.dispatch(navigateToPassphrase);
    };


        render() {
          return (
            <View style={{ flex: 1 }}>
              <CoinList />
              <View style={styles.btnContainer} >
                <Button
                  disabled={this.props.tokenList.length === 0}
                  title='Add'
                  icon={{ size: 28 }}
                  buttonStyle={{
                    backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
                    justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
                  }}
                  textStyle={{ textAlign: 'center' }}
                  onPress={this.navigate}
                />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center', height: 60, paddingTop: 10, paddingBottom: 10, justifyContent: "center"
    }
})

const mapStateToProps = state => {
  return {
      tokenList: state.newWallet.tokens,
  }
};

export default connect(mapStateToProps)(EnableTokens);
