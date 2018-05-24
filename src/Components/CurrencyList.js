import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import CurrencyListItem from './CurrencyListItem';

class CurrencyList extends Component {

    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        //this passes in the CoinList.json file via reducer -> state -> connect -> mapstatetoprops
        this.dataSource = ds.cloneWithRows(this.props.currency);
    }

    renderRow(currency) {
        //return instance of listitem
        return <CurrencyListItem coin={currency} />;
    }

    render() {
        return (
            <ListView dataSource={this.dataSource} renderRow={this.renderRow} />

        );
    }
}

/* Object return will show up to props */
const mapStateToProps = state => {
    return {
      currency: state.currency
     }
}

export default connect(mapStateToProps, null)(CurrencyList);

/* Going to wrap the library list with the connect function, this will allow us to get state data to put in our props  */
