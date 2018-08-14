import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import { addTokenToSetup } from '../../actions/ActionCreator';
import BoxShadowCard from '../ShadowCards/BoxShadowCard';

const axios = require('axios');

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
   * prop and it can be selected or unselected by the user
   */
  render() {
    const { coin } = this.props;

    const {
      boxShadownContainer,
      contentContainer,
      imgMainContainer,
      imageContainer,
      img,
      listItemTextContainer,
      listItemTextComponent,
      mainTitleContainer,
      mainTitleText,
      subtitleContainer,
      subTitleText,
      listItemIconContainer,
      listItemIconComponent,
      listItemIcon,
    } = styles;
    
    return (
      <View style={styles.listItemParentContainer}>
        <TouchableOpacity
          onPress={() => {return this.renderPress(coin)}}>
          <View style={[coin.selected ? null : null]}>
            <BoxShadowCard customStyles={boxShadownContainer} containerStyling={this.renderBoxContainerStyling(coin)}>
              <View style={[contentContainer]}>
                <View style={imgMainContainer} >
                  <View style={imageContainer} >
                    <Image
                      style={img}            
                      source={{ uri: coin.logo.src} }
                    />
                  </View>
                </View>
                <View style={listItemTextContainer}>
                  <View style={listItemTextComponent}>                       
                    <View style={mainTitleContainer}>
                      <Text style={mainTitleText} >{coin.symbol}</Text>
                    </View>
                    <View style={subtitleContainer}>
                      <Text style={subTitleText} >{coin.name}</Text>
                    </View>                   
                  </View>
                </View>
                <View style={listItemIconContainer}>
                  <View style={listItemIconComponent}>
                    <Image
                      style={ listItemIcon }
                      source={this.renderStatePicture(coin)}
                    />
                  </View>
                </View>
              </View>
            </BoxShadowCard>
          </View>
        </TouchableOpacity >
      </View>
    );
  }
}

/**
 * Component Styles
 */
const styles = StyleSheet.create({
  boxShadownContainer: {
    flex: 1, 
  },
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
  listItemTextContainer: {
    flex: 4, 
  },
  listItemTextComponent: {
    justifyContent: 'center', 
    flex: 1,
  },
  listItemParentContainer: {
    marginLeft: '0.25%',
    height: Dimensions.get('window').height * 0.1,
    flex: 1,
  },
  imgMainContainer: {
    flex: 1.25,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    height: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.0524 : Dimensions.get('window').height * 0.057,
    width: Dimensions.get('window').width * 0.093,
  },
  mainTitleContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  subtitleContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
  },
  listItemIconContainer: {
    flex: 1,
  },
  listItemIconComponent: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  listItemIcon: {
    height: Dimensions.get('window').height * 0.035,
    width: Dimensions.get('window').width * 0.035,
    justifyContent: 'center',
  },
  mainTitleText: {
    fontSize: RF(2.4),
    fontFamily: 'Cairo-Regular',
    letterSpacing: 0.5,
    color: '#061f46',
  },
  subTitleText: {
    fontSize: RF(1.6),
    fontFamily: 'Cairo-Regular',
    color: '#061f46',
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
