import React, { Component } from 'react';
import {
  Text, View, ScrollView, StyleSheet, Dimensions, SafeAreaView,
} from 'react-native';
import RF from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { initializeAppTokenState, enterDebug } from '../../../store/actions/creators/AppConfig';
import { Terms } from '../../../../constants/data/Terms';
import LinearButton from '../../../components/linearGradient/LinearButton';
import TokenConfig from '../../../../scripts/tokens/tokenConfig';

class TermsAndConditions extends Component {
  componentDidMount() {
    const tokens = TokenConfig('setup');
    this.props.initializeAppTokenState(tokens);
  }

  navigate = () => {
    const navigateToCreateOrRestore = NavigationActions.navigate({
      routeName: 'createOrRestore',
    });
    this.props.navigation.dispatch(navigateToCreateOrRestore);
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer} >
            <Text style={styles.textHeader} onPress={this.props.enterDebug}>Terms & Conditions </Text>
          </View>
          <View style={styles.scrollViewContainer}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.textBody} >{Terms}</Text>
            </ScrollView>
          </View>
          <View style={styles.btnContainer}>
            <LinearButton
              onClickFunction={this.navigate}
              buttonText='Agree'
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
    height: '100%',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    paddingLeft: '9%',
    letterSpacing: 0.8,
    color: '#000000',
    fontWeight: '200',
  },
  scrollViewContainer: {
    flex: 5,
    paddingBottom: '2.5%',
    paddingTop: '2.5%',
  },
  scrollView: {
    height: '60%',
  },
  textBody: {
    fontFamily: 'WorkSans-Light',
    fontSize: RF(1.8),
    paddingLeft: '10%',
    paddingRight: '10%',
    lineHeight: RF(2.5),
    color: 'black',
    fontWeight: '300',
  },
  btnContainer: {
    width: '100%',
    flex: 1,
    marginTop: '1.5%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
});

export default connect(null, { enterDebug, initializeAppTokenState })(TermsAndConditions);
