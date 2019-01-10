import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions, Keyboard, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';
import TokenConfig from '../../../../../scripts/tokens/tokenConfig';
import { qrScannerInvoker } from '../../../../store/actions/ActionCreator';
import { addNewToken, setQrInvoker } from '../../../../store/actions/creators/AppConfig';
import LinearButton from '../../../../components/linearGradient/LinearButton';
import BoxShadowCard from '../../../../components/shadowCards/BoxShadowCard';

class NewToken extends Component {
  constructor(props) {
    super(props);
    let addr = '';
    if (this.props.qrInvoker === 'AddTokenFunctionality') {
      addr = this.props.qrData;
    }

    this.state = {
      tokenName: '',
      tokenAddress: addr,
    };
  }


  complete = () => {
    if (this.state.tokenAddress && this.state.tokenName) {
      
      // this.setState({ tokenName: '' });
      const newTokenObj = TokenConfig('addNew', {
        'name': 'NA',
        'address': this.state.tokenAddress,
        symbol: this.state.tokenName,
        id: this.props.tokens.length,
        'decimals': 18,
      });
      this.props.addNewToken(newTokenObj, this.props.tokens);
			this.setState({ tokenAddress: '', tokenName: '' });
    }
  }

  updateAddress(address) {
    this.setState({ tokenAddress: address });
  }

  updateName(name) {
    this.setState({ tokenName: name });
  }

  navigate = () => {
    this.props.setQrInvoker('AddTokenFunctionality');
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
                  {`Enter ERC20 Token Address with it's name`}
              </Text>
              <View style= {styles.barcodeImageContainer}>
                <TouchableOpacity onPress={() => { return this.navigate(); }}>
                  <Image
                    source={require('../../../../../assets/icons/barcode2.png')}
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
                  selectionColor={'#12c1a2'}
                />
              </View>
              <View style={styles.formInputContainer}>
                <FormInput
                  placeholder={'Token Symbol'}
                  onChangeText={this.updateName.bind(this)}
                  inputStyle={styles.formAddress}
                  value={this.state.tokenName}
                  selectionColor={'#12c1a2'}
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
    backgroundColor: '#f4f7f9',
  },
  navContainer: {
    flex: 0.65,
  },
  navBar: {
    flex: 0.75,
    paddingBottom: '2%',
  },
  navHeaderContainer: {
    flex: 0.3,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f4f7f9',
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
    flex: 2.5,
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
    marginBottom: '2.5%',
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

const mapStateToProps = ({ Wallet, QrScanner }) => {
  return {
    // newTokenAddress: newWallet.newTokenAddress,
    // newTokenName: newWallet.newTokenName,
    tokens: Wallet.tokens,
    // QrCodeData: newWallet.QrData,
    qrData: QrScanner.data,
    qrInvoker: QrScanner.invoker,
  };
};

export default connect(mapStateToProps, { qrScannerInvoker, addNewToken, setQrInvoker })(NewToken);
