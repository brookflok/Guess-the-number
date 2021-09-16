import React, { useState, useEffect } from 'react'
import {
    Button,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
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
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    useEffect(() => {

        //Function to update layout 
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }

        //Listener that starts when the phone dimensions change
        const layout = Dimensions.addEventListener('change', updateLayout)

        return () => layout?.remove()
    })


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

    let confirmOutput;

    //Will show confirmed output 
    if (confirmed) {
        confirmOutput =
            <StartGameContainer onStartGame={props.onStartGame} selectedNumber={selectedNumber}>
                {selectedNumber}
            </StartGameContainer>
    }


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={dismissKeyboardHandler}>
                    <View style={styles.screen}>
                        <TitleText
                            style={{
                                fontSize: Dimensions.get('window').width > 600 ? 20 : 16,
                                marginVertical: Dimensions.get('window').width > 600 ? 10 : 5
                            }}>
                            Start a new game!
                        </TitleText>
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
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title='Reset'
                                        color={Color.accent}
                                        onPress={resetInputHandler} />
                                </View>
                                <View style={{ width: buttonWidth }}>
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
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    inputContainer: {
        width: "80%",
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     // width: 100
    //     width: Dimensions.get('window').width / 4
    // },
    //More input Style
    input: {
        width: 50,
        textAlign: 'center'
    },
})

export default StartGameScreen;