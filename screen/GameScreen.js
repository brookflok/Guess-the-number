import React, { useState, useRef, useEffect } from 'react'
import { Alert, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const random = Math.random()
    const rndNum = Math.floor(random * (max - min) + min);
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum;
    }
}

//List Item for Scroll View
const renderListItem = (listLenght, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLenght - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, userChoice)
    const [currentGuess, setcurrentGuess] = useState(initialGuess)
    const [pastGuess, setPastGuess] = useState([initialGuess.toString()])

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props;


    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuess.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong...',
                [{ text: 'Sorry', style: 'cancel' }])
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setcurrentGuess(nextNumber)
        //    setRounds(currentRounds => currentRounds + 1)
        setPastGuess(currentPassGuesses => [nextNumber.toString(), ...currentPassGuesses])

    }

    return (
        <View style={styles.screen}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                    <MainButton title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color="#fff" />
                    </MainButton>
                </View>
                <View style={styles.button}>
                    <MainButton title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color="#fff" />
                    </MainButton>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuess.map((guess, index) => (renderListItem(guess, pastGuess.length - index )))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuess}
                    renderItem={renderListItem.bind(this, pastGuess.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    button: {
        width: "40%"
    },
    listContainer: {
        width: '60%',
        flex: 1
    },
    list: {
        flexGrow: 1,
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

})

export default GameScreen;