import React, { Component } from 'react';
import { Text, View, TextInput, ListView, StyleSheet, Button } from 'react-native';
import CardSection from '../../../Components/common/Card';
import Card from '../../../Components/common/Card';
import { NavigationActions } from 'react-navigation';

class ContactAddresses extends Component {
  componentWillMount() {
    let addresses = this.props.navigation.state.params.addresses
    let data = []

    for (const key of Object.keys(addresses)) {
        address = { [key]: addresses[key]}
        data.push(address)
    }

    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(data);
  }

  navigate = address => {

    const navigateToCreateOrRestore = NavigationActions.navigate({
        routeName: 'PortfolioCoin',
        params: { address }
    });
      
    this.props.navigation.dispatch(navigateToCreateOrRestore);
  };

  renderRow(address) {
    return (
      <View>
        <CardSection>
          <Text style={styles.title}>{Object.keys(address)[0]}'s Address</Text>
          <Card>

            <TextInput
              placeholder="Enter or Paste Address here"
              onChangeText={(text) => this.renderAddress(text)}
              value={address[Object.keys(address)[0]]}
            />
            <Button title="Send" onPress={() => this.navigate(address[Object.keys(address)[0]])}/>
          </Card>
        </CardSection>
      </View>
    )
  }

  render() {
    return (
      <View>
        <ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} removeClippedSubviews={false} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
      fontWeight: "bold",
      fontSize: 13,
      color: "black",
      textShadowRadius: 3
  }
})

export default ContactAddresses
