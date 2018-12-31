import React, { Component } from 'react';
import {
	View, Text, StyleSheet, FlatList, SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import RF from 'react-native-responsive-fontsize';

const axios = require('axios');
const ethers = require('ethers');
const moment = require('moment');
const utils = ethers.utils;

class CoinActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// balance: '',
			// loaded: false,
			data: [],
			// address: this.props.wallet.pubKey,
			// noTransactions: null,
			loading: false,
			// error: null,
			// feedback: null,
		};
	}

	// async not required
	componentDidMount() {
		this.setState({ loading: true });
		this.getData(this.props.wallet.pubKey);
	}

	getData = async (address) => {
		const network = this.props.network;
		let url;
		if (network === 'mainnet') {
			url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${Config.ETHERSCAN_API_KEY}`;
		} else if (network === 'ropsten') {
			url = `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${Config.ETHERSCAN_API_KEY}`;
		} else if (network === 'kovan') {
			url = `https://api-kovan.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${Config.ETHERSCAN_API_KEY}`;
		} else {
			url = `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${Config.ETHERSCAN_API_KEY}`;
		}
		axios.get(url)
			.then((res) => {
				this.parseData(res.data.result);
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}

	// async not required, two parameters not required
	parseData = (json) => {
		if (json.length === 0) {
			this.setState({
				loading: false
			});
		} else {
			const transactions = [];
			for (let i = 0; i < json.length; i++) {
				const transObj = {};
				// was getting wrong results due to case sensitivity 
				if (json[i].from.toLowerCase() == this.props.wallet.pubKey.toLowerCase()) {
					transObj.type = 'Sent';
					transObj.address = json[i].to;
					transObj.uri = 'require(../../../assets/images/sent.png)';
				} else {
					transObj.type = 'Received';
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
				loading: false,
			});
		}
	}

  /**
   * Returns a component holding a list of transactions that have been occured
   */
	render() {
		// use the unused loading state
		const { data, loading } = this.state;
		return (
			<SafeAreaView style={styles.safeAreaView}>
				<View style={styles.mainContainer}>
					<View style={styles.listContainer}>
						{loading
							? <View style={styles.textContainer}>
								<Text > Loading... </Text>
							</View>
							: data.length
								? <FlatList
									data={data}
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
								: <View style={styles.textContainer}>
									<Text > No Results... </Text>
								</View>
						}
					</View>
				</View >
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: '#f4f7f9',
	},
	mainContainer: {
		flex: 1,
		backgroundColor: '#f4f7f9',
		width: '100%',
	},
	listContainer: {
		flex: 5.25,
		paddingTop: '5%',
	},
	feedbackContainer: {
		width: '80%',
		flex: 1,
		marginLeft: '10%',
	},
	addressTitle: {
		fontFamily: 'Cairo-Regular',
		color: 'black',
		fontSize: RF(2.1),
		lineHeight: RF(3),
		letterSpacing: 0.4,
	},
	flatListStyle: {
		flex: 1,
		width: '100%',
		backgroundColor: '#f4f7f9',
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
		borderBottomColor: '#b3b3b3',
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingBottom: '1.5%',
	},
	textContainer: {
		alignContent: 'center',
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
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
	addressContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: '1.5%',
	},
	loadingBlock: {
		height: 200,
		marginTop: '2.5%',
		backgroundColor: '#F5F5F5',
		paddingBottom: '2.5%',
		paddingLeft: '2.5%',
		paddingRight: '2.5%',
		marginBottom: '2.5%',
		marginLeft: '7.5%',
		marginRight: '7.5%',
		flex: 1,
		width: '82%',
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
		lineHeight: RF(2.6),
		letterSpacing: 0.4,
	},
});

const mapStateToProps = ({ HotWallet, Wallet }) => {
	const { hotWallet } = HotWallet;
	const { network } = Wallet;
	return {
		wallet: hotWallet,
		network,
	};
};


export default connect(mapStateToProps, null)(CoinActivity);