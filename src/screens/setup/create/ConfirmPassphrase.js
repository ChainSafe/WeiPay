import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import ClearButton from '../../../components/LinearGradient/ClearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';

const shuffle = require('shuffle-array');

/**
 * Initial setup screen that prompts the user to re-enter the passphrase(mnemonic) using the
 * tags.
 * This screen is only displayed in the process of creating a new wallet
 */
class ConfirmPassphrase extends Component {
  /**
   * Sets the local state to keep track of the tags which are selected and
   * unselected
   * @param {Object} props
   */

  constructor(props) {
    super(props);
    this.state = {
      selectedTags: [],
      scrambledTags: [],
    };
  }

  /**
    * LifeCycle Method
    * This method is executed after the component has been rendered.
    * This method add each word of the mnemonic to the local state variable object
    */
  componentDidMount() {
    const words = this.props.mnemonic.split(' ');
    let orderArray = [];
    for (let i = 0; i < words.length; i++) {
      orderArray.push({ 'wordItem' : { 'word': words[i], 'index': i }, 'selected': false });
    }
    shuffle(orderArray);
    this.setState({ scrambledTags: orderArray });
  }

    /**
     * Method is used to navigate to the "enableTokens" screen.
     */
    navigate = () => {
      const navigateToEnableTokens = NavigationActions.navigate({
        routeName: 'enableTokens',
      });
      this.props.navigation.dispatch(navigateToEnableTokens);
    };

    /**
     * This method is used to when a tag has been selected from either the tag box or the input
     * box and the tag is transfered either to the state.selectedTags list or to the state.scrambledTags list.
     *
     * @param {String} tagItem
     * @param {String} action
     * @param {Number} x
     */

    addWord(wordItem, scrambledListIndex) {
      this.setState((prevState) => {
        prevState.scrambledTags[scrambledListIndex].selected = true;
        prevState.selectedTags.push({ 'wordItem': wordItem, 'scrambledWordIndex': scrambledListIndex });
        return prevState;
      });
    }

    removeWord(wordItem, appendedWordIndex) {
      this.setState((prevState) => {
        prevState.scrambledTags[wordItem.scrambledWordIndex].selected = false;
        prevState.selectedTags.splice(appendedWordIndex, 1);
        return prevState;
      });
    }

    /**
     * Returns the screen required for the user to go about selecting the tags
     * in the correct order
     */
    render() {
      const { selectedTags, scrambledTags } = this.state;

      const {
        mainContainer,
        textHeader,
        contentContainer,
        cardContainer,
        cardText,
        tagContainer,
        cardButtonContainer,
        cardButton,
        selectedTextContainer,
        cardSelectedButtonContainer,
        selectedWordText,
        btnContainer,
        button,
        footerGrandparentContainer,
        footerParentContainer,
        textFooter,
      } = styles;

      return (
        <View style={mainContainer}>
            <BackWithMenuNav
                showMenu={false}
                showBack={true}
                navigation={this.props.navigation}
                backPage={'createWalletName'}
            />
            <Text style={textHeader}>Confirm Passphrase</Text>
            <View style={contentContainer} >
                <Card containerStyle={cardContainer}>
                    <Text style={cardText}>
                        Please assemble your passphrase in the correct order.
                    </Text>
                    <View style={tagContainer} >
                        {
                            scrambledTags.map((item, index) => {
                              return (
                                <View key={item.wordItem.index} style={cardButtonContainer}>
                                    <ClearButton
                                        buttonText={item.wordItem.word}
                                        key={item.wordItem.index}
                                        onClickFunction={() => this.addWord(item.wordItem, index)}
                                        customStyles={cardButton}
                                        unlockButton={this.state.scrambledTags[index].selected}
                                        />
                                </View>
                              );
                            })
                        }
                    </View>
                    <View style={selectedTextContainer} >
                        {
                            selectedTags.map((item, index) => {
                              return (
                                <View key={item.wordItem.index} style={cardSelectedButtonContainer}>
                                    <TouchableOpacity
                                        onPress={() => this.removeWord(item, index)}>
                                        <Text style={selectedWordText}>
                                            {item.wordItem.word}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                              );
                            })
                        }
                    </View>
                </Card>
            </View>
            <View style={btnContainer}>
                <LinearButton
                    onClickFunction={this.navigate}
                    buttonText= 'Next'
                    customStyles={button}
                    // buttonStateEnabled={this.state.buttonDisabled}
                />
            </View>
            <View style={footerGrandparentContainer}>
                <View style={footerParentContainer}>
                    <Text style={textFooter} >Powered by ChainSafe </Text>
                </View>
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
    paddingTop: '5%',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: 26,
    paddingLeft: '10%',
    paddingBottom: '3%',
    color: '#1a1f3e',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    paddingBottom: '10%',
    lineHeight: 22,
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    alignContent: 'space-around',
  },
  cardButton: {
    height: 32,
    justifyContent: 'center',
  },
  cardContainer: {
    width: '80%',
    height: '85%',
    borderRadius: 7.5,
    shadowOpacity: 0.5,
    shadowRadius: 1.3,
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 1, height: 2 },
  },
  cardButtonContainer: {
    paddingBottom: '2%',
    paddingRight: '1.75%',
  },
  selectedTextContainer: {
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardSelectedButtonContainer: {
    paddingBottom: '2%',
    paddingRight: '1.75%',
  },
  selectedWordText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#27c997',
    fontFamily: 'WorkSans-Regular',
  },
  tag: {
    margin: 2,
    width: Dimensions.get('window').width / 3 - 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '82%',
  },
  btnContainer: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    alignContent: 'flex-end',
  },
  footerGrandparentContainer: {
    alignItems: 'center',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
    marginTop: '3.5%',
    color: '#c0c0c0',
  },
});

/**
 * Reterives the mnemonic passphrase of the wallet that was created
 * and returns an object containing that information
 * @param {Object} param
 */
const mapStateToProps = ({ newWallet }) => {
  const mnemonic = newWallet.wallet.mnemonic;
  return { mnemonic }
}

export default connect(mapStateToProps, null)(ConfirmPassphrase)
