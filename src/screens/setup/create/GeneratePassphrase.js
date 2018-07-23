import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, TextInput, Image, Dimensions, Platform } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';
import { Input } from '../../../components/common/Input';
import LinearButton   from '../../../components/LinearGradient/LinearButton'

/**
 * Screen used to display the passphrase (mnemonic)
 */
class GeneratePassphrase extends Component {

    navigate = () => {
        const navigateToEnableTokens = NavigationActions.navigate({
            routeName: "confirmPassphrase",
            params: { wallet: this.props.navigation.state.wallet }
        });
        this.props.navigation.dispatch(navigateToEnableTokens);
    };

    render() {
        const { walletInfo } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerBack}> 
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('createWalletName')} >
                        <Image
                            source={require('../../../assets/icons/back.png')}
                            style={styles.btnBack}
                        /> 
                    </TouchableOpacity>
                </View>                
                <Text style={styles.textHeader} >Your Passphrase</Text>                                
                <View style={{flex:1}}> 
                    <View style={styles.contentContainer} >
                        <Card containerStyle={{ 
                            width: '80%', 
                            height: '55%', 
                            borderRadius: 7.5, 
                            shadowOpacity: 0.5, 
                            shadowRadius: 1.3, 
                            shadowColor: '#dbdbdb',
                            shadowOffset: { width: 1, height: 2 },                    
                        }}> 
                            <Text style={styles.cardText}>
                                Please write down your 12 word passphrase. You will need it to verify your wallet.
                            </Text>
                            <Text style={styles.textMnemonic}>
                            {walletInfo.wallet.mnemonic}
                            </Text>
                        </Card>
                    </View>

                <View style={styles.btnContainer}>
                    <LinearButton 
                        onClickFunction={this.navigate}
                        buttonText="Next"
                        customStyles={styles.button}
                        // buttonStateEnabled={this.state.buttonDisabled}
                    />

                    {/* <Button
                        //disabled={this.props.walletName === ""}
                        title='Next'
                        icon={{ size: 28 }}
                        buttonStyle={{
                            backgroundColor: '#12c1a2', borderRadius: 100, width: 300,
                            height: 52, padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10
                        }}
                        textStyle={{ textAlign: 'center', color: 'white', fontSize: 16, fontFamily:"Cairo-Regular" }}
                        onPress={this.navigate}
                    /> */}
                    <Text style={styles.textFooter} >Powered by ChainSafe </Text> 
                </View>    

                </View>
            </View>

            // <View style={styles.mainContainer}>
            //     <View style={styles.contentContainer} >
            //         <View style={styles.form} >
            //             <Text style={styles.walletName}>Wallet Name: {walletInfo.walletName}</Text>
            //             <Text style={styles.passphraseHeading}> Passphrase </Text>
            //             <CardSection>
            //                 <Text style={styles.passphrase}>{walletInfo.wallet.mnemonic}</Text>
            //             </CardSection>
            //             <View style={styles.btnContainer} >
            //                 <Button
            //                     // disabled={this.props.walletName === ""}
            //                     title='Next'
            //                     icon={{ size: 28 }}
            //                     buttonStyle={{
            //                         backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
            //                         height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30
            //                     }}
            //                     textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
            //                     onPress={this.navigate}
            //                 />
            //             </View>
            //         </View>
            //     </View>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fafbfe",
        width: '100%',
        marginTop: '2.5%'
    },
    contentContainer : {
        alignItems: 'center',
        flex: 1,
    },
    headerBack: {
        marginTop: Platform.OS === 'ios' ? '5%' : '5%',
        ...Platform.select({
          ios: { backgroundColor: '#fafbfe'},
          android: { backgroundColor: '#fafbfe'}
        }),
        marginLeft: '9%',       
    },   
    btnBack:{
        height:20, 
        width:20
    },
    button: {
        width: '82%'
    },
    cardText : {
        paddingBottom: '10%',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "WorkSans-Light",  
        color: '#000000',
        fontSize: 16,
    },
    textHeader: {       
        fontFamily: "Cairo-Light",
        fontSize: 24,        
        paddingLeft: 35,  
        paddingBottom: '3%',
        color: '#1a1f3e',
        alignSelf: 'flex-start',  
    },
    textMnemonic: {
        paddingLeft: 20,
        paddingRight: 20,
        color: '#12c1a2'
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 12,
        paddingBottom: 15,
        paddingTop: 15,
        justifyContent: 'flex-end', 
        alignItems: 'center',
        color: '#c0c0c0'
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 15,
        alignContent: 'flex-end'
    }
})

const mapStateToProps = ({ newWallet }) => {
    return { walletInfo: newWallet }
}

export default connect(mapStateToProps, null)(GeneratePassphrase)
