import React, { useState, useRef, useEffect } from 'react'
import { Alert, Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';
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
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props;



    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }

        const layout = Dimensions.addEventListener('change', updateLayout)

        return () => layout?.remove()
    })

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
    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <TitleText
                    style={{
                        fontSize: Dimensions.get('window').width > 600 ? 20 : 16,
                        marginVertical: Dimensions.get('window').width > 600 ? 10 : 5
                    }}>
                    Opponent's Guess
                </TitleText>
                <View style={styles.controls}>
                    <View style={{ width: buttonWidth }}>
                        <MainButton title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color="#fff" />
                        </MainButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={{ width: buttonWidth }}>
                        <MainButton title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color="#fff" />
                        </MainButton>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    width: Dimensions.get('window').width > 600 ? '80%' : '90%',
                }}>
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

    return (
        <View style={styles.screen}>
            <TitleText
                style={{
                    fontSize: Dimensions.get('window').width > 600 ? 20 : 16,
                    marginVertical: Dimensions.get('window').width > 600 ? 10 : 5
                }}>
                Opponent's Guess
            </TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card
                style={{
                    ...styles.buttonContainer,
                    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
                }}>
                <View style={{ width: buttonWidth }}>
                    <MainButton title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color="#fff" />
                    </MainButton>
                </View>
                <View style={{ width: buttonWidth }}>
                    <MainButton title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color="#fff" />
                    </MainButton>
                </View>
            </Card>
            <View style={{
                flex: 1,
                width: Dimensions.get('window').width > 600 ? '90%' : '90%',
            }}>
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
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 400,
        maxWidth: '80%'
    },
    // button: {
    //     width: '40%'
    // },
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