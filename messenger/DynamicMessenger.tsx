import React, { useState, useContext, useEffect, useRef } from 'react'
import { View } from 'react-native'
import Screen from '../components/Screen'
import FirestoreCollectionView from '../database/FirestoreCollectionView'
import {
    Container,
    TextInput,
    Button,
    ThemeContext
} from '../components'
import { Styles } from '../app/Styles'
import { callFirebaseFunction } from '../database/Firebase'
import Message from './Message'
import { StackNavigationProp } from '@react-navigation/stack'
import {
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    TextInput as NativeTextInput
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GradientColors } from '../app/GradientColors'

interface Props {
    navigation: StackNavigationProp<any>
    collectionPath: string
    documentId: string
}

export default ({ navigation, collectionPath, documentId }: Props) => {
    const { activeTheme } = useContext(ThemeContext)
    const [messageText, setMessageText] = useState('')
    const textInput = useRef<NativeTextInput>()

    useEffect(() => {
        textInput.current?.focus()
    }, [textInput])

    const sendMessage = () => {
        const text = messageText
        setMessageText('')
        callFirebaseFunction('setMessage', {
            collectionPath: `/groups`,
            documentId,
            message: text,
        }).then((results) => {
            const data = results.data
            if (typeof data.type === 'string') {
                console.error(data.message)
                if (data.type !== 'silent')
                    alert(data.message)
            } else {
                console.log(data)
            }
            textInput?.current?.focus()
        }).catch((error) => {
            console.log(error)
            alert('Unhandled exception')
        })
    }

    const onMessageKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (e.nativeEvent.key != 'Enter') return
        // Adds a new message to the chatroom
        sendMessage()
    }

    return (
        <Screen navigation={navigation} title={'Group Messenger'}>
            <Container>
                <FirestoreCollectionView<Message>
                    collectionPath={collectionPath}
                    autoScrollToEnd={true}
                    orderBy="postedAt"
                    limitLength={25}
                    // @ts-ignore
                    renderItem={({ item }) => <Message item={item} />}
                />

                <LinearGradient
                    colors={GradientColors[activeTheme].secondary}>
                    <View style={Styles.messenger.views}>
                        <TextInput
                            value={messageText}
                            style={Styles.messenger.textInput}
                            onChangeText={(msg) => setMessageText(msg)}
                            onKeyPress={onMessageKeyPress}
                            classRef={textInput as React.LegacyRef<NativeTextInput>}
                        />
                        <Button
                            title="Send"
                            style={Styles.messenger.sendButton}
                            disabled={messageText.length < 1}
                            onPress={sendMessage}
                        />
                    </View>
                </LinearGradient>
            </Container>
        </Screen>
    )
}
