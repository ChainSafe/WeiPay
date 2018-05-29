import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class TokenList extends Component {
  componentWillMount() {
      const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.dataSource = ds.cloneWithRows(this.props.tokens);
  }

  renderRow(token) {
      return <ListItem coin={token} />;
  }

  render() {
      return (
          <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
      );
  }
}


const mapStateToProps = ({ tokens }) => {
    return { tokens }
}

export default connect(mapStateToProps)(TokenList);
