import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, List, ListItem } from 'react-native-elements';
import CurrencyList from '../../../../components/CurrencyList';
import BackWithMenuNav from "../../../../components/customPageNavs/BackWithMenuNav"


/**
 * Screen used to change the currency of the balance display
 */
class ChangeCurrency extends Component {

    /**
     * Changes screen title to "Change Currency"
     */
    static navigationOptions = {
        title: "Change Currency"
    };

    /**
     * Empty method
     */
    navigate = () => {
        // const navigateToPassphrase = NavigationActions.navigate({
        //     routeName: "generatePassphrase",     
        // });
        // this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Returns a scrollable view containing all the currencies available for the 
     * user to select from.
     * 
     * Also contains an update button.
     */
    render() {
        return (
            <View style={styles.pageContainer} >
                <BackWithMenuNav 
                    showMenu={true}
                    showBack={true}
                    navigation={this.props.navigation}
                    backPage={"settingsMain"}

                />
                <CurrencyList />
                <View style={styles.btnContainer} >
                    <Button
                        title='Update'
                        icon={{ size: 28 }}
                        buttonStyle={{
                            backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                            height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 5.5
                        }}
                        textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
                        onPress={this.navigate}
                    />
                </View>
            </View>
        );
    }
}

/**
 * Styles used in the change currency screen display
 */
const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    btnContainer: {
        alignItems: 'center',
        height: 80,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "center"
    }
})

export default ChangeCurrency;
