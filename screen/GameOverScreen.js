import React from 'react'
import { Button, Image, StyleSheet, View, Text } from 'react-native';

import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import Color from '../constants/Color';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                {/* <Image style={styles.image} source={require('../assets/images/success.png')}/> */}
                <Image
                    style={styles.image}
                    source={{ uri: 'https://media.istockphoto.com/vectors/the-end-handwrite-title-on-red-round-bacground-old-movie-ending-vector-id1153678999?k=20&m=1153678999&s=170667a&w=0&h=Rxx1PdRLfwjYlkAb6QBOHvfD1DS71wfiStI1Hs9j97Q=' }} />
            </View>
            <View style={styles.textContainer}>
            <BodyText style={styles.bodyText}>Your phone needed <Text style={styles.higlight}>{props.roundsNumber}</Text> rounds to guess the number <Text  style={styles.higlight}>{props.userNumber}</Text> </BodyText>
            </View>
            <View style={styles.buttonContainer}>
                <MainButton onPress={props.onRestart}> START A NEW GAME</MainButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        marginBottom:30,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#000',
        overflow: 'hidden'
    },
    higlight :{
        color: Color.primary,
        fontFamily:'open-sans-bold'
    },
    buttonContainer:{
        marginVertical:20
    },
    textContainer:{
        width:'80%'
    },
    bodyText:{
        textAlign:'center',
        fontSize:20
    }
})

export default GameOverScreen;