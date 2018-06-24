import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import CheckBoxListItem from './CheckBoxListItem';

/**
 * This Class is not being used anywhere
 */
class CheckBoxList extends Component {

    componentWillMount() {

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.props.data);
    }

    renderRow(coin) {

        return (<CheckBoxListItem coin={coin} addItem={this.props.addItem} selectedItems={this.props.selectedItems.tokens} />)
    }

    render() {

        return (
            <ListView dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} />
        );
    }
}


export default CheckBoxList;
