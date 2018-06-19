import React, { Component } from 'react';
import { Text, View, TextInput, ListView, StyleSheet } from 'react-native';
import { CardSection } from '../../../Components/common/CardSection';
import { Card } from '../../../Components/common/Card';
import { Button } from 'react-native-elements'
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
    // debugger
    console.log(Card)
    console.log("CARD SECTION", CardSection)
    return (
      <View>

        <Card>
          <View style={styles.address}>
            <Text style={styles.title}>{Object.keys(address)[0]}'s Address</Text>
            <Button
              title="Send"
              titleStyle={{fontWeight: '700', color: 'black', fontSize: 5}}
              buttonStyle={{backgroundColor: 'blue', borderColor: 'blue', borderWidth: 0, borderRadius: 10, height: 15}}
              containerStyle={{width: 130}}
              onPress={() => this.navigate(address[Object.keys(address)[0]])}
            />
          </View>
          <Text>
            {address[Object.keys(address)[0]]}
          </Text>
        </Card>
        
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
  },
  address: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
})

export default ContactAddresses
