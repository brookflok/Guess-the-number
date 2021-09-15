import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Color from '../constants/Color';

const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={{...styles.button, ...props.styles}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: Color.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50
    },
    buttonText:{
        color:'#fff',
        fontFamily: 'open-sans',
        fontSize: 18,
        textAlign:'center'
    }
})

export default MainButton;