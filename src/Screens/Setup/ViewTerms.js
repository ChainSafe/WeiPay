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
                    buttonStyle={{ backgroundColor: 'blue', borderRadius: 10 }}
                    textStyle={{ textAlign: 'center' }}
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
        justifyContent: 'flex-start'
    },
    termsContainer: {
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30
    },
    btnContainer: {
        paddingTop: 25
    },
    list: {
        backgroundColor: 'white',
        padding: 10
    }
})

export default ViewTerms;
