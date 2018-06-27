import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { Terms } from './terms';
import { Button } from 'react-native-elements';

/**
 * Initial terms and condition screen when the app is oppened for the first time.
 */
class ViewTerms extends Component {

    /**
     * Sets the Screen title to "Terms and Conditions"
     */
    static navigationOptions = {
        title: "Terms and Conditions",
        headerStyle: {
            borderBottomWidth: 0,
        }
    };

    /**
     * Method used to navigate to the "createOrRestore" screen
     */
    navigate = () => {
        const navigateToCreateOrRestore = NavigationActions.navigate({
            routeName: "createOrRestore",
        });
        this.props.navigation.dispatch(navigateToCreateOrRestore);
    };

    /**
     * Returns the scrollable component that displays the terms and conditions with a submit button
     */
    render() {
        const { counterCount, incrementAction, decrementAction } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.termsContainer}>
                    <ScrollView style={styles.list}>
                        <Text>{Terms}</Text>
                    </ScrollView>
                    <View style={styles.btnContainer}>
                        <Button
                            title='SUBMIT'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10
                            }}
                            textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
                            onPress={this.navigate}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

/**
 * Styles used in the terms and condition screen
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    termsContainer: {
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        width: Dimensions.get('window').width - 20,
    },
    btnContainer: {
        paddingTop: 10,
        alignItems: 'center',
        width: '100%',
    },
    list: {
        backgroundColor: 'white',
        padding: 10
    }
})

export default ViewTerms;
