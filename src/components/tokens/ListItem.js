import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox, Button, List, ListItem, Icon, } from 'react-native-elements'
import { CardSection } from '../common/CardSection';
import { Card } from '../common/Card';
import { addTokenToSetup } from '../../actions/ActionCreator';

/**
 * React Component
 * Class is used to create a single item of the 
 * selectable token list
 */
class CoinListItem extends Component {

  /**
   * Initializer
   * Creates a boolean state variable which is used
   * to keep track of whether this item was selected or not
   */
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  /**
   * Upon selecting this coin,
   *  "addTokenToSetup" action is executed in order to add this item to the global state variable
   *  In-class boolean state variable is the opposite of what it used to be
   * @param {Object} coin 
   */
  renderPress(coin) {
    this.props.addTokenToSetup(coin);
    this.setState({
      checked: !(this.state.checked)
    })
  }

  /**
   * Returns a component that is based on the properties of the coin
   * prop and it can be selected or unselected by the user.
   */
  render() {
    const { coin } = this.props;
    const { title } = styles;
    const { checked } = this.state

    return (
      <View style={{ marginTop:'2.5%'}}>
        <TouchableOpacity 
          onPress={() => this.renderPress(coin)}>
        <View style={[styles.check, coin.selected ? styles.containerSelected : styles.containerDeselect]}>
          <ListItem
            hideChevron
            key={coin.id}
            roundAvatar
            avatar={{ uri: coin.avatar_url }}
            title= {
              <View style={{flexDirection:'row', justifyContent:"center", marginLeft:'3.5%'}}>
               
                <Text style={{ 
                  fontSize:16,
                  fontFamily: "Cairo-Regular",  
                  alignItems:"flex-start",
                  flex:1,
                  width:'90%',
                  letterSpacing: 0.5,  
                  // backgroundColor:"blue",
                  top: '6%'                                               
                  }}>
                    {coin.symbol}
                  </Text> 

                  <View style={{ top:'5.5%' }} >
                    <CheckBox center 
                      iconRight
                      iconType='material'
                      checkedIcon='clear'
                      uncheckedIcon='add'
                      uncheckedColor='#27c997'
                      checkedColor='red'
                      checked={coin.selected}
                      containerStyle={[title, coin.selected ? styles.valid : styles.invalid]}                  
                      onPress={() => this.renderPress(coin)}
                      /> 
                    </View>   
              </View>
            }   
            subtitle={
              <View style={{flexDirection:'row', justifyContent:"center", marginLeft:'3.5%'}}>
                <Text style={{
                  fontSize:11, 
                  fontFamily: "Cairo-Light",             
                  alignItems:"flex-start",
                  flex:1,
                  width:'90%',  
                  letterSpacing: 0.4,  
                  top: '-3.5%',
                  // backgroundColor:"green",
                  height: '100%'                
                }}>
                  {coin.title}
                </Text>           
              </View>
            }
            containerStyle = {{
              borderRadius: 10, 
              width: '100%', 
              height: 63,            
              backgroundColor: '#ffffff',
              justifyContent:"center",
              borderWidth:0.5,
              borderColor: '#F8F8FF',
              shadowColor: '#F8F8FF',
              shadowOffset: { width: 1, height: 1},
              shadowOpacity:20,
              shadowRadius: 10,
            }}
            avatarStyle = {{           
              marginTop:'-5%',         
            }}
          />
        </View>
        </TouchableOpacity >
      </View>
    )
  }
}

/**
 * Component Styles
 */
const styles = StyleSheet.create({
  title: {
    paddingLeft: 15,
    paddingRight: '15%',
    alignItems: 'flex-end',
    backgroundColor:'#ffffff',
    width:'100%',
    borderWidth: 0,
  },
  invalid: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: '2.5%'
  },
  valid: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: '2.5%'    
  },
  containerSelected : {
    // borderColor: '#27c997',
    borderWidth:2,
    width: '83%', 
    borderRadius: 10, 
  },
  containerDeselect :{ 
    // borderColor: '#d0021b',
    borderWidth:2,
    width: '83%', 
    borderRadius: 10, 
  }
})

/**
 * This function is not being used
 * @param {Object} state 
 */
const mapStateToProps = state => {
  return {
    tokenList: state.newWallet.tokens,
  }
};

export default connect(mapStateToProps, { addTokenToSetup })(CoinListItem)
