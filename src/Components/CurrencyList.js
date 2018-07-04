import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, ListView } from 'react-native';
import { connect } from 'react-redux';
import RadioGroup from 'react-native-radio-buttons-group';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { selectWalletCurrency } from '../actions/ActionCreator';

/**
 * React Component
 * Contains a radio list of all currencies from which
 * the user select
 * 
 */
class Test extends Component {

  state = {
    data: this.props.currency
  };

  /**
   * Updates this.state.data everytime a new currency from 
   * the list is selected
   */
  onPress = data => this.setState({ data });

  /**
   * Executes the action "selectWalletcurrency" to update the selected currency in the
   * state variable
   * updates this.state.data to the selected item
   * @param {String} data 
   */
  renderSelect(data) {
    let selectedcurrency = this.state.data.find(e => e.selected == true);
    selectedcurrency = selectedcurrency ? selectedcurrency.value : this.state.data[0].label;
    this.props.selectWalletCurrency(selectedcurrency);
    this.setState({ data });
  }


  /**
   * Returns a Scrollable radio list of currencies that the user can select from
   */
  render() {

    return (
      <ScrollView contentContainerstyle={styles.container}>
        <CardSection >
          <RadioGroup style={styles.display} radioButtons={this.state.data} onPress={this.renderSelect.bind(this)} />
        </CardSection>
      </ScrollView>
    );
  }
}

/**
 * Styles used within the component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 100,
    maxHeight: 100,
    width: '100%'
  },
  display: {
    flex: 1,
    backgroundColor: 'red'
  }
});

/**
 * extracts the current currency that the state is pointing to
 * and returns an object that this information
 * @param {Object} state 
 */
const mapStateToProps = state => {
  return {
    currency: state.currency
  }
}

export default connect(mapStateToProps, { selectWalletCurrency })(Test);
