import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
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
        paddingVertical: Dimensions.get('window').width >600 ? 12:8,
        paddingHorizontal: 30,
        borderRadius: 30
    },
    buttonText:{
        color:'#fff',
        fontFamily: 'open-sans',
        fontSize: Dimensions.get('window').width >600 ? 18:14,
        textAlign:'center'
    }
})

export default MainButton;