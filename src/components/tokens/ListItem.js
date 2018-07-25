import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox, ListItem, Icon, } from 'react-native-elements'
import {BoxShadow} from 'react-native-shadow'
import { CardSection } from '../common/CardSection';
import { Card } from '../common/Card';
import { addTokenToSetup } from '../../actions/ActionCreator';


/**
 * React Component
 * Class is used to create a single item of the
 * selectable token list
 */
class CoinListItem extends Component {
  /**
   * Initializer
   * Creates a boolean state variable which is used
   * to keep track of whether this item was selected or not
   */
  constructor() {
    super();
    this.state = {
      checked: false,
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
    this.setState({ checked: !(this.state.checked) });
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
      <View style={styles.listItemParentContainer}>
        <TouchableOpacity
          onPress={() => this.renderPress(coin)}>
          <View style={[styles.check, coin.selected ? styles.containerSelected : styles.containerDeselect]}>
            <ListItem
              hideChevron
              key={coin.id}
              roundAvatar
              avatar={ require('../../assets/images/eth.png') }
              title= {
                <View style={styles.titleContainer} >
                  <Text style={styles.coinItemSymbolText}>{coin.symbol}</Text>
                    <View style={styles.checkboxContainer} >
                      <CheckBox 
                        center
                        iconRight
                        iconType='material'
                        checkedIcon='clear'
                        uncheckedIcon='add'
                        uncheckedColor='#27c997'
                        checkedColor='red'
                        checked={coin.selected}
                        containerStyle={[title, coin.selected ? styles.valid : styles.invalid]}
                        onPress={() => this.renderPress(coin)}
                        />
                      </View>
                </View>
              }
              subtitle={
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitleText}>{coin.title}</Text>
                </View>
              }
              containerStyle = {styles.listItemContainer}
              avatarStyle = {styles.avatarStyles}
            />
          </View>
        </TouchableOpacity >
      </View>
    )
  }
}

/**
 * Component Styles
 */
const styles = StyleSheet.create({
  listItemParentContainer: {
    marginTop: '2.5%',
    marginLeft: '0.25%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '3.5%',
  },
  title: {
    paddingLeft: 15,
    paddingRight: '15%',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    width: '100%',
    borderWidth: 0,
  },
  coinItemSymbolText: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    alignItems: 'flex-start',
    flex: 1,
    width: '90%',
    letterSpacing: 0.5,
    top: '6%',
  },
  listItemContainer: {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1,
    borderWidth: 0,
    width: '100%',
    height: 63,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  checkboxContainer: {
    top: '5.5%',
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '3.5%',
  },
  subtitleText: {
    fontSize: 11,
    fontFamily: 'Cairo-Light',
    alignItems: 'flex-start',
    flex: 1,
    width: '90%',
    letterSpacing: 0.4,
    top: '-3.5%',
    height: '100%',
  },
  avatarStyles: {
    marginTop: '-5%',
    width: 20,
    height: 30,
    backgroundColor: 'transparent',
  },
  invalid: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: '2.5%',
  },
  valid: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: '2.5%',
  },
  containerSelected: {
    width: '83%',
  },
  containerDeselect: {
    width: '83%',
  },
});

/**
 * This function is not being used
 * @param {Object} state 
 */
const mapStateToProps = state => {
  return {
    tokenList: state.newWallet.tokens,
  }
};

export default connect(mapStateToProps, { addTokenToSetup })(CoinListItem)
