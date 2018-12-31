import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, Dimensions, SafeAreaView, Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import LinearButton from '../../../components/linearGradient/LinearButton';
import ClearButton from '../../../components/linearGradient/ClearButton';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import BoxShadowCard from '../../../components/shadowCards/BoxShadowCard';

const shuffle = require('shuffle-array');

class ConfirmPassphrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: [],
      scrambledTags: [],
    };
  }

  componentDidMount() {
		// console.log(this.props.hotWallet.wallet.mnemonic);
    const words = this.props.hotWallet.wallet.mnemonic.split(' ');
    let orderArray = [];
    for (let i = 0; i < words.length; i++) {
      orderArray.push({ 'wordItem': { 'word': words[i], 'index': i }, 'selected': false });
    }
    shuffle(orderArray);
    this.setState({ scrambledTags: orderArray });
  }

  navigate = () => {
    const navigateToMain = NavigationActions.navigate({
      routeName: 'mainStack',
    });
    this.props.navigation.dispatch(navigateToMain);
  };

  /**
   * This method is used to when a tag has been selected from either the tag box or the input
   * box and the tag is transfered either to the state.selectedTags list or to the state.scrambledTags list.
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
    const { selectedTags } = this.state;
    // let passphraseIncomplete = true;
    let count = 0;
    if (selectedTags.length == 12) {
      for (let i = 0; i < selectedTags.length; i++) {
        if (selectedTags[i].wordItem.index == i) {
          count++;
        }
      }
      if(count === 12) {
        this.navigate();
      } else {
        Alert.alert(
          'Passphrase Error',
          'You did not enter the right passphrase in the correct order. Please try again.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }
    } else {
      Alert.alert(
        'Passphrase Error',
        'You have not selected all of the words within the passphrase. Please complete ordering all words',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
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
              showSkip={true}
              navigation={this.props.navigation}
              backPage={'generatePassphrase'}
            />
          </View>
          <Text style={styles.textHeader}>Confirm Passphrase</Text>
          <View style={styles.boxShadowContainer}>
            <View style={styles.contentContainer} >
              <BoxShadowCard>
                <Text style={styles.cardText}>Select the correct order.</Text>
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
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f4f7f9',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f4f7f9',
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
    flex: 0.65,
  },
  boxShadowContainer: {
    alignItems: 'center',
    flex: 4,
  },
  contentContainer: {
    width: '82%',
  },
  cardText: {
    paddingBottom: '5%',
    lineHeight: RF(3.9),
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'WorkSans-Light',
    color: '#000000',
    fontSize: RF(2.4),
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginLeft: '7%',
    marginRight: '7%',
    alignContent: 'space-around',
  },
  cardButtonContainer: {
    paddingBottom: '2.5%',
  },
  cardButton: {
    height: Dimensions.get('window').height * 0.05,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '80%',
    height: '90%',
  },
  selectedTextContainer: {
    paddingTop: '5%',
    paddingLeft: '10%',
    paddingRight: '10%',
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
    flex: 1.25,
    marginBottom: '2.5%',
    marginTop: '2.5%',
  },
});

const mapStateToProps = ({ HotWallet }) => {
  const { hotWallet } = HotWallet;
  return { hotWallet };
};

export default connect(mapStateToProps, null)(ConfirmPassphrase)
