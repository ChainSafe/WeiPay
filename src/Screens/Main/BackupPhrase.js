import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { CardSection } from '../../Components/common/CardSection';

class BackupPhrase extends Component {

  constructor(props) {
    super(props);
    this.state = { isPhraseSelected: false };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Backup Phrase',
      headerLeft: (
        <Icon
          name="menu"
          onPress={() => navigation.navigate('DrawerOpen')}
          title="SideMenu"
        />
      )
    }
  }

  displayPassphrase() {
    console.log("display checked");
    this.setState({
      isPhraseSelected: true
    });
  }

  renderPassphrase = () => {
    if (this.state.isPhraseSelected) {
      return (
        <CardSection>
          <Text> cat  </Text>
        </CardSection>
      )
    }
    else { return null; }
  }


  render() {
    return (

      <View style={styles.mainContainer}>
        <View style={styles.contentContainer} >
          <Text style={styles.title} > Your Wallet is secure now  </Text>
          <Text style={styles.description} > To view your backup passphrase, continue.</Text>
          {this.renderPassphrase()}


          <View style={styles.btnContainer} >
            <Button
              title='Show Backup Passphrase'
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
                justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center' }}
              onPress={this.displayPassphrase.bind(this)}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start'
  },
  contentContainer: {
    marginTop: 25,
  },
  btnContainer: {
    flex: 1, justifyContent: 'flex-end', alignItems: 'center'
  },
  title: {
    alignSelf: "center"
  },
  description: {
    alignSelf: "center"
  }
})

export default BackupPhrase
