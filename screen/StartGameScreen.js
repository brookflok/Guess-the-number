import React, { useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import Card from '../components/Card';
import StartGameContainer from '../components/StartGameContainer';
import Input from '../components/Input';
import Color from '../constants/Color';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    let confirmOutput;

    //Handling if someone tries to put something instead of a number
    const numberImputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }
    //Handling the keyboard dismiss
    const dismissKeyboardHandler = () => {
        Keyboard.dismiss();
    }

    //Reseting the input
    const resetInputHandler = () => {
        setEnteredValue('')
        setSelectedNumber('')
        setConfirmed(false)
    }

    //Confirming the number you entered 
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                "You should enter a number between 1 and 99",
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        dismissKeyboardHandler();

    }

    //Will show confirmed output 
    if (confirmed) {
        confirmOutput =
            <StartGameContainer onStartGame={props.onStartGame} selectedNumber={selectedNumber}>
                {selectedNumber}
            </StartGameContainer>
    }


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboardHandler}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a new game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberImputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title='Reset'
                                color={Color.accent}
                                onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title='Confirm'
                                color={Color.primary}
                                onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmOutput}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    //More input Style
    input: {
        width: 50,
        textAlign: 'center'
    },
})

export default StartGameScreen;