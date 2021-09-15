import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Color from '../constants/Color';
import BodyText from './BodyText';

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <BodyText style={styles.number} >{props.children}</BodyText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Color.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        color: Color.accent,
        fontSize: 22
    }
})

export default NumberContainer;