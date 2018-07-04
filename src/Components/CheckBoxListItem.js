import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addTokenToSetup } from '../actions/ActionCreator';

/**
 * This class is a sub-component of the CheckBoxList component
 * However the main component is not being used anywhere in the project
 * therefore considering this component to also be useless 
 */
class CheckBoxListItem extends Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  renderPress(coin) {
    this.props.addItem(coin);
    this.setState({
      checked: !(this.state.checked)
    })
  }

  render() {
    const { coin } = this.props;
    const { title } = styles;
    const { checked } = this.state

    return (
      <View>
        <Card
          style={[styles.check, (this.props.selectedItems.indexOf(coin.id) != -1) ? styles.valid : styles.invalid]}
        >
          <CheckBox center
            title={coin.title}
            iconLeft
            iconType='material'
            checkedIcon='clear'
            uncheckedIcon='add'
            checkedColor='red'
            checked={checked}
            containerStyle={[title, checked ? styles.valid : styles.invalid]}
            onPress={() => this.renderPress(coin)}
          />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 15
  },
  invalid: {
    borderColor: 'red'
  },
  valid: {
    borderColor: 'green'
  }
})

export default CheckBoxListItem
