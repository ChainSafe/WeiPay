import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native';
import CollapsibleList from 'react-native-collapsible-list'
var axios = require('axios');
var ethers = require('ethers');
var utils = ethers.utils;

/**
 * React Component
 * Contains a local history of all the transactions that have been occured
 * using the current wallet address
 */
class CoinActivity extends Component {

  /**
   * Sets the Tab header to "ACTIVITY"
   */

  constructor(props) {
    super(props)

    this.state = {
      balance: "",
      loaded: false,
      data: [],
      address: '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a'
    }

  }

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: 'ACTIVITY'
    }
  }

  componentDidMount() {
    this.getData(this.state.address);
  }

  getData = async (address) => {
    var url = 'https://api.etherscan.io/api?module=account&action=txlist&address=' + address + '&page=1&offset=10&sort=asc&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR';
    axios.get(url).then(response => {
      this.parseData(response.data.result);
      //console.log(response.data);

      // this.setState({
      //   data: response.data.result
      // })
    });
  }

  parseData = (json) => {
    //console.log(json);

    var transactions = [];

    for (var i = 0; i < json.length; i++) {
      var transObj = {}

      if (json[i].from == this.state.address) {
        transObj.type = 'sent'; //enum should be implemented
        transObj.address = json[i].to;
        transObj.uri = 'require(../../../Assets/images/sent.png)';
      } else {
        transObj.type = 'receive'; //enum should be implemented
        transObj.address = json[i].from;
        transObj.uri = 'require(../../../Assets/images/receive.png)';
      }
      transObj.value = utils.formatEther(json[i].value);
      transObj.blockNumber = json[i].blockNumber;
      transObj.timeStamp = json[i].timeStamp;
      transObj.hash = json[i].hash;
      transObj.blockHash = json[i].blockHash;
      transactions.push(transObj);
    }

    this.setState({
      data: transactions
    })

    //console.log(this.state.data);

  }


  /**
   * Returns a component holding a list of transactions that have been occured
   */
  render() {

    const list = this.state.data;
    console.log(list);

    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          style={{ flex: 1, width: '100%' }}
          renderItem={({ item }) =>

            <View style={styles.item}>


              <View>
                <View>
                  {item.type}
                </View>
                <View>
                  <Text>
                    Address: {item.address}
                  </Text>
                </View>
                <View>
                  <Text>
                    Amount: {item.value}
                  </Text>
                </View>
              </View>

              <CollapsibleList numberOfVisibleItems={1}>
                <View style={styles.collapsibleItem}>
                  <Text>Hello Collapsable List :)</Text>
                </View>
                <View style={styles.collapsibleItem}>
                  <Text>Collapsable List Item</Text>
                </View>
                <View style={styles.collapsibleItem}>
                  <Text>Collapsable List Item</Text>
                </View>
              </CollapsibleList>
            </View>
          } />

      </View>
    )
  }
}

export default CoinActivity

/**
 * Style
 */
const styles = StyleSheet.create({
  container: {
    // top: 20,
    // alignItems: 'center'
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 25,
    backgroundColor: 'blue',
  },
  item: {
    marginTop: 2.5,
    marginBottom: 2.5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'red',
    flex: 1
  }
})
