import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { selectWalletLanguage } from '../Actions/actionCreator';
import { SegmentedControls } from 'react-native-radio-buttons';

class CurrencyListItem extends Component {
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     checked: false
  //   };
  // }
  //
  //   renderPress (id){
  //     // this.props.addTokenToSetup(id);
  //     this.setState({
  //       checked: !(this.state.checked)
  //     })
  //
  //
  //   }

    render() {
        // const { coin } = this.props;
        // // const { title } = styles;
        //
        // const { checked } = this.state
        // //console.log(this.props);
        // return (
        //
        //
        //       <View>
        //         <Card
        //           style={styles.check}
        //         >
        //           <CheckBox center
        //               title={"coin.title"}
        //               checkedIcon='dot-circle-o'
        //               uncheckedIcon='circle-o'
        //               checkedColor='red'
        //               checked={checked}
        //               containerStyle={[title, checked ? styles.valid : styles.invalid]}
        //
        //           />
        //         </Card>
        //
        //       </View>

        return (
          <View>
            <Text>Hello</Text>
          </View>


        );
    }
}

const styles = StyleSheet.create({
    title: {
      paddingLeft: 15
    },

    invalid: {
      borderColor: 'red'
    },

    valid: {
      borderColor: 'green'
    }
})



const mapStateToProps = state => {
  return {
      currency: state.currency,
      language: state.settings.language,
      tokenList: state.newWallet.tokens,
      coin: state.coin

  };
};

export default connect(mapStateToProps, { selectWalletLanguage })(CurrencyListItem)
