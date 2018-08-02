import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
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
  constructor(props) {
    super(props);
    this.state = {
      totalTaps: (this.props.coin.selected ? 1 : 0),
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
    if (this.state.totalTaps == 0) {
      this.props.addTokenToSetup(coin);
      this.setState({ checked: !(this.state.checked), totalTaps: 1 });
    } else if (this.state.totalTaps == 1) {
      this.setState({ totalTaps: 2 })
    }else if (this.state.totalTaps == 2) {
      this.props.addTokenToSetup(coin);
      this.setState({ checked: !(this.state.checked), totalTaps: 0 })
    }
  }

  /**
   * Determines the right icon of the list item
   * @param {Object} coin
   */
  renderStatePicture(coin) {
    if (coin.selected == false) {
      return require('../../assets/images/add2.png')
    }else if (this.state.totalTaps == 1 && (coin.selected)) {
      return require('../../assets/images/added.png')
    }else if (this.state.totalTaps == 2 && coin.selected) {
      return require('../../assets/images/delete.png')
    }
  }

  /**
   * Determines the container border styling of the list item
   * @param {Object} coin
   */
  renderBoxContainerStyling(coin) {
    if (this.state.totalTaps == 1 && (coin.selected)) {
      return { borderColor: '#27c997', borderWidth: 1 }
    }else if (this.state.totalTaps == 2 && coin.selected) {
      return {borderColor: 'red', borderWidth: 1}
    }
  }

  /**
   * Returns a component that is based on the properties of the coin
   * prop and it can be selected or unselected by the user.
   */
  render() {
    const { coin } = this.props;

    return (


      <View style={styles.listItemParentContainer}>
        <TouchableOpacity
          onPress={() => {return this.renderPress(coin)}}>
          <View style={[coin.selected ? null : null]}>
            <BoxShadowCard customStyles={{ flex: 1 }} containerStyling={this.renderBoxContainerStyling(coin)}>
              <View style={[styles.contentContainer]}>
                <View style={styles.imgMainContainer} >
                  <View style={styles.imageContainer} >
                    <Image
                      style={styles.img}
                      source={require('../../assets/images/eth.png') }
                    />
                  </View>
                </View>
                <View style={{ flex: 5  }}>
                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <View style={styles.mainTitleContainer}>
                      <Text style={styles.mainTitleText} >{coin.symbol}</Text>
                    </View>
                    <View style={styles.subtitleContainer}>
                      <Text style={styles.subTitleText} >{coin.title}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={{
                        height: Dimensions.get('window').height * 0.035,
                        width: Dimensions.get('window').width * 0.035,
                      justifyContent: 'center' } }
                      source={this.renderStatePicture(coin)}
                    />
                  </View>
                </View>
              </View>
            </BoxShadowCard>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

/**
 * Component Styles
 */
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  containerSelected: {
    borderWidth: 1,
    borderColor: 'black',
    width: '83%',
  },
  containerDeselect: {
    width: '83%',
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
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.05,
    justifyContent: 'center',
  },
  mainTitleContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    paddingTop: '1.5%',
  },
  mainTitleText: {
    fontSize: RF(3),
    fontFamily: 'Cairo-Regular',
    letterSpacing: 0.5,
    color: 'black',
  },
  subtitleContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    paddingBottom: '1.5%',
  },

  subTitleText: {
    fontSize: RF(2),
    fontFamily: 'Cairo-Regular',
    letterSpacing: 0.5,
  },
});

/**
 * This function is not being used
 * @param {Object} state
 */
const mapStateToProps = (state) => {
  return {
    tokenList: state.newWallet.tokens,
  };
};

export default connect(mapStateToProps, { addTokenToSetup })(CoinListItem);
