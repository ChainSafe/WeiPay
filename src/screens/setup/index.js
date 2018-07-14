import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button } from 'react-native-elements';
import { restoreWallet } from '../../actions/ActionCreator';

/**
 * Initial setup screen used to allow the user to either restore a previously
 * generated wallet or to create a new one.
 */
class CreateOrRestore extends Component {

    /**
     * Sets the title to "Create or Restore Wallet"
     */
    static navigationOptions = {
        header: null
        // headerStyle: {
        //     borderBottomWidth: 0,
        //     backgroundColor: "#fafbfe"
        // },
        // headerLeft: (
        //     <View style={{ paddingLeft: 35,   backgroundColor: "#fafbfe",  paddingTop: 15, borderBottomWidth: 0 }}>
        //        <Image
        //             source={require('../../assets/icons/back.png')}
        //             style={{height:20, width:20}}
        //         /> 
        //     </View>
        //   )    
    };

    /**
     * Method is used to navigate to the "createWalletName" if and only if the 
     * user decides to create a new wallet
     */
    navigateCreate = () => {
        const navigateToWalletName = NavigationActions.navigate({
            routeName: "createWalletName",
        });
        this.props.navigation.dispatch(navigateToWalletName);
    };

    /**
     * Method is used to navigate to the "createWalletNameRecovered" if and only if the 
     * user decides to recover thier wallet
     */
    navigateRestore = () => {
        const navigateToRecover = NavigationActions.navigate({
            routeName: "createWalletNameRecovered",
        });
        this.props.restoreWallet();
        this.props.navigation.dispatch(navigateToRecover);
    };

    /**
     * Returns a full screen component which presents the user with the choices in the form of
     * buttons
     */
    render() {
        return (
            <View style={styles.mainContainer}>               
                <View style={styles.secondaryContainer}>
                    <Text style={styles.textHeader} > WeiPay</Text>
                    <Text style={styles.textHeaderDescription} > ERC20 Token Wallet </Text>

                    <View style={styles.contentContainer} >

                        <View style={styles.btnContainer} >
                            <Button
                                title='Create Wallet'
                                icon={{ size: 28 }}
                                buttonStyle={{
                                    backgroundColor: '#12c1a2', borderRadius: 100, width: 300,
                                    height: 52, padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10
                                }}
                                textStyle={{ textAlign: 'center', color: 'white', fontSize: 16, fontFamily:"Cairo-Regular" }}
                                onPress={this.navigateCreate}
                            />
                            <Button
                                title='Restore Wallet'
                                icon={{ size: 28 }}
                                buttonStyle={{
                                    backgroundColor: '#061f46', borderRadius: 100, width: 300,
                                    height: 52, padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10
                                }}
                                textStyle={{ textAlign: 'center', color: 'white', fontSize: 16, fontFamily:"Cairo-Regular" }}
                                onPress={this.navigateRestore}
                            />
                        </View>
                    </View>                   
                </View>

                <Text style={styles.textFooter} >Powered by ChainSafe </Text> 
            </View>
        );
    }
}

/**
 * Styles used in the "CreateOrRestore" setup screen
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,     
        justifyContent: 'flex-start',
        backgroundColor: '#fafbfe',
        height: '100%',
        alignItems: 'center' ,
    },
    secondaryContainer : {
        flex:1,
        alignItems: 'center',
        marginTop: '50%'
    },
    contentContainer: {
        flex: 1,   
    },
    textHeader: {       
        fontFamily: "Cairo-Light",
        fontSize: 35,        
        marginBottom:-10,
        color: '#1a1f3e'
    },
    textHeaderDescription: {      
        color: '#1a1f3e',
        fontFamily: "Cairo-Regular",
        fontSize: 14,
        paddingLeft: 10,     
        letterSpacing: 3,
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 12,
        paddingBottom: 15,
        paddingTop: 15,
        justifyContent: 'center', 
        alignItems: 'center' ,
        color: '#c0c0c0'
    },
    btnContainer: {
        marginTop: 15,
        justifyContent: 'flex-end'
    },
})

export default connect(null, { restoreWallet })(CreateOrRestore);

