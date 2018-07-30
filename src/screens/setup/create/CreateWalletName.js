import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text, Keyboard, Platform, Dimensions, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FormInput, Card } from 'react-native-elements';
import { newWalletCreation, newWalletNameEntry } from '../../../actions/ActionCreator';
import LinearButton   from '../../../components/LinearGradient/LinearButton'
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard'
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
const ethers = require('ethers');

/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * a new wallet has been created
 */
class CreateWalletName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
    };
  }

    /**
     * Method is used to save the newly generated wallet (via ethers.js) in the global state
     * variable and to navigate to the "generatePassphrase" screen
     */
    navigate = () => {
      const wallet = ethers.Wallet.createRandom();
      this.props.newWalletCreation(wallet);
      const navigateToPassphrase = NavigationActions.navigate({ routeName: 'generatePassphrase' });
      this.props.navigation.dispatch(navigateToPassphrase);
    };

    /**
     * Executes the action "newWalletNameEntry" with "name" as the parameter
     * in order to update the name of the wallet in the global state variable
     * @param {String} name
     */
    getWalletName(name) {
      this.props.newWalletNameEntry(name);
      this.setState({ buttonDisabled: false });
    }

    /**
     * Main Component
     * Returns the form required for the user to set the name of their wallet
     */
    render() {
      const {
        mainContainer,
        textHeader,
        contentContainer,
        cardContainer,
        cardText,
        txtWalletName,
        btnContainer,
        button,
        footerGrandparentContainer,
        footerParentContainer,
        textFooter,
      } = styles;

      return (
        <SafeAreaView style={styles.safeAreaView}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.mainContainer} >
                    <View style={styles.navContainer}>        
                        <BackWithMenuNav
                            showMenu={false}
                            showBack={true}
                            navigation={this.props.navigation}
                            backPage={'createOrRestore'}
                        />
                    </View>                    
                    <Text style={styles.textHeader} >Wallet Name</Text>
                    <View style={styles.boxShadowContainer}>
                        <View style={styles.contentContainer}>
                            <BoxShadowCard>
                                <Text style={styles.cardText}>
                                    Create a name for your wallet, for example: My Wallet
                                </Text>
                                <FormInput
                                    placeholder={'Ex. My Wallet'}
                                    onChangeText={this.getWalletName.bind(this)}
                                    inputStyle={styles.txtWalletName}
                                /> 
                            </BoxShadowCard>
                        </View>
                    </View>
                    <View style={btnContainer}>
                        <LinearButton
                            onClickFunction={this.navigate}
                            buttonText="Next"
                            customStyles={button}
                            // buttonStateEnabled={this.state.buttonDisabled}
                        />
                        <View style={styles.footerGrandparentContainer} >    
                            <View style={styles.footerParentContainer} >
                                <Text style={styles.textFooter} >Powered by ChainSafe </Text> 
                            </View>  
                        </View> 
                    </View>                   
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1, 
        backgroundColor: '#fafbfe'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fafbfe',
        width: '100%',   
    },
    navContainer: {
        flex: 0.75,
    },
    boxShadowContainer: {
        alignItems: 'center', 
        flex: 3,
    },
    textHeader: {
        fontFamily: 'Cairo-Light',
        fontSize: 26,
        letterSpacing: 0.8,
        paddingLeft: '9%',
        color: '#1a1f3e',
        flex: 0.75, 
    },
    contentContainer: {
        flex: 1,
        width: '82%',
    },
    cardText: {
        paddingBottom: '20%',
        paddingTop: '7.5%',
        paddingLeft: '7.5%',
        paddingRight: '7.5%',
        fontFamily: 'WorkSans-Light',
        color: '#000000',
        lineHeight: 22,
        letterSpacing: 0.4,
        fontSize: 16,
    },
    txtWalletName: {
        width: '100%',
        flexWrap: 'wrap',
        color: '#12c1a2',
        letterSpacing: 0.4,
        fontSize: 16,
        fontFamily: 'WorkSans-Regular',  
    },
    btnContainer: {
        flex: 2,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        width: '100%',
    },
    button: {
        width: '82%',
        height: Dimensions.get('window').height * 0.082,  
    },
    footerGrandparentContainer: {
        alignItems: 'center',
        marginBottom: '3%',
        marginTop: '3%',
    },
    footerParentContainer: {
        alignItems: 'center',
    },
    textFooter: {
        fontFamily: 'WorkSans-Regular',
        fontSize: 11,
        color: '#c0c0c0',
    },
})

/**
 * This method is not being used here
 * @param {Object} param
 */
const mapStateToProps = ({ newWallet }) => {
  const { walletName } = newWallet;
  return { walletName };
};

export default connect(mapStateToProps, { newWalletNameEntry, newWalletCreation })(CreateWalletName);
