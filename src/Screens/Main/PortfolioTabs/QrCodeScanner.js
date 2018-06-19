import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import Camera from 'react-native-camera';
import { NavigationActions } from "react-navigation";
import { getQRCodeData } from '../../../Actions/actionCreator'

class QrCodeScanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toAddress: "",
            value: 0,
            resetInput: false,
            qrcode: ''
        }

    }

    onBarCodeRead = (e) => {
        this.setState({ qrcode: e.data })
        this.props.getQRCodeData(e.data)
    };

    renderDataConfirm() {
        console.log("Button was clicked");

    }

    navigate = () => {
        const navigateToEnableTokens = NavigationActions.navigate({
            routeName: "PortfolioCoin",
            params: { name: "Shubhnik" }
        });
        this.props.navigation.dispatch(navigateToEnableTokens);
    };


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

const mapStateToProps = state => {
    return {
        QrData: state.newWallet.QrData
    }
}

export default connect(mapStateToProps, { getQRCodeData })(QrCodeScanner);