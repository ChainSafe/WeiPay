import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-elements';
import LinearButton from '../../../../../components/LinearGradient/LinearButton'
import BoxShadowCard from '../../../../../components/ShadowCards/BoxShadowCard'
/**
 * React-Native
 * Temporary Screen used until a contact is added
 */
class AddFirstContact extends Component {

  /**
   * Returns a full screen component with a button that navigates the user
   * to the addContact form
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{flex: 1}} />
        <View style={styles.contentContainer} >
          <BoxShadowCard>
            <Text style={styles.cardText}>
              You can save your friend's cryptocurrency addresses for fast, easy transactions
            </Text>
          </BoxShadowCard>
        </View>

        <View style={styles.btnContainer}>
          <LinearButton
            onClickFunction={this.props.setAddContactTab}
            buttonText="Add your first contact"
            customStyles={styles.button}
          />
        </View>

      </View>
    )
  }
}

/**
 * Styles used in the temporary screen used before any contact has been added
 */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: '5%',
    backgroundColor: "#fafbfe",
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer : {
    width: '82%',
    flex: 1.3,
    justifyContent: 'center'
  },
  cardText : {
    paddingBottom: '5%',
    paddingTop: '12%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontFamily: "WorkSans-Light",
    color: '#000000',
    fontSize: 16,
  },
  btnContainer: {
    flex: 1.6,
    alignItems: 'stretch',
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: '2%'
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082
  }
})

export default AddFirstContact
