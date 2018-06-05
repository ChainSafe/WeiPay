import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import AddContactList from '../../../Components/AddContactList';
import { Card } from '../../../Components/common/Card';
import { CardSection } from '../../../Components/common/CardSection';


class addContact extends Component {

  render() {
    return (
      <View>
        <CardSection>
          <Card
          >
            <TextInput placeholder="Enter Name" />
          </Card>

        </CardSection>

        <AddContactList />
        <View style={styles.btnContainer} >
          <Button
            title='Add Contact'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: 'blue', borderRadius: 10, width: 225, height: 40, alignItems: 'center',
              justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
            }}
            textStyle={{ textAlign: 'center' }}
            onPress={this.navigate}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: 'column',
  },
  btnContainer: {
    alignItems: 'center', height: 60, paddingTop: 10, paddingBottom: 10, justifyContent: "center"
  }

});

export default addContact;
