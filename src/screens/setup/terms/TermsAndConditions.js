import React, { Component } from 'react';
import {
 Text, View, ScrollView, StyleSheet, Dimensions, SafeAreaView,
} from 'react-native';
import RF from "react-native-responsive-fontsize";
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Terms } from '../../../constants/Terms';
import LinearButton from '../../../components/LinearGradient/LinearButton';
import { enterDebug } from '../../../actions/ActionCreator';

/**
 * Initial terms and condition screen when the app is oppened for the first time.
 */
class TermsAndConditions extends Component {

    /**
     * Method used to navigate to the "createOrRestore" screen
     */
    navigate = () => {
      const navigateToCreateOrRestore = NavigationActions.navigate({
        routeName: 'createOrRestore',
      });
      this.props.navigation.dispatch(navigateToCreateOrRestore);
    };

    /**
     * Returns the scrollable component that displays the terms and conditions with a submit button
     */
    render() {      
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.mainContainer}>
            <View style={styles.headerContainer} >
              <Text style={styles.textHeader} onPress={this.props.enterDebug} >Terms & Conditions </Text>
            </View>
            <View style={styles.scrollViewContainer} >
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
              <View style={styles.footerGrandparentContainer}>
                <View style={styles.footerParentContainer} >
                  <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      );
    }
}

/**
 * Styles used in the terms and condition screen
 */
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
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
    color: '#1a1f3e',
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
    flex: 1.25,
    marginTop: '2.5%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '5%',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(1.7),
    color: '#c0c0c0',
    letterSpacing: 0.5,
  },
});

export default connect(null, { enterDebug })(TermsAndConditions);
