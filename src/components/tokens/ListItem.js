import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection } from '../common/CardSection';
import { Card } from '../common/Card';
import { addTokenToSetup } from '../../actions/ActionCreator';

/**
 * React Component
 * Class is used to create a single item of the 
 * selectable token list
 */
class ListItem extends Component {

  /**
   * Initializer
   * Creates a boolean state variable which is used
   * to keep track of whether this item was selected or not
   */
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  /**
   * Upon selecting this coin,
   *  "addTokenToSetup" action is executed in order to add this item to the global state variable
   *  In-class boolean state variable is the opposite of what it used to be
   * @param {Object} coin 
   */
  renderPress(coin) {
    this.props.addTokenToSetup(coin);
    this.setState({
      checked: !(this.state.checked)
    })
  }

  /**
   * Returns a component that is based on the properties of the coin
   * prop and it can be selected or unselected by the user.
   */
  render() {
    const { coin } = this.props;
    const { title } = styles;
    const { checked } = this.state

    return (
      <View>
        <Card
          style={[styles.check, coin.selected ? styles.valid : styles.invalid]}
        >
          <CheckBox center
            title={coin.title}
            iconLeft
            iconType='material'
            checkedIcon='clear'
            uncheckedIcon='add'
            checkedColor='red'
            checked={coin.selected}
            containerStyle={[title, coin.selected ? styles.valid : styles.invalid]}
            onPress={() => this.renderPress(coin)}
          />
        </Card>
      </View>
    )
  }
}

/**
 * Component Styles
 */
const styles = StyleSheet.create({
  title: {
    paddingLeft: 15,
    alignItems: 'flex-start',
  },
  invalid: {
    alignItems: 'flex-start',
  },
  valid: {
    alignItems: 'flex-start',
  }
})

/**
 * This function is not being used
 * @param {Object} state 
 */
const mapStateToProps = state => {
  return {
    tokenList: state.newWallet.tokens,
  }
};

export default connect(mapStateToProps, { addTokenToSetup })(ListItem)
