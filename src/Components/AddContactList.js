import React, { Component } from 'react';
import { ListView, StyleSheet, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common/CardSection';
import { Card } from './common/Card';
import ListItem from './ListItem';
import addContactAction from '../Actions/actionCreator';
import addingContact from '../Actions/actionCreator';
import AddContactListItem from './AddContactListItem';

class AddContactList extends Component {

    componentWillMount() {
        let data = this.props.tokens

        if (this.props.type === 'tokens') {
            data = this.props.tokens.filter(coin => coin.type === 'PortfolioCoin')
        } else if (this.props.type === 'tokens') {
            data = this.props.tokens.filter(coin => coin.type === 'PortfolioToken')
        }

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        //this passes in the AddContactList.json file via reducer -> state -> connect -> mapstatetoprops
        this.dataSource = ds.cloneWithRows(data);
    }

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    renderRow(coin) {

        return <AddContactListItem coin={coin} />;

    }

    renderName(name) {
        console.log(name);
        this.props.addingContact(name)
        this.setState({ name: name })

    }

    render() {
        return (
            <View>
                <TextInput textAlign={'center'} placeholder="Enter Contact Name"
                    style={styles.NameInputStyle} onChangeText={(text) => this.renderName(text)} />
                <View >
                    <ListView dataSource={this.dataSource} renderRow={this.renderRow} removeClippedSubviews={false} />
                </View>
            </View>

        );
    }
}

{/* <View pointerEvents={this.state.name !== "" ? 'auto' : 'none'}>
    <AddContactList />
</View> */}


const styles = StyleSheet.create({
    NameInputStyle: {
        paddingTop: 10,
        paddingLeft: 2,
        paddingRight: 2,
        fontWeight: 'bold',
        backgroundColor: 'red',
        fontSize: 15,
        width: '100 %', backgroundColor: 'white'
    }
});

/* Object return will show up to props */
const mapStateToProps = state => {
    return {
        tokens: state.newWallet.tokens
    }
}

export default connect(mapStateToProps, { addingContact })(AddContactList);

