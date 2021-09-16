import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'

import Color from '../constants/Color';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={stlyes.header}>
            <TitleText style={stlyes.headerTitle}>{props.title}</TitleText>
        </View>
    )
}

const stlyes = StyleSheet.create({
    header: {
        width: '100%',
        height: Dimensions.get('window').width > 600 ? 90 : 60,
        paddingTop: Dimensions.get('window').width > 600 ? 36 : 18,
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
})

export default Header