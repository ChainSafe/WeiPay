import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Camera from 'react-native-camera';
import { NavigationActions } from 'react-navigation';
import RF from 'react-native-responsive-fontsize';
import * as actions from '../../../actions/ActionCreator';
import { getQRCodeData } from '../../../actions/ActionCreator';
import { updateSavedContactInputs } from '../../../actions/ActionCreator';
import ContactAddresses from '../menu/contacts/SelectedContact';

/**
 * React Component
 * Full Screen component used to scan QrCodes and save the Qr-data in
 * state
 */
class QrCodeScanner extends Component {
  /**
     * Initializes the "qrcode" variable, which can be used to
     * keep track of the data scanned by the scanner.
     * The parameters that were passed from the addContact screen are also assigned in
     * state
     * @param {Object} props
     */
  constructor(props) {
    super(props);
    this.state = {
      qrcode: '',
      invoker: this.props.invoker,
      coinInvoker: this.props.coinInvoker,
      previousInputs: this.props.currentContact,
    };
  }

    navigate = () => {
  
      const navigateToCreateOrRestore = NavigationActions.navigate({
        routeName: this.state.invoker,
      });
      this.props.navigation.dispatch(navigateToCreateOrRestore);
    };

    /**
     * Method invoked whenever the camera scans a qrcode.
     * After being invoked the local state variable is updated with
     * the data in the QrCode, and the 'getQRCodeData' action is invoked in
     * order to update the global state variable
     */
    onBarCodeRead = (e) => {
      this.setState({ qrcode: e.data });
      if (this.state.invoker === 'TokenFunctionality') { // Coin Send page
        this.props.getQRCodeData(e.data);
      } else if (this.state.invoker === 'AddTokenFunctionality') {
        this.props.updateNewTokenAddress(e.data);
      } else {
        const oldInputs = this.state.previousInputs;
        oldInputs.contactAddress[this.state.coinInvoker] = e.data;
        const contactInputs = oldInputs;
        this.props.updateSavedContactInputs(contactInputs);
      }
    };


    /**
     * Returns a screen with the react-native-camera component as the background
     *  - a text box to  see the text that was scanned
     *  - a button to go back to the invoking screen and fill in the input field
     */
    render() {
      return (
            <View style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={(cam) => { return this.camera = cam; }}
                    aspect={Camera.constants.Aspect.fill}
                    showMarker={true}
                >
                    <Text style={{ backgroundColor: 'white' }}>
                        {this.state.qrcode}
                    </Text>
                    <Button
                        title='Next'
                        style={styles.buttonStyle}
                        // onPress={() => this.props.navigation.goBack()}
                        onPress={ () => { return this.navigate(); } }
                    />
                </Camera>
            </View>
      );
    }
}

/**
 * Styles for QrCode Scanner component
 */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentContainer: {
    marginTop: 25,
  },
  form: {
    width: 340,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonStyle: {
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

/**
 * Reterives the name of the page that invoked the screen.
 * @param {Object} state
 */
const mapStateToProps = ({ QrScanner, contacts }) => {
  return {
    invoker: QrScanner.invoker,
    coinInvoker: QrScanner.coinInvoker,
    currentContact: contacts.incompleteContactInputs,
  };
};

export default connect(mapStateToProps, actions)(QrCodeScanner);
