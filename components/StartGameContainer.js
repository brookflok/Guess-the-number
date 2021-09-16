import React from 'react'
import { Button, Dimensions, StyleSheet, Text } from 'react-native';
import BodyText from './BodyText';
import Card from './Card';
import MainButton from './MainButton';
import NumberContainer from './NumberContainer';

const StartGameContainer = props => {
    return (
        <Card style={styles.confirmContainer}>
            <BodyText>You selected</BodyText>
            <NumberContainer>{props.children}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(props.selectedNumber)}>
                START GAME
            </MainButton>
        </Card>
    );
}

const styles = StyleSheet.create({
    confirmContainer: {
        marginTop: Dimensions.get('window').width >600 ? 20 : 5,
        alignItems: 'center'
    },
})

export default StartGameContainer;