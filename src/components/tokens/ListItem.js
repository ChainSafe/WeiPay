import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox, ListItem, Icon, } from 'react-native-elements'
import { CardSection } from '../common/CardSection';
import { Card } from '../common/Card';
import { addTokenToSetup } from '../../actions/ActionCreator';
import BoxShadowCard from '../ShadowCards/BoxShadowCard';

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
            <BoxShadowCard customStyles={{flex:1}}> 
              {/* <ListItem
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
              /> */}
              <View style={styles.contentContainer}>
                <View style={styles.imgMainContainer} >
                  <View style={styles.imageContainer} >
                    <Image
                      style={styles.img}
                      source={require('../../assets/images/eth.png') }
                    />
                  </View>
                </View>

                <View style={{flex: 3, backgroundColor: 'yellow'}}>
                  <View style={{justifyContent:'center', flex:1}}>
                    <Text>Eth </Text>
                    <Text>Ethereum </Text>
                  </View>
                </View>

                <View style={{flex: 1, backgroundColor: 'blue'}}>
                  <View style={{flex:1,justifyContent: 'center', alignItems:"center"}}>
                    <Image
                      style={{
                        height: Dimensions.get('window').height * 0.035, 
                        width: Dimensions.get('window').width * 0.035,
                        justifyContent: 'center'}}
                      source={require('../../assets/images/delete.png') }
                    />
                  </View>
                </View>


              </View>


            </BoxShadowCard>
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

  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    // margin: '1%',
    backgroundColor: 'red',
  },
  listItemParentContainer: {
    marginLeft: '0.25%',
    height: Dimensions.get('window').height * 0.1,
    flex: 1,
  },

  imgMainContainer: {
    flex: 1,
    alignItems: 'center',
  },

  imageContainer: {
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
  },

  img: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.05,
    justifyContent: 'center',
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
    borderWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
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
