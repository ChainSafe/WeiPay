import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, Icon, List, ListItem } from 'react-native-elements';
import LanguageList from '../../../Components/LanguageList';


class LanguageChange extends Component {
    static navigationOptions = {
        title: "Change Language"
    };

    navigate = () => {
        // const navigateToPassphrase = NavigationActions.navigate({
        //     routeName: "generatePassphrase",
        //     params: { name: "Shubhnik" }
        // });
        // this.props.navigation.dispatch(navigateToPassphrase);
        // if(this.props.language != )
        debugger
    };

    render() {


        return (

            <View style={{ flex: 1 }}>

                <LanguageList />

                <View style={styles.btnContainer} >
                    <Button
                        title='Update'
                        icon={{ size: 28 }}
                        buttonStyle={{
                            backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
                            justifyContent: 'center', marginBottom: 30, marginTop: 5.5
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
    // mainContainer: {
    //     flex: 1, alignItems: 'center', justifyContent: 'flex-start'
    // },
    // contentContainer: {
    //     marginTop: 25,
    // },
    // btnContainer: {
    //     flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    // },
    // formInputElement: {
    // },
    // list: {
    //     flex: 1, flexGrow: 1
    // }

    btnContainer: {
        alignItems: 'center', height: 60, paddingTop: 10, paddingBottom: 10, justifyContent: "center"
    }

})

function mapStateToProps({ language }) {
    return { language }
}

export default LanguageChange;


{/* <List style={styles.list} >
                  {
                    list.map((item, i) => (
                  <TouchableOpacity
                  key={item.id}
                  onPress={() => this.navigate}
                  >
                  <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{ name: item.icon }}
                  />
                  </TouchableOpacity>
                    ))
                  }

                </List> */}
        //
        // const list = [
        //     {
        //         "title": "English",
        //         "id": "changePassword"
        //     },
        //     {
        //         "title": "Spanish",
        //         "id": "language"
        //     },
        //     {
        //         "title": "Mandarin",
        //         "id": "currency"
        //     },
        //     {
        //         "title": "German",
        //         "id": "walletame"
        //     },
        // ];
