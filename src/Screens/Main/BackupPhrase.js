import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { CardSection } from '../../Components/common/CardSection';

const navigate = () => {
  const navigateToPassphrase = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
  });
  this.props.navigation.dispatch(navigateToPassphrase);
};


class BackupPhrase extends Component {

  constructor(props) {
    super(props);
    this.state = { isPhraseSelected: false };
  }

  static navigationOptions = ({ navigation, NavigationActions }) => {

    const navigate = () => {
      const navigateToPassphrase = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Drawer' })]
      });
      this.props.navigation.dispatch(navigateToPassphrase);
    };

    return {
      title: 'Backup Phrase',
      headerLeft:
        <Icon
          name='chevron-left'
          size={35}
          color='#007AFF'
          onPress={() => navigation.navigate('Drawer')}
        />
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
        <CardSection >
          <Text style={styles.recovered}> cat Ten Other words gucci fam love some new words hello world </Text>
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
              disabled={this.state.isPhraseSelected}
              title='Show Backup Passphrase'
              icon={{ size: 28 }}
              buttonStyle={{
                backgroundColor: 'transparent', borderColor: '#2a2a2a', borderWidth: 1, borderRadius: 100, width: 300,
                height: 50, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 5.5
              }}
              textStyle={{ textAlign: 'center', color: '#2a2a2a', fontSize: 15 }}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  contentContainer: {
    marginTop: 25,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    alignSelf: "center",
    fontWeight: '300'
  },
  description: {
    alignSelf: "center",
    fontWeight: '200',
    paddingBottom: 15
  },
  recovered: {
    width: Dimensions.get('window').width - 80,
    padding: 10
  }
})

export default BackupPhrase
