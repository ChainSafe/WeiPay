import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class CoinList extends Component {

    componentWillMount() {
        let data = this.props.coins

        if (this.props.type === 'coins') {
          data = this.props.coins.filter( coin => coin.type === 'PortfolioCoin' )
        } else if (this.props.type === 'tokens') {
          data = this.props.coins.filter( coin => coin.type === 'PortfolioToken' )
        }

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        //this passes in the CoinList.json file via reducer -> state -> connect -> mapstatetoprops
        this.dataSource = ds.cloneWithRows(data);
    }

    renderRow(coin) {
        //return instance of listitem
        return <ListItem coin={coin} />;
    }

    render() {
        return (
            <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
        );
    }
}

/* Object return will show up to props */
const mapStateToProps = ({ newWallet }) => {
    return { coins: newWallet.coinData }
}

export default connect(mapStateToProps, null)(CoinList);

/* Going to wrap the library list with the connect function, this will allow us to get state data to put in our props  */
