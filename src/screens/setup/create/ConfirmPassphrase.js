import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import ClearButton from '../../../components/LinearGradient/ClearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard'

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
          <View style={{flex:0.75, backgroundColor:'purple'}}>
            <BackWithMenuNav
                showMenu={false}
                showBack={true}
                navigation={this.props.navigation}
                backPage={'createWalletName'}
            />
          </View>
          <Text style={textHeader}>Confirm Passphrase</Text>
           
          <View style={{alignItems:"center", flex: 4}}>
            <View style={contentContainer} >
                <BoxShadowCard>
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
                </BoxShadowCard>
              </View>
            </View>


            <View style={btnContainer}>
                <LinearButton
                    onClickFunction={this.navigate}
                    buttonText= 'Next'
                    customStyles={button}
                    // buttonStateEnabled={this.state.buttonDisabled}
                />
                <View style={footerGrandparentContainer}>
                    <View style={footerParentContainer}>
                        <Text style={textFooter} >Powered by ChainSafe </Text>
                    </View>
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
    // paddingTop: '5%',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: 26,
    paddingLeft: '9%',
    // paddingBottom: '3%',
    color: '#1a1f3e',
    flex:0.75,
    backgroundColor: "blue"
  },
  contentContainer: {
    // alignItems: 'center',
    // flex: 1,
    backgroundColor: "green",
    width: '82%'
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
  cardButtonContainer: {
    paddingBottom: '2%',
    paddingRight: '1.75%',
    // flex:1
  },
  cardButton: {
    height: 32,
    // height: '33%',
     justifyContent: 'center',
  },
  cardContainer: {
    width: '80%',
    height: '90%',   
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
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,  
  },
  btnContainer: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    alignContent: 'flex-end',
    backgroundColor: "red",
    flex:1
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    backgroundColor:"yellow",
    marginBottom: '2.5%',
    marginTop: '2.5%'
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 11,
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
