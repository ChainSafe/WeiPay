import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { Terms } from './terms';
import { Button } from 'react-native-elements';


class ViewTerms extends Component {
    static navigationOptions = {
        title: "Terms and Conditions",
        headerStyle: {
            borderBottomWidth: 0,
        }
    };

    navigate = () => {
        const navigateToCreateOrRestore = NavigationActions.navigate({
            routeName: "createOrRestore",
        });
        this.props.navigation.dispatch(navigateToCreateOrRestore);
    };

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
        width: '100%'
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
