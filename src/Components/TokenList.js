import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

/**
 * React Component
 * A checkbox list of all the tokens that the 
 * user wants to add/remove from their portfolio
 */
class TokenList extends Component {

    /**
     * LiftCycle Method (is executed before the component is created)
     * Assigning the token list saved in the global state as a datasource for
     * the listView.
     */
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.tokens);
    }

    /**
     * Returns an instance of a ListItem component which is based on the properties
     * of an item from the token list extracted from the state
     * @param {Object} token 
     */
    renderRow(token) {
        return <ListItem coin={token} />;
    }

    /**
     * Returns a checkbox & scrollable list of tokens
     */
    render() {
        return (
            <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
        );
    }
}

/**
 * Returns the token list data that is stored in state
 * @param {Object} param0 
 */
const mapStateToProps = ({ tokens }) => {
    return { tokens }
}

export default connect(mapStateToProps)(TokenList);
