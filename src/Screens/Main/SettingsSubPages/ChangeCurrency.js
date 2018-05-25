import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, List, ListItem } from 'react-native-elements';
import CurrencyList from '../../../Components/CurrencyList';



class ChangeCurrency extends Component {
    static navigationOptions = {
        title: "Change Language"
    };

    navigate = () => {
        // const navigateToPassphrase = NavigationActions.navigate({
        //     routeName: "generatePassphrase",
        //     params: { name: "Shubhnik" }
        // });
        // this.props.navigation.dispatch(navigateToPassphrase);
    };




    render() {

        return (

          <View style={{ flex: 1 }}>
              <CurrencyList />
              <View style={styles.btnContainer} >
                  <Button
                      title='Update'
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




export default ChangeCurrency;
