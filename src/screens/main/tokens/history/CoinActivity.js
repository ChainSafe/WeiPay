import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CardSection } from '../../../../components/common/CardSection';
import CoinSendTabNavigator from '../../../../components/customPageNavs/CoinSendTabNavigator'
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
const axios = require('axios');
const ethers = require('ethers');
const moment = require('moment');
const utils = ethers.utils;

/**
 * React Component
 * Contains a local history of all the transactions that have been occured
 * using the current wallet address
 */
class CoinActivity extends Component {

  constructor(props) {
    super(props)
    this.state = {
      balance: "",
      loaded: false,
      data: [],
      address: '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a'
    }
  }

  componentDidMount() {
    this.getData(this.state.address);
  }

  getData = async (address) => {
    const url = 'https://api.etherscan.io/api?module=account&action=txlist&address=' + address + '&page=1&offset=10&sort=asc&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR';
    axios.get(url).then(response => {
      this.parseData(response.data.result);
    });
  }

  parseData = (json) => {
    let transactions = [];
    for (var i = 0; i < json.length; i++) {
      let transObj = {}
      if (json[i].from == this.state.address) {
        transObj.type = 'Sent'; //enum should be implemented
        transObj.address = json[i].to;
        transObj.uri = 'require(../../../assets/images/sent.png)';
      } else {
        transObj.type = 'Received'; //enum should be implemented
        transObj.address = json[i].from;
        transObj.uri = 'require(../../../assets/images/receive.png)';
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
      <View style={styles.mainContainer}>
        <BackWithMenuNav 
          backFunction={this.navigateBack} 
          menuFunction={this.navigateMenu} 
          showMenu={true}
          showBack={true}
          navigation={this.props.navigation}
        />
        <CoinSendTabNavigator navigation={this.props.navigation} />
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          style={{ flex: 1, width: '100%' }}
          renderItem={({ item }) =>
            <CardSection>
              <View style={styles.item}>
                <View>
                  <View>
                    <View style={styles.headerContainer}> 
                      <Text style={styles.type}>
                        {item.type}
                      </Text>

                       <Text style={styles.date} >{item.timeStamp}</Text>
                    </View>
                    
                   
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
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '2.5%',
    backgroundColor: "#fafbfe",
  },
  headerContainer:{
    flexDirection: 'row',
    backgroundColor: "blue"
  },
  item: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    flex: 1
  },
  type: {
    fontSize: 16,
    padding: '1.5%',
    letterSpacing: 0.5,
    fontFamily: "Cairo-Regular",     
  },
  date: {
    fontSize: 11,
    // padding: '1.5%',
    letterSpacing: 0.4,
    fontFamily: "Cairo-Light",  
    alignItems: 'flex-end'  
    // fontSize: 12,
    // padding: 2.5,
    // paddingBottom: 15,
    // fontWeight: '400'
  },
  text: {
    fontSize: 12,
    padding: 2.5,
    fontWeight: '300'
  }
})
