import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, SafeAreaView, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import ClearButton from '../../../components/LinearGradient/ClearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/ShadowCards/BoxShadowCard'
import RF from "react-native-responsive-fontsize"

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
        if(!prevState.scrambledTags[scrambledListIndex].selected) {
          prevState.scrambledTags[scrambledListIndex].selected = true;
          prevState.selectedTags.push({ 'wordItem': wordItem, 'scrambledWordIndex': scrambledListIndex });
          return prevState;
        }       
      });
    }

    removeWord(wordItem, appendedWordIndex) {
      this.setState((prevState) => {
        prevState.scrambledTags[wordItem.scrambledWordIndex].selected = false;
        prevState.selectedTags.splice(appendedWordIndex, 1);
        return prevState;
      });
    }

    validatePassphrase = () => {
      const { scrambledTags, selectedTags } = this.state;
      let passphraseIncomplete = true;
      let count = 0;
      if(selectedTags.length == 12) {
        for(let i = 0; i < selectedTags.length; i++) {       
          if(selectedTags[i].wordItem.index == i) {
            count++;
          }
        }
        if(count == 12) {
          this.navigate();
        } else {
          Alert.alert(
            'Passphrase Error',
            'You did not enter the right passphrase in the correct order. Please try again.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }
      } else {
          Alert.alert(
            'Passphrase Error',
            'You have no selected all of the words within the passphrase. Please complete ordering all words',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
      }
    }

    /**
     * Returns the screen required for the user to go about selecting the tags
     * in the correct order
     */
    render() {
      const { selectedTags, scrambledTags } = this.state;
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.mainContainer}>
            <View style={styles.navContainer}>
              <BackWithMenuNav
                showMenu={false}
                showBack={true}
                navigation={this.props.navigation}
                backPage={'generatePassphrase'}
              />
          </View>
          <Text style={styles.textHeader}>Confirm Passphrase</Text>           
          <View style={styles.boxShadowContainer}>
            <View style={styles.contentContainer} >
                <BoxShadowCard>
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
                              );
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
                              );
                            })
                        }
                    </View>
                </BoxShadowCard>
              </View>
            </View>
            <View style={styles.btnContainer}>
                <LinearButton
                    onClickFunction={this.validatePassphrase}
                    buttonText= 'Next'
                    customStyles={styles.button}
                    // buttonStateEnabled={this.state.buttonDisabled}
                />
                <View style={styles.footerGrandparentContainer}>
                    <View style={styles.footerParentContainer}>
                        <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                    </View>
                </View>
            </View>
        </View>
         </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
  },
  navContainer: {
    flex: 0.65,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex:0.65,
  },
  boxShadowContainer: {
    alignItems:"center", 
    flex: 3.75
  },
  contentContainer: {
    width: '82%'
  },
  cardText: {
    paddingBottom: '5%',
    lineHeight: 22,
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    fontSize: RF(2.4),
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
    paddingBottom: '1%',
  },
  cardButton: {
    height: Dimensions.get('window').height * 0.05,  
    justifyContent: 'center',
    alignContent: "center",
    alignItems: "center",
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
    fontSize: RF(2.1),
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
    flex:1.25
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '5%'
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(1.7),
    color: '#c0c0c0',
    letterSpacing: 0.5
  },
});

/**
 * Reterives the mnemonic passphrase of the wallet that was created
 * and returns an object containing that information
 * @param {Object} param
 */
const mapStateToProps = ({ newWallet }) => {
  const mnemonic = newWallet.wallet.mnemonic;
  const debugMode = newWallet.debugMode;
  return { mnemonic, debugMode }
}

export default connect(mapStateToProps, null)(ConfirmPassphrase)
