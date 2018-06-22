import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ListView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common/CardSection';
import  { Card } from './common/Card';
import _ from 'lodash'

import addContactAction from '../Actions/actionCreator';
import *  as actions from '../Actions/actionCreator.js';
import AddContactListItem from './AddContactListItem';
import { List, ListItem } from 'react-native-elements'

class AddContactList extends Component {

    constructor(props) {
        super(props);


        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            name: "",
            nameValue: "",
            coinValue: "",
            dataSource: ds.cloneWithRows(this.props.tokens),

        }

    }

    componentDidMount() {
      let copyTokens = this.props.tokens.slice(0).map(token => { return {...token, value: ""}})
      this.props.createContactAddresses(copyTokens)
    }

    // componentWillReceiveProps(nextProps) {
    //
    //   if (nextProps.contactName === "" && nextProps.contactAddress === "") {
    //
    //     let data = nextProps.tokens.map(token => {
    //                   token.value = ""
    //                   return token
    //                 })
    //
    //     const ds = new ListView.DataSource({
    //         rowHasChanged: (r1, r2) => r1 !== r2
    //     });
    //
    //     //this passes in the AddContactList.json file via reducer -> state -> connect -> mapstatetoprops
    //     this.dataSource = ds.cloneWithRows(data);
    //     this.setState({ dataSource: this.dataSource});
    //   }
    // }


    renderRow(coin) {

      return (
          <View style={styles.componentStyle} key={coin.title}>
            <CardSection>
              <View style={styles.section}>
                <Text style={styles.title}>{coin.title} 's Address</Text>
                <Card
                >
                  <TextInput
                    placeholder="Enter or Paste Address here"
                    onChangeText={(text) => this.props.renderAddress(text, coin.title, coin)}
                    ref={ref => this.props.contactAddress = ref}
                    value={this.props.contactAddress}
                    // key={this.props.contactAddress}
                  />
                </Card>
              </View>
            </CardSection>

          </View>
      )
    }

    listItem(token) {
      return (
        <ListItem title='Enter Address' textInput={true} />
      )
    }

    renderAddressInputs = () => {
      // debugger
      return (
        this.props.tokens.map(coin =>

            <View style={styles.componentStyle} key={coin.title}>
              <CardSection>
                <View style={styles.section}>
                  <Text style={styles.title}>{coin.title} 's Address</Text>
                  <Card
                  >
                    <TextInput
                      placeholder="Enter or Paste Address here"
                      onChangeText={(text) => this.props.renderAddress(text, coin.title, coin)}
                      ref={ref => this.props.contactAddress = ref}
                      value={this.props.contactAddress[coin.title]}
                    />
                  </Card>
                </View>
              </CardSection>

            </View>
        )
      )
    }

    render() {

        return (
            <View>
              <TextInput
                textAlign={'center'}
                placeholder="Enter Contact Name"
                style={styles.NameInputStyle}
                onChangeText={text => this.props.renderName(text)} //this.props.upDateContactName
                value={this.props.contactName} //this.props.contactName
              />
              <View >
                {this.renderAddressInputs()}
              </View>
            </View>

              );
            }
      }




const styles = StyleSheet.create({
  NameInputStyle: {
    paddingTop: 10,
    paddingLeft: 2,
    paddingRight: 2,
    fontWeight: 'bold',
    backgroundColor: 'red',
    fontSize: 15,
    width: '100 %', backgroundColor: 'white'
  },
  title: {
    fontWeight: "bold",
    fontSize: 13,
    color: "black",
    textShadowRadius: 3
  },

  section: {
    flex: 1,
    flexDirection: 'column'
  },

  componentStyle: {
    paddingTop: 3,
    paddingLeft: 2,
    paddingRight: 2
  }
});

/* Object return will show up to props */
const mapStateToProps = state => {
  return {
    tokens: state.newWallet.tokens,
    currentContact: state.contacts.currentContact,
    clearInput: state.contacts.clearInput,
    current: state.contacts.currentContact,

  }
}

export default connect(mapStateToProps, actions)(AddContactList);

{/* <View pointerEvents={this.state.name !== "" ? 'auto' : 'none'}>
  <AddContactList />
</View> */}
{/* <ListView
  // key={this.props.key}
  contactAddress={this.props.contactAddress}
  dataSource={this.state.dataSource}
  renderRow={this.renderRow.bind(this)}
  removeClippedSubviews={false}
  />
</View> */}
