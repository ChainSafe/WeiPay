import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, List, ListItem } from 'react-native-elements';
import currencyList from '../../../Components/currencyList';


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

        // const list = [
        //     {
        //         "title": "USD",
        //         "id": "usd"
        //     },
        //     {
        //         "title": "JPY",
        //         "id": "jpy"
        //     },
        //     {
        //         "title": "CNY",
        //         "id": "cny"
        //     },
        //     {
        //         "title": "EURO",
        //         "id": "euro"
        //     },
        // ];


        return (
            <View style={styles.mainContainer}>

                <View style={styles.contentContainer} >
                    <currencyList />
                    // <List style={styles.list} >
                    //     {
                    //         list.map((item, i) => (
                    //             <TouchableOpacity
                    //                 key={item.id}
                    //                 onPress={() => this.navigate}
                    //             >
                    //                 <ListItem
                    //                     key={i}
                    //                     title={item.title}
                    //                     leftIcon={{ name: item.icon }}
                    //                 />
                    //             </TouchableOpacity>
                    //         ))
                    //     }
                    // </List>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25,
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },
    formInputElement: {
    },
    list: {
        flex: 1, flexGrow: 1
    }
})



export default ChangeCurrency;
