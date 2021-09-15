import React from 'react'
import { StyleSheet, Text } from 'react-native';

const TitleText = props => {
    return (
        <Text style={{...styles.titleText, ...props.style}} >{props.children}</Text>
    );
}

const styles = StyleSheet.create({
    titleText:{
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    }
})

export default TitleText;