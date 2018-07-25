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
                    <View style={styles.contentContainer} >
                        <Card containerStyle={styles.cardContainer}> 
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
                </View>    
                <View style={styles.footerGrandparentContainer} >    
                    <View style={styles.footerParentContainer} >
                        <Text style={styles.textFooter} >Powered by ChainSafe </Text> 
                    </View>  
                </View>             
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fafbfe",
        width: '100%',
        paddingTop: '5%'
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
    textHeader: {       
        fontFamily: "Cairo-Light",
        fontSize: 26,        
        paddingLeft: '10%',  
        paddingBottom: '3%',
        marginTop: '5%',
        color: '#1a1f3e',
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
        lineHeight: 22,       
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        fontFamily: "WorkSans-Light",  
        color: '#000000',
        fontSize: 16,
    },
    cardContainer:{
        width: '80%', 
        height: '55%', 
        borderRadius: 7.5, 
        shadowOpacity: 0.5, 
        shadowRadius: 1.3, 
        shadowColor: '#dbdbdb',
        shadowOffset: { width: 1, height: 2 }   
    },
    textMnemonic: {
        paddingLeft: '5%',
        paddingRight: '5%',
        color: '#12c1a2',
        lineHeight: 26,    
        letterSpacing: 0.4   
    },
    btnContainer: {
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        paddingTop: 15,
        alignContent: 'flex-end'
    },
    footerGrandparentContainer : {
        alignItems:'center'
    },
    footerParentContainer :{ 
        alignItems:'center'
    },
    textFooter : {
        fontFamily: "WorkSans-Regular",
        fontSize: 11,      
        marginTop: '3.5%', 
        color: '#c0c0c0'
    },
})

const mapStateToProps = ({ newWallet }) => {
    return { walletInfo: newWallet }
}

export default connect(mapStateToProps, null)(GeneratePassphrase)
