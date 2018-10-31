import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import CoinSendTabNavigator from '../../../../components/customPageNavs/CoinSendTabNavigator';
import BackWithMenuNav from '../../../../components/customPageNavs/BackWithMenuNav';
import { connect } from 'react-redux';
import RF from "react-native-responsive-fontsize"

const axios = require('axios');
const ethers = require('ethers');
const moment = require('moment');
const utils = ethers.utils;

class CoinActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
      loaded: false,
      data: [],
      address: this.props.wallet.pubKey,
    };
  }

  componentDidMount() {
    // console.log(this.state.address);
    this.getData(this.state.address);
  }

  /*
  http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0xFc02F8B4309fFF99F3C0BA3e8Bbb7399572EEf51&startblock=0&endblock=99999999&sort=asc&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR

  */

  getData = async (address) => {
    const url = `http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${  address  }&sort=asc&apikey=YJ1TRXBKAH9QZWINVFT83JMFBQI15X7UPR`;
    axios.get(url).then((response) => {
      this.parseData(response.data.result);
    });
  }

  parseData = (json) => {
    
    const transactions = [];
    for (let i = 0; i < json.length; i++) {
      const transObj = {};
      if (json[i].from == this.state.address) {
        transObj.type = 'Sent'; // enum should be implemented
        transObj.address = json[i].to;
        transObj.uri = 'require(../../../assets/images/sent.png)';
      } else {
        transObj.type = 'Received'; // enum should be implemented
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
      data: transactions,
    });
  }

  /**
   * Returns a component holding a list of transactions that have been occured
   */
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <View style={styles.listContainer}>
            <FlatList
              data={this.state.data}
              keyExtractor={(x, i) => i.toString()}
              style={styles.flatListStyle}
              renderItem={({ item }) =>              
                <View style={styles.itemStyle}>
                  <View>
                    <View>
                      <View style={styles.headerContainer}>
                        <Text style={styles.type}>
                          {item.type}
                        </Text>
                        <Text style={styles.date}>{item.timeStamp}</Text>
                      </View>
                      <View style={styles.addressContainer}>
                          <Text style={styles.addressTitle}>Address: </Text>
                          <Text style={styles.addressValue}>{item.address}</Text>
                      </View>
                      <View style={styles.amountContainer}>
                          <Text style={styles.amountTitle}>Amount: </Text>
                          <Text style={styles.amountValue}>{item.value}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              } />
          </View>
        </View >
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
  },
  navContainer: {
    flex: 0.65,
  },
  navHeaderContainer: {
    flex: 0.3,
  },
  flatListStyle: {
    flex: 1, 
    width: '100%', 
    backgroundColor: '#fafbfe'
  },
  listContainer: {
    flex: 5.25,
    marginTop: '12%',
  },
  addressContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '1.5%',
  },
  addressTitle: {
    fontFamily: 'Cairo-Regular',
    color: 'black',
    fontSize: RF(2.1),
    lineHeight: RF(3),
    letterSpacing: 0.4,
  },
  addressValue: {
    fontSize: RF(2.1),
    fontFamily: 'Cairo-Light',
    color: 'black',
    justifyContent: 'center',
    lineHeight: RF(3),
    letterSpacing: 0.4,
  },
  amountContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amountTitle: {
    fontFamily: 'Cairo-Regular',
    color: 'black',
    fontSize: RF(2.1),
    lineHeight: RF(2.6),
    letterSpacing: 0.4,
  },
  amountValue: {
    fontSize: RF(2.1),
    fontFamily: 'Cairo-Light',
    color: 'black',
    justifyContent: 'center',
    lineHeight: RF(2.9),
    letterSpacing: 0.4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '1.5%',
  },
  itemStyle: {  
    paddingBottom: '5%',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    marginBottom: '5%',
    marginLeft: '7.5%',
    marginRight: '7.5%',
    flex: 1,
    width: '82%',
    borderBottomWidth: 1, 
    borderBottomColor: '#b3b3b3'
  },
  type: {
    fontSize: RF(2.4),
    letterSpacing: 0.5,
    fontFamily: 'Cairo-Regular',
    alignItems: 'flex-start',
    flex: 1,
    width: '60%',
    top: 0,
  },
  date: {
    fontSize: RF(1.7),
    letterSpacing: 0.4,
    fontFamily: 'Cairo-Light',
    top: '1.75%',
    color: '#141f25',
  },
});

const mapStateToProps = ({HotWallet}) => {
  return {
    wallet: HotWallet.hotWallet,
  };
};


export default connect(mapStateToProps, null)(CoinActivity);