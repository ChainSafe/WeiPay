import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, List, ListItem } from 'react-native-elements';
import LanguageList from '../../../../components/LanguageList';
import BackWithMenuNav from "../../../../components/customPageNavs/BackWithMenuNav"

/**
 * Screen used to change the language to be used in the wallet
 */
class LanguageChange extends Component {

    /**
     * Changes screen title to "Change Language"
     */
    static navigationOptions = {
        title: "Change Language"
    };

    /**
     * Empty method
     */
    navigate = () => {
        // const navigateToPassphrase = NavigationActions.navigate({
        //     routeName: "generatePassphrase",
        //     params: { name: "Shubhnik" }
        // });
        // this.props.navigation.dispatch(navigateToPassphrase);
        // if(this.props.language != )
        debugger
    };

    /**
     * Returns a scrollable view containing all the languages available for the 
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
                <LanguageList noBorder />
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
 * Styles used in the change language screen display
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

/**
 * Not Defined correctly. Not being used
 * @param {Object} param0 
 */
function mapStateToProps({ language }) {
    return { language }
}

export default LanguageChange;
