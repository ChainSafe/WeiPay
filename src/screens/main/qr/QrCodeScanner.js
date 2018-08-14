import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import Camera from 'react-native-camera';
import { NavigationActions } from "react-navigation";
import { getQRCodeData } from '../../../actions/ActionCreator'
import { saveAddContactInputs } from '../../../actions/ActionCreator'
import ContactAddresses from '../menu/contacts/SelectedContact';
import RF from "react-native-responsive-fontsize"

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
            currentContactName: this.props.data.contactName,
            previousInputs: this.props.data.allAddressInputs,
            coinInvoker: this.props.data.coinName
        }
    }

    /**
     * Method invoked whenever the camera scans a qrcode.
     * After being invoked the local state variable is updated with 
     * the data in the QrCode, and the 'getQRCodeData' action is invoked in
     * order to update the global state variable
     */
    onBarCodeRead = (e) => {
        this.setState({ qrcode: e.data })
        if (this.state.invoker == "CoinSend") {
            this.props.getQRCodeData(e.data)
        } else {
            let oldInputs = this.state.previousInputs
            oldInputs[this.state.coinInvoker] = e.data
            let contactInputs = {}
            contactInputs["name"] = this.state.currentContactName
            contactInputs["ContactAddresses"] = oldInputs

            this.props.saveAddContactInputs(contactInputs)
        }
    };

    /**
     * Returns a screen with the react-native-camera component as the background
     *  - a text box to  see the text that was scanned
     *  - a button to go back to the invoking screen and fill in the input field
     */
    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <Camera
                        style={styles.preview}
                        onBarCodeRead={this.onBarCodeRead}
                        ref={cam => this.camera = cam}
                        aspect={Camera.constants.Aspect.fill}
                    >
                        <Text style={styles.textStyle}>{this.state.qrcode}</Text>
                        <Button
                            title='Next'
                            style={styles.buttonStyle}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </Camera>
                </View>
            </SafeAreaView>
        )
    }
}

/**
 * Styles for QrCode Scanner component
 */
const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1, 
        backgroundColor: '#fafbfe'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    textStyle: {
        backgroundColor: 'white'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: "blue",
        padding: 10
    },
})

/**
 * Reterives the name of the page that invoked the screen.
 * @param {Object} state 
 */
const mapStateToProps = ({ newWallet, QrScanner }) => {
    return {
        invoker: QrScanner.invoker,
        data: QrScanner.data
    }
}

export default connect(mapStateToProps, { getQRCodeData, saveAddContactInputs })(QrCodeScanner);