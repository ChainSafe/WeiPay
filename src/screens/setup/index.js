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
        headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fafbfe"
        },  
        headerLeft: (
            <View style={{ marginLeft: 35, backgroundColor: "#fafbfe",  paddingTop: 15, borderBottomWidth: 0 }}> </View>                
        )      
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
                <Text style={styles.textHeader} > WeiPay</Text>
                <Text style={styles.textHeaderDescription} > ERC20 Token Wallet </Text>
                <View style={styles.btnContainer} >
                    <View style={styles.btn}>
                        <Button
                            title='Create Wallet'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: '#12c1a2', 
                                borderRadius: 100, 
                                width: '84%',
                                height: 52,                                  
                                alignItems: 'center', 
                                justifyContent: 'center',                                  
                                marginLeft: '7.5%'
                            }}
                            textStyle={{ 
                                textAlign: 'center', 
                                color: 'white', 
                                fontSize: 16, 
                                fontFamily:"Cairo-Regular" 
                            }}
                            onPress={this.navigateCreate}
                        />
                    </View>
                    <View>
                        <Button
                            title='Restore Wallet'
                            icon={{ size: 28 }}
                            buttonStyle={{
                                backgroundColor: 'transparent', 
                                borderColor: '#12c1a2',
                                borderRadius: 100, 
                                borderWidth: 1,                               
                                width: '84%',
                                height: 52,                                  
                                alignItems: 'center', 
                                justifyContent: 'center',                                  
                                marginLeft: '7.5%'
                            }}
                            textStyle={{ 
                                textAlign: 'center', 
                                color: '#12c1a2', 
                                fontSize: 16, 
                                fontFamily:"Cairo-Regular" 
                            }}
                            onPress={this.navigateRestore}
                        />
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.textFooter} >Powered by ChainSafe </Text> 
                </View>
            </View>
        );
    }
}

/**
 * Styles used in the "CreateOrRestore" setup screen
 */
const styles = StyleSheet.create({
    mainContainer: {        
        backgroundColor: '#fafbfe',
        width: '100%',  
        paddingTop: '40%',
        height: '100%',
        flex: 1,     
        alignItems: 'center' 
    },
    textHeader: {       
        fontFamily: "Cairo-Light",
        fontSize: 34,        
        marginBottom: '-2.5%',
        color: '#1a1f3e'
    },
    textHeaderDescription: {      
        color: '#1a1f3e',
        fontFamily: "Cairo-Regular",
        fontSize: 14,    
        letterSpacing: 3
    },
    btnContainer: {
        alignItems:'stretch',
        width: '100%',
        justifyContent: 'flex-end'
    },
    btn: {
        marginBottom: '3.5%',
        marginTop: '10%'
    },
    footerContainer: {
        alignItems:"center", 
        position: 'absolute', 
        bottom: '5%', 
        flex:1, 
        justifyContent:'flex-end' 
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 11,
        color: '#c0c0c0'
    }
})

export default connect(null, { restoreWallet })(CreateOrRestore);

