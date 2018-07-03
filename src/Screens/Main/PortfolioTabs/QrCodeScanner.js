import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import Camera from 'react-native-camera';
import { NavigationActions } from "react-navigation";
import { getQRCodeData } from '../../../Actions/actionCreator'
import { saveAddContactInputs } from '../../../Actions/actionCreator'
import ContactAddresses from '../SettingsSubPages/ContactAddresses';

/**
 * React Component
 * Full Screen component used to scan QrCodes and save the Qr-data in
 * state
 */
class QrCodeScanner extends Component {

    /**
     * Initializes the "qrcode" variable, which can be used to
     * keep track of the data scanned by the scanner
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            qrcode: '',
            invoker: this.props.navigation.state.params.invoker,
            currentContactName: this.props.navigation.state.params.contactName,
            previousInputs: this.props.navigation.state.params.allAddressInputs,
            coinInvoker: this.props.navigation.state.params.coinName


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
     * Is used to Navigate to the Coin Portfolio where the user
     * can send/receive transactions and view thier activity
     */
    navigate = () => {
        const navigateToEnableTokens = NavigationActions.navigate({
            routeName: this.state.invoker,
            params: { name: "Shubhnik", coinName: this.props.navigation.state.params.coinName, address: this.state.qrcode }
        });
        this.props.navigation.dispatch(navigateToEnableTokens);
    };

    //-------------
    // [{…}, {…}]
    // 0: {name: "Hello", contactAddress: {…}}
    // 1: {name: "Jshzhzh", contactAddress: {…}}
    //-----------------

    testing() {

        this.props.navigation.goBack()
    }

    render() {


        return (
            <View style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.camera = cam}
                    aspect={Camera.constants.Aspect.fill}
                >
                    <Text style={{
                        backgroundColor: 'white'
                    }}

                    >{this.state.qrcode}</Text>

                    <Button
                        title='Next'
                        style={styles.buttonStyle}
                        onPress={() => this.navigate()}
                    />
                </Camera>
            </View>
        )
    }

}


/**
 * Styles for QrCode Scanner component
 */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25
    },
    form: {
        width: 340
    },
    btnContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },

    buttonStyle: {
        backgroundColor: "blue",
        padding: 10
    },

    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

/**
 * Is not being used.
 * @param {Object} state 
 */
const mapStateToProps = state => {
    return {
        Invoker: state.newWallet.QrScannerInvoker

    }
}

export default connect(mapStateToProps, { getQRCodeData, saveAddContactInputs })(QrCodeScanner);