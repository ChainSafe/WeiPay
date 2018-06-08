import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Camera from 'react-native-camera';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

class AddWallet extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Wallet',
      headerRight: (
        <Icon
          name="menu"
          onPress={() => navigation.navigate('DrawerOpen')}
          title="SideMenu"
        />
      )
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      qrcode: ''
    }
  }

  onBarCodeRead = (e) => this.setState({ qrcode: e.data });

  render() {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => this.camera = cam}
          aspect={Camera.constants.Aspect.fill}
        >
          <Text style={{
            backgroundColor: 'white'
          }}>{this.state.qrcode}</Text>
        </Camera>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
export default AddWallet
