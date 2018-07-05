import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('./src/images/ethLogo.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'grey',
        justifyContent: 'center',
        height: 250,
        paddingTop: 15
    },
    logo: {
        width: 200,
    },
});

export default Logo;