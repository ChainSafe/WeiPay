import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import RadioGroup from 'react-native-radio-buttons-group';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { selectWalletCurrency } from '../Actions/actionCreator';


class Test extends Component {

    state = {
        data: this.props.currency
    };

    // update state
    onPress = data => this.setState({ data });

    renderSelect(data) {
      let selectedcurrency = this.state.data.find(e => e.selected == true);
      selectedcurrency = selectedcurrency ? selectedcurrency.value : this.state.data[0].label;
      this.props.selectWalletCurrency(selectedcurrency);
      this.setState ({ data });
    }



    render() {
        // let selectedButton = this.state.data.find(e => e.selected == true);
        // selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        return (

                  <ScrollView contentContainerstyle={styles.container}>
                        <CardSection>
                          <RadioGroup radioButtons={this.state.data} onPress={this.renderSelect.bind(this)} />
                        </CardSection>
                  </ScrollView>




        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 100
    }

});


const mapStateToProps = state => {
  return {
    currency: state.currency
  }
}


export default connect(mapStateToProps, { selectWalletCurrency })(Test);
//export default Test;
