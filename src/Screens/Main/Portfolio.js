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
        <View style={{ paddingRight: 15 }}>
          <Icon
            name="menu"
            onPress={() => navigation.navigate('DrawerOpen')}
            title="SideMenu"
            style={{ paddingLeft: 20 }}
          />
        </View>
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

  renderRow = (token) => {
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
        <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
        <View style={styles.btnContainer} >
          <Button
            title='Add Token or Coin'
            icon={{ size: 28 }}
            buttonStyle={{
              backgroundColor: 'blue', borderRadius: 10, width: 250, height: 40, alignItems: 'center',
              justifyContent: 'center', marginBottom: 25, marginTop: 5.5
            }}
            textStyle={{ textAlign: 'center' }}
            onPress={() => this.props.navigation.navigate('AddToken')}
          />
        </View>
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
    alignItems: 'center',
    height: 80,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "center"
  },
})

function mapStateToProps({ newWallet }) {
  return { newWallet }
}

export default connect(mapStateToProps)(Portfolio);
