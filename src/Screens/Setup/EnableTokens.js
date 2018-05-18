import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import CoinList from '../../Components/CoinList';

class EnableTokens extends Component {
    static navigationOptions = {
        title: "Enable Tokens Page"
    };

    navigate = () => {
        const navigateToPassphrase = NavigationActions.navigate({
            routeName: "Drawer",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateToPassphrase);
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
              <View style={styles.btnContainer} >
                <Button
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
              {/* <Text> Enable Tokens Page </Text> */}
              <CoinList />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexGrow: 1
    },
    btnContainer: {
        alignItems: 'center'
    },
})


export default EnableTokens;
