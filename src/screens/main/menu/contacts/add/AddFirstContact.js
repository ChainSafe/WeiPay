import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import LinearButton from '../../../../../components/LinearGradient/LinearButton'
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
        <View style={styles.contentContainer} >
          <Card containerStyle={{
            width: '82%',
            height: '27.5%',
            borderRadius: 7.5,
            shadowOpacity: 0.5,
            shadowRadius: 1.3,
            shadowColor: '#dbdbdb',
            shadowOffset: { width: 1, height: 2 },
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={styles.cardText}>
              You can save your friend's cryptocurrency addresses for fast, easy transactions
            </Text>
          </Card>
        </View>

        <View style={styles.btnContainer}>
          <LinearButton
            onClickFunction={() => this.props.navigate('addContact')}
            buttonText="Add your first contact"
            customStyles={styles.button}
          />
        </View>
        <View style={{ alignItems:'center'}} >
          <View style={{ alignItems:'center'}} >
            <Text style={styles.textFooter} >Powered by ChainSafe </Text>
          </View>
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
        alignItems: 'center'
  },

  contentContainer : {
      alignItems: 'stretch',
      justifyContent: 'center',
      flex: 1
  },
  cardText : {
    paddingBottom: '5%',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontFamily: "WorkSans-Regular",
    color: '#000000',
    fontSize: 16,
  },
  btnContainer: {
    alignItems: 'stretch',
    marginRight: '9%',
    width: '100%',
  },
  textFooter : {
      fontFamily: "WorkSans-Regular",
      fontSize: 11,
      marginTop: '3.5%',
      color: '#c0c0c0'
  }
})

export default AddFirstContact
