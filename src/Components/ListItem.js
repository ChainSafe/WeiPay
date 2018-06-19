import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import CardSection from './common/CardSection';
import Card from './common/Card';
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


        return (
          <View>
            <Card
              style={[styles.check , coin.selected ? styles.valid : styles.invalid]}
            >
              <CheckBox center
                title={coin.title}
                iconLeft
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='red'
                checked={coin.selected}
                containerStyle={[title, coin.selected ? styles.valid : styles.invalid]}
                onPress={() => this.renderPress(coin)}
              />
            </Card>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 15, alignItems: 'flex-start',
  },

  invalid: {
    // borderColor: 'red',
    alignItems: 'flex-start',
  },

  valid: {
    // borderColor: 'green',
    alignItems: 'flex-start',
  }
})



const mapStateToProps = state => {
  return {
      tokenList: state.newWallet.tokens,
  }
};

export default connect(mapStateToProps, { addTokenToSetup })(ListItem)
