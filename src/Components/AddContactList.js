import React, { Component } from 'react';
import { ListView, StyleSheet, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import ListItem from './ListItem';
import AddContactListItem from './AddContactListItem';

class AddContactList extends Component {

    componentWillMount() {
        let data = this.props.tokens

        if (this.props.type === 'tokens') {
            data = this.props.tokens.filter(coin => coin.type === 'PortfolioCoin')
        } else if (this.props.type === 'tokens') {
            data = this.props.tokens.filter(coin => coin.type === 'PortfolioToken')
        }

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        //this passes in the AddContactList.json file via reducer -> state -> connect -> mapstatetoprops
        this.dataSource = ds.cloneWithRows(data);
    }

    renderRow(coin) {

        return <AddContactListItem coin={coin} />;

    }

    render() {
        return (
            <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />

        );
    }
}




/* Object return will show up to props */
const mapStateToProps = state => {
    return {
        tokens: state.newWallet.tokens
    }
}

export default connect(mapStateToProps, null)(AddContactList);

/* Going to wrap the library list with the connect function, this will allow us to get state data to put in our props  */
