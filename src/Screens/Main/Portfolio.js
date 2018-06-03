import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage, ListView } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { List, ListItem, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';


class Portfolio extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Portfolio',
      headerLeft: null,
      headerRight: (
        <Icon
          name="menu"
          onPress={() => navigation.navigate('DrawerOpen')}
          title="SideMenu"
          style={{ paddingLeft: 20 }}
        />
      )
    }
  }

  componentWillMount() {
    let data = this.props.newWallet.tokens

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.dataSource = ds.cloneWithRows(data);
  }

  renderRow(token) {

    return (
       <ListItem
         roundAvatar
         avatar={{ uri: token.avatar_url }}
         key={token.id}
         title={token.title}
         onPress={() => this.props.navigation.navigate(token.type)}
       />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        {/* <List>
          {
            this.props.newWallet.tokens.map((l, i) => (
          <ListItem
          roundAvatar
          avatar={{ uri: l.avatar_url }}
          key={i}
          title={l.title}
          onPress={() => this.props.navigation.navigate(l.type)}
          />
            ))
          }
        </List> */}
        <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
        <View style={styles.btnContainer} >
          <Button
            title='Add Token or Coin'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: 'blue', borderRadius: 10, width: 250, height: 40, alignItems: 'center',
              justifyContent: 'center', marginBottom: 5.5, marginTop: 5.5
            }}
            textStyle={{ textAlign: 'center' }}
            onPress={() => this.props.navigation.navigate('AddToken')}
          />
        </View>
        {/* <Icon name="add" onPress={() => this.props.navigation.navigate('AddToken')} /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  btnContainer: {
    marginBottom: 5.5, alignItems: 'center', height: 60, paddingTop: 10, paddingBottom: 10, justifyContent: "center"
  },
})

function mapStateToProps({ newWallet }) {
  return { newWallet }
}

export default connect(mapStateToProps)(Portfolio);
