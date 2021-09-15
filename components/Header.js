import React from 'react';
import { View, StyleSheet } from 'react-native'

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
        height: 90,
        paddingTop: 36,
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