import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

/**
 * This Class is not used anywhere
 */
class GenericList extends Component {

    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        //this passes in the CoinList.json file via reducer -> state -> connect -> mapstatetoprops
        this.dataSource = ds.cloneWithRows(this.props.coins);

    }

    renderRow(coin) {
        //return instance of listitem
        return <ListItem coin={coin} />
    }

    render() {
        return (
            <ListView dataSource={this.dataSource} renderRow={this.renderRow} />
        );
    }
}

/* Object return will show up to props */
const mapStateToProps = ({ coins }) => {
    return { coins }
}

export default connect(mapStateToProps, null)(GenericList);

/* Going to wrap the library list with the connect function, this will allow us to get state data to put in our props  */