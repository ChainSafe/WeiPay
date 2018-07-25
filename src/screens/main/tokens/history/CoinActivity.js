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
          showMenu={true}
          showBack={true}
          navigation={this.props.navigation}
          backPage={"mainStack"}

        />
        <CoinSendTabNavigator navigation={this.props.navigation} />
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          style={{ flex: 1, width: '100%', backgroundColor:'#fafbfe'}}
          renderItem={({ item }) =>
            <CardSection>
              <View style={styles.item}>
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
    backgroundColor: "#fafbfe",
    width:"100%", 
    paddingTop: '2.5%',
  },
  addressContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap', 
    paddingBottom: '1.5%'
  },
  addressTitle : {   
    fontFamily: "Cairo-Regular",  
    color: 'black',
    fontSize: 13,  
    lineHeight: 17
  },   
  addressValue : {
    fontSize:13,
    fontFamily: "Cairo-Light",  
    color: 'black',  
    justifyContent:'center',
    lineHeight: 17    
  },
  amountContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap', 
  },
  amountTitle : {   
    fontFamily: "Cairo-Regular",  
    color: 'black',
    fontSize: 13,  
    lineHeight: 16 
  },   
  amountValue : {
    fontSize:13,
    fontFamily: "Cairo-Light",  
    color: 'black',  
    justifyContent:'center',
    lineHeight: 16    
  },
  headerContainer:{
    flexDirection: 'row',
    justifyContent:"center", 
    paddingBottom: '1.5%'
  },
  item: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: '7.5%',
    marginRight: '7.5%',
    flex: 1,
    width: '82%',
  },
  type: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: "Cairo-Regular",     
    alignItems:"flex-start",
    flex:1,
    width:'60%',
    top: 0    
  },
  date: {
    fontSize: 11,
    letterSpacing: 0.4,
    fontFamily: "Cairo-Light",  
    top: '1.75%',
    color: '#141f25'  
  },
})
