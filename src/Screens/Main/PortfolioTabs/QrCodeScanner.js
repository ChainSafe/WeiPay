import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import Camera from 'react-native-camera';
import { NavigationActions } from "react-navigation";
import { getQRCodeData } from '../../../Actions/actionCreator'

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
            toAddress: "",
            value: 0,
            resetInput: false,
            qrcode: ''
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
        this.props.getQRCodeData(e.data)
    };

    /**
     * Is used to Navigate to the Coin Portfolio where the user
     * can send/receive transactions and view thier activity
     */
    navigate = () => {
        const navigateToEnableTokens = NavigationActions.navigate({
            routeName: "PortfolioCoin",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateToEnableTokens);
    };

    /**
     * Main Qr Code scanner.
     * Full screen camera
     * With a button to confirm the scan
     */
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    contentContainer: {
        marginTop: 25
    },
    form: {
        width: 340
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
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
        QrData: state.newWallet.QrData
    }
}

export default connect(mapStateToProps, { getQRCodeData })(QrCodeScanner);