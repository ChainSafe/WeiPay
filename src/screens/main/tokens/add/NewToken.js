import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions, Keyboard, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';
import TokenConfig from '../../../../scripts/tokens/tokenConfig';
import { qrScannerInvoker } from '../../../../actions/ActionCreator';
import { addNewToken } from '../../../../actions/AppConfig';
import LinearButton from '../../../../components/linearGradient/LinearButton';
import BoxShadowCard from '../../../../components/shadowCards/BoxShadowCard';

class NewToken extends Component {
  state = {
    tokenName: '',
    tokenAddress: '',
  }

  complete = () => {
    if (this.state.tokenAddress !== '' && this.state.tokenName !== '') {
      this.setState({ tokenAddress: '' });
      this.setState({ tokenName: '' });
      const newTokenObj = TokenConfig('addNew', {
        "name": "NA",
        "address": this.state.tokenAddress,
        "symbol": this.state.tokenName,
        "id": this.props.tokens.length,
        "decimals": 18,
      });
      this.props.addNewToken(newTokenObj, this.props.tokens);
    }
  }

  updateAddress(address) {
    this.setState({ tokenAddress: address });
  }

  updateName(name) {
    this.setState({ tokenName: name });
  }

  navigate = () => {
    this.props.qrScannerInvoker('AddTokenFunctionality');
    const navigateToQRScanner = NavigationActions.navigate({
      routeName: 'QCodeScanner',
    });
    this.props.navigation.dispatch(navigateToQRScanner);
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <View style={styles.boxShadowContainer}>
            <BoxShadowCard>
              <Text style={styles.cardText}>
                  Enter ERC20 Token Address with it's name
              </Text>
              <View style= {styles.barcodeImageContainer}>
                <TouchableOpacity onPress={() => { return this.navigate(); }}>
                  <Image
                    source={require('../../../../assets/icons/barcode.png')}
                    style={styles.barcodeImage}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.formInputContainer}>
                <FormInput
                  placeholder={'Token Address'}
                  onChangeText={this.updateAddress.bind(this)}               
                  inputStyle={styles.formAddress}
                  value={this.state.tokenAddress}
                />
              </View>
              <View style={styles.formInputContainer}>
                <FormInput
                  placeholder={'Token Symbol'}
                  onChangeText={this.updateName.bind(this)}                
                  inputStyle={styles.formAddress}
                  value={this.state.tokenName}
                />
              </View>
            </BoxShadowCard>
          </View>
          <View style={styles.btnContainer}>
            <LinearButton
              onClickFunction={this.complete}
              buttonText='Add New Token'
              customStyles={styles.button}
            />
            <View style={styles.footerGrandparentContainer}>
              <View style={styles.footerParentContainer} >
                <Text style={styles.textFooter} >Powered by ChainSafe </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  navContainer: {
    flex: 0.65,
  },
  navHeaderContainer: {
    flex: 0.3,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    justifyContent: 'center',
    width: '100%',
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  activityHorizontal: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  warningText: {
    color: 'white',
    fontSize: RF(2.8),
    fontFamily: 'Cairo-Light',
    letterSpacing: 0.4,
    paddingBottom: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  maliciousCommentText: {
    color: 'red',
    fontSize: RF(2.1),
    marginLeft: '5%',
  },
  boxShadowContainer: {
    flex: 2.25,
    marginLeft: '9%',
    marginRight: '9%',
    marginTop: '10%',
  },
  contentContainer: {
    width: '82%',
    flex: 1,
  },
  cardText: {
    paddingBottom: '5%',
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'WorkSans-Light',
    fontSize: RF(2.4),
    color: '#000000',
    letterSpacing: 0.4,
  },
  barcodeImageContainer: {
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingLeft: '10%',
  },
  barcodeImage: {
    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.18,
  },
  formAmount: {
    width: '90%',
    fontSize: RF(2.2),
    color: '#12c1a2',
    flexWrap: 'wrap',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
  },
  formAddress: {
    width: '90%',
    fontSize: RF(2.2),
    color: '#12c1a2',
    flexWrap: 'wrap',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    paddingBottom: '3%',
  },
  displayFeeText: {
    width: '90%',
    marginLeft: '10.5%',
    fontSize: RF(1.4),
    letterSpacing: 0.3,
    fontFamily: 'WorkSans-Light',
    marginTop: '2%',
  },
  formInputContainer: {
    marginLeft: '4.5%',
    marginRight: '4.5%',
    marginTop: '2.5%',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '82%',
    alignContent: 'center',
    marginLeft: '9%',
    marginRight: '9%',
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
    letterSpacing: 0.5,
  },

});

const mapStateToProps = ({ newWallet, Wallet }) => {
  return {
    newTokenAddress: newWallet.newTokenAddress,
    newTokenName: newWallet.newTokenName,
    tokens: Wallet.tokens,
    QrCodeData: newWallet.QrData,
  };
};

export default connect(mapStateToProps, { qrScannerInvoker, addNewToken })(NewToken);
