import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addTokenToSetup } from '../Actions/actionCreator';

var touched = false;

class ListItem extends Component {
  constructor() {
    super();

    this.state = {
      checked: false
    };
  }

    renderPress(coin) {
      this.props.addTokenToSetup(coin);
      this.setState({
        checked: !(this.state.checked)
      })

      console.log(this.props.tokenList);

    }

    //isMember ? "$2.00" : "$10.00"
    //condition ? --then-- : --else--


    //onPress={this.renderSelect(coin.id)}
    //onPress={() => this.props.addTokenToSetup(coin.id)}
      //containerStyle={[title , !(this.props.tokenList.indexOf(coin.id) == -1) ? styles.invalid : styles.valid]}
    render() {
        const { coin } = this.props;
        const { title } = styles;

        const { checked } = this.state
        //console.log(this.props);
        return (


              <View>
                <Card
                  style={[styles.check , (this.props.tokenList.indexOf(coin.id) != -1) ? styles.valid : styles.invalid]}
                >
                  <CheckBox center
                    title={coin.title}
                    iconLeft
                    iconType='material'
                    checkedIcon='clear'
                    uncheckedIcon='add'
                    checkedColor='red'
                    checked={checked}
                    containerStyle={[title, checked ? styles.valid : styles.invalid]}
                    onPress={() => this.renderPress(coin)}
                  />
                </Card>

              </View>




        )
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
      tokenList: state.newWallet.tokens
  };
};

export default connect(mapStateToProps, { addTokenToSetup })(ListItem)
