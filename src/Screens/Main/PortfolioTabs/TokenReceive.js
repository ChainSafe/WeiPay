import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';

class TokenReceive extends Component {
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
              <Image style={styles.barcode} source={require('../../../Assets/images/QR-CODE.png')} />
            </View>
            <FormLabel> My Address </FormLabel>
            <FormInput style={styles.formInputElement} />
            <FormLabel> Request Amount </FormLabel>
            <FormInput style={styles.formInputElement} />
          </View>
          <View style={styles.btnContainer} >
            <Button
              title='Next'
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
                justifyContent: 'center', marginBottom: 30, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center' }}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default TokenReceive

const styles = StyleSheet.create({
  barcode: {
    width: 165,
    height: 165
  },
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
  imageContainer: {
    justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 35
  }
})
