import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Terms } from '../../../constants/Terms';
import LinearButton from '../../../components/LinearGradient/LinearButton';

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
      const {
        mainContainer,
        textHeader,
        scrollView,
        textBody,
        btnContainer,
        button,
        footerContainer,
        textFooter,
      } = styles;

      return (
            <View style={mainContainer}>
                <Text style={textHeader} >Terms & Conditions </Text>
                <ScrollView style={scrollView}>
                    <Text style={textBody} >{Terms}</Text>
                </ScrollView>                
                <View style={btnContainer}>
                    <LinearButton
                        onClickFunction={this.navigate}
                        buttonText='Agree'
                        customStyles={button}
                    />
                </View>
                <View style={footerContainer}>
                    <Text style={textFooter}>Powered by ChainSafe </Text> 
                </View>
            </View>
      );
    }
}

/**
 * Styles used in the terms and condition screen
 */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafbfe',
    width: '100%',
    height: '100%',
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: 26,
    paddingLeft: '9%',
    paddingBottom: '2.5%',
    marginTop: '9%',
    letterSpacing: 0.8,
    color: '#1a1f3e',
  },
  scrollView:{
    height: '60%',
    flex: 3
  },
  textBody: {
    fontFamily: 'WorkSans-Light',
    fontSize: 12,
    paddingLeft: '10%',
    paddingRight: '10%',
    lineHeight: 16,
  },
  btnContainer: {
    marginTop: '5%',
    marginBottom: '3.5%',
    width: '100%',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,  
  },
  footerContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    paddingBottom: '5%',
    justifyContent: 'center', 
    alignItems: 'center',
    color: '#c0c0c0',
  },
});

export default TermsAndConditions;
