import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import ClearButton from '../../../components/LinearGradient/ClearButton';

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
    const state = this.state;
    const words = this.props.mnemonic.split(' ');
    let orderArray = [];
    for (let i = 0; i < words.length; i++) {
        orderArray.push({ 'wordItem' : { "word": words[i], "index": i }, 'selected': false });
    }
    shuffle(orderArray);
    this.setState({scrambledTags: orderArray });
  }

    /**
     * Method is used to navigate to the "enableTokens" screen.
     */
    navigate = () => {
        const navigateToEnableTokens = NavigationActions.navigate({
            routeName: "enableTokens",
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

    addWord(wordItem, scrambledListIndex){
        const state = this.state;
        let oldStates = state.scrambledTags
        oldStates[scrambledListIndex].selected = true;
        this.setState({ scrambledTags: oldStates})
        state.selectedTags.push({"wordItem":wordItem, "scrambledWordIndex": scrambledListIndex});
        this.setState(state)
    }

    removeWord(wordItem, appendedWordIndex ) {
        const state = this.state;
        let oldState = state.scrambledTags
        oldState[wordItem.scrambledWordIndex].selected = false
        this.setState({ scrambledTags: oldState})
        state.selectedTags.splice(appendedWordIndex, 1);       
        this.setState(state)
    }

    /**
     * Returns the screen required for the user to go about selecting the tags
     * in the correct order
     */
    render() {
        const { selectedTags, scrambledTags } = this.state;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerBack}> 
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('createWalletName')} >
                        <Image
                            source={require('../../../assets/icons/back.png')}
                            style={styles.btnBack}
                        /> 
                    </TouchableOpacity>
                </View>  
                <Text style={styles.textHeader}>Confirm Passphrase</Text>
                <View style={styles.contentContainer} >
                    <Card containerStyle={styles.cardContainer}> 
                        <Text style={styles.cardText}>
                            Please assemble your passphrase in the correct order.
                        </Text>
                        <View style={styles.tagContainer} >
                            {
                                scrambledTags.map((item, index) => {
                                  return (
                                        <View key={item.wordItem.index} style={styles.cardButtonContainer}>
                                            <ClearButton
                                                buttonText={item.wordItem.word}
                                                key={item.wordItem.index}
                                                onClickFunction={() => this.addWord(item.wordItem, index)}
                                                customStyles={styles.cardButton}
                                                unlockButton={this.state.scrambledTags[index].selected}
                                                />
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={styles.selectedTextContainer} >
                            {
                                selectedTags.map((item, index) => {
                                    return (
                                        <View key={item.wordItem.index} style={styles.cardSelectedButtonContainer}>
                                            <TouchableOpacity
                                                onPress={() => this.removeWord(item, index)}>
                                                <Text style={styles.selectedWordText}> 
                                                    {item.wordItem.word}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )                                  
                                })
                            }
                        </View>
                    </Card>
                </View>
                <View style={styles.btnContainer}>
                  <LinearButton 
                        onClickFunction={this.navigate}
                        buttonText="Next"
                        customStyles={styles.button}
                        // buttonStateEnabled={this.state.buttonDisabled}
                    />                    
                </View>    
                <View style={styles.footerGrandparentContainer} >    
                    <View style={styles.footerParentContainer} >
                        <Text style={styles.textFooter} >Powered by ChainSafe </Text> 
                    </View>  
                </View> 
            </View>
        );
    }
}

/**
 * Styles used the "ConfirmPassphrase" screen
 */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
    paddingTop: '5%',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerBack: {
    marginTop: Platform.OS === 'ios' ? '5%' : '5%',
    ...Platform.select({
      ios: { backgroundColor: '#fafbfe'},
      android: { backgroundColor: '#fafbfe'}
    }),
    marginLeft: '9%',
  },
  btnBack: {
    height: 20,
    width: 20,
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
  cardButton: {
    height: 32,
    justifyContent: 'center',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: 26,
    paddingLeft: '10%',
    paddingBottom: '3%',
    marginTop: '5%',
    color: '#1a1f3e',
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
 * @param {Object} param0 
 */
const mapStateToProps = ({ newWallet }) => {
    const mnemonic = newWallet.wallet.mnemonic;
    return { mnemonic }
}

export default connect(mapStateToProps, null)(ConfirmPassphrase)
