import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import RadioGroup from 'react-native-radio-buttons-group';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import { selectWalletLanguage } from '../Actions/actionCreator';


class LanguageList extends Component {

    state = {
        data: this.props.language
    };

    // update state
    onPress = data => this.setState({ data });

    renderSelect(data) {
      let selectedlanguage = this.state.data.find(e => e.selected == true);
      selectedlanguage = selectedlanguage ? selectedlanguage.value : this.state.data[0].label;
      this.props.selectWalletLanguage(selectedlanguage);
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
    language: state.language
  }
}


export default connect(mapStateToProps, { selectWalletLanguage })(LanguageList);
//export default Test;
