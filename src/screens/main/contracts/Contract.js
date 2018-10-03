import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import BackWithMenuNav from "../../../components/customPageNavs/BackWithMenuNav";
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import RF from "react-native-responsive-fontsize";

// const navigate = () => {
//   const navigateToPassphrase = NavigationActions.reset({
//     index: 0,
//     actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
//   });
//   this.props.navigation.dispatch(navigateToPassphrase);
// };

/**
 * Screen is used to display the passphrase (mnemonic) of the wallet
 */
class Contract extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      contractLoaded: false,
      address: '',
    };
  }


  /**
   * Returns a component that allows the user to view the passphrase
   */
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
              <View style={styles.navContainer}>        
                <BackWithMenuNav
                    showMenu={true}
                    showBack={true}
                    // navigation={this.props.navigation}
                  />
              </View>
              <Text style={styles.textHeader}>Contract Interaction</Text>
              <Text style={styles.textDescription}>Load contract address</Text>
              <View style={styles.topFormInput}>
                <FormInput
                  placeholder={"Contract Address"}
                  onChangeText={(add) => { return this.setState({ address: add }); }}
                  inputStyle={styles.inputContactName}
                  placeholderTextColor={'#b3b3b3'}
                  value={this.state.address}
                />
              </View>

              <View style={styles.boxShadowContainer}>
                <View style={styles.contentContainer}>
                    <BoxShadowCard>
                   
                    </BoxShadowCard>
                </View>
              </View>
            <View style={styles.btnContainer}>               
                <View style={styles.footerGrandparentContainer}>
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

/**
 * Styles used in the BackupPhrase screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    justifyContent: 'center',
    width: '100%',
  },
  navContainer: {
    flex: 0.75,
  },
  boxShadowContainer: {
    alignItems: 'center', 
    flex: 3
  },
  topFormInput: {
    flex: 0.3,
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.75, 
  },
  inputContactName: {
    fontSize: RF(2.5),
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontFamily: 'WorkSans-Light',
    borderBottomWidth: 0.0001,
  },
  textDescription: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(3),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.3, 
  },
  contentContainer: {
    width: '82%',
    flex: 1,
  },
  cardText: {
    paddingBottom: '7.5%',
    paddingTop: '7.5%',
    paddingLeft: '7.5%',
    paddingRight: '7.55%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    letterSpacing: 0.4,
    fontSize: RF(2.4),
    lineHeight: RF(2.8),
  },
  mnemonicText: {
    paddingTop: '2.5%',
    paddingLeft: '7.5%',
    paddingRight: '7.55%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    color: '#12c1a2',
    fontSize: RF(2.2),
    lineHeight: RF(3),
  },
  btnContainer: {
    flex:2,
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
    marginBottom: '5%',
    marginTop: '5%',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(1.7),
    color: '#c0c0c0',
    letterSpacing: 0.5
  },
});

// const mapStateToProps = ({ newWallet }) => {
//   const mnemonic = newWallet.wallet.mnemonic;
//   const debugMode = newWallet.debugMode;
//   return { mnemonic, debugMode }
// }

export default connect(null, null)(Contract);
