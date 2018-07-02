import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native';
import { FormLabel } from 'react-native-elements';
import { CardSection } from '../../../Components/common/CardSection';
var axios = require('axios');
var ethers = require('ethers');
var moment = require('moment');
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
    });
  }

  parseData = (json) => {
    var transactions = [];

    for (var i = 0; i < json.length; i++) {
      var transObj = {}

      if (json[i].from == this.state.address) {
        transObj.type = 'Sent'; //enum should be implemented
        transObj.address = json[i].to;
        transObj.uri = 'require(../../../Assets/images/sent.png)';
      } else {
        transObj.type = 'Received'; //enum should be implemented
        transObj.address = json[i].from;
        transObj.uri = 'require(../../../Assets/images/receive.png)';
      }
      transObj.value = utils.formatEther(json[i].value);
      transObj.blockNumber = json[i].blockNumber;
      transObj.timeStamp = moment.unix(json[i].timeStamp).format('MMMM Do YYYY, h:mm:ss a');
      transObj.hash = json[i].hash;
      transObj.blockHash = json[i].blockHash;
      transactions.push(transObj);
    }

    this.setState({
      data: transactions
    })
  }


  /**
  * Returns a component holding a list of transactions that have been occured
   */
  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          style={{ flex: 1, width: '100%' }}
          renderItem={({ item }) =>

            <CardSection>
              <View style={styles.item}>
                <View>
                  <View style={{}}>
                    <Text style={styles.type}>
                      {item.type}
                    </Text>
                    <Text style={styles.date} >{item.timeStamp}</Text>
                    <Text style={styles.text} >Address:</Text>
                    <Text style={styles.text} >
                      {item.address}
                    </Text>
                    <Text style={styles.text}>Amount: {item.value} Ether</Text>
                  </View>
                </View>
              </View>
            </CardSection>
          } />
      </View >
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
    // marginTop: 25,
    // backgroundColor: 'blue',
  },
  item: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    // backgroundColor: 'red',
    flex: 1
  },
  type: {
    fontSize: 16,
    padding: 3,
    fontWeight: '500'
  },
  date: {
    fontSize: 12,
    padding: 2.5,
    paddingBottom: 5,
    fontWeight: '400'
  },
  text: {
    fontSize: 12,
    padding: 2.5,
    fontWeight: '300'
  }
})
