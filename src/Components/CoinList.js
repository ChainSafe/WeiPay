import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

/**
 * React Component Class
 * Contains a list of all the tokens that the user can select to 
 * add to their portfolio
 */

class CoinList extends Component {

    /**
     * LifeCycle function: Executes before executing the render function 
     * Creates the datasource that is need to generate a list of tokes
     */
    componentWillMount() {
        let data = this.props.coins
        if (this.props.type === 'coins') {
            data = this.props.coins.filter(coin => coin.type === 'PortfolioCoin')
        } else if (this.props.type === 'tokens') {
            data = this.props.coins.filter(coin => coin.type === 'PortfolioToken')
        }
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        //this passes in the CoinList.json file via reducer -> state -> connect -> mapstatetoprops
        this.dataSource = ds.cloneWithRows(data);
    }

    /**
     * Returns an instance of the listitem component
     * based on the properties of the coin parameter
     * 
     * @param {Object} coin 
     */
    renderRow(coin) {
        //return instance of listitem
        return <ListItem coin={coin} />;
    }

    /**
     * Returns a checkbox list of all the coins that the user can select for their
     * portfolio
     */
    render() {
        return (
            <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
        );
    }
}

/* Object return will show up to props */
/**
 * 
 * Returns a object list of coins that can be added to the portfolio
 * This list is becomes available to the component as a prop after this method
 * is passed through the connect method
 * @param {Object} param0 
 */
const mapStateToProps = ({ newWallet }) => {
    return { coins: newWallet.coinData }
}


export default connect(mapStateToProps, null)(CoinList);