import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux'

class CoinReceive extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'RECEIVE'
    }
  }

  render() {
    return (

      <View style={styles.mainContainer}>
        <View style={styles.contentContainer} >
          <View style={styles.form} >
            <View style={styles.imageContainer}>


              <QRCode
                value={this.props.walletAddress}
                size={200}
                bgColor='black'
                fgColor='white' />
            </View>

            <FormLabel> My Address </FormLabel>
            <FormInput style={styles.formInputElement} />
            <FormLabel> Request Amount </FormLabel>
            <FormInput style={styles.formInputElement} />
          </View>
          <View style={styles.btnContainer} >
            <Button
              A title='Next'
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'white', borderColor: '#2a2a2a', borderWidth: 2, borderRadius: 10,
                width: 300, height: 50, padding: 10, alignItems: 'center',
                justifyContent: 'center', marginBottom: 30, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a' }}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  barcode: {
    width: 165,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start'
  },
  contentContainer: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 340,
    flex: 1
  },
  btnContainer: {
    flex: 1, justifyContent: 'flex-end', alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 35
  }
})

const mapStateToProps = state => {
  return {
    walletAddress: state.newWallet.wallet.address,
  }
}

export default connect(mapStateToProps, null)(CoinReceive)

