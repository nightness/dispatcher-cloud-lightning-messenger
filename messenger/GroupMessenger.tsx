import React, { useState, useContext, useEffect, useRef } from 'react'
import { View } from 'react-native'
import Screen from '../components/Screen'
import Picker, { PickerItem } from '../components/Picker'
import FirestoreCollectionView from '../database/FirestoreCollectionView'
import {
    Container,
    TextInput,
    Button,
    ThemeContext
} from 'cloud-lightning-themed-ui'
import { Styles } from '../app/Styles'
import { DocumentData, QuerySnapshot, useCollection, callFirebaseFunction } from '../database/Firebase'
import { FirebaseContext } from '../database/FirebaseContext'
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
}

export default ({ navigation }: Props) => {
    const { currentUser, claims } = useContext(FirebaseContext)
    const { activeTheme } = useContext(ThemeContext)
    const [snapshot, loadingCollection, errorCollection] = useCollection('/groups')
    const [groups, setGroups] = useState<PickerItem[]>([])
    const [selectedGroup, setSelectedGroup] = useState<PickerItem>()
    const [messageText, setMessageText] = useState('')
    const [groupCollectionPath, setGroupCollectionPath] = useState<string>('/public')
    const textInput = useRef<NativeTextInput>()

    useEffect(() => {
        textInput.current?.focus()
    }, [textInput])


    useEffect(() => {
        if (loadingCollection || errorCollection || !snapshot) return
        var newState: PickerItem[] = []
        const querySnapshot = snapshot as QuerySnapshot<DocumentData>
        // @ts-ignore
        querySnapshot.docs.forEach((docRef) => {
            const push = async (docRef: DocumentData) => {
                const name = await docRef.get('name')
                newState.push({
                    label: name,
                    value: docRef.id,
                })
            }
            push(docRef)
                .then(() => setGroups(newState))
                .catch((err) => console.warn(err))
        })
    }, [snapshot])

    useEffect(() => {
        console.log(claims)
    }, [claims])

    useEffect(() => {
        if (selectedGroup && selectedGroup.value)
            setGroupCollectionPath(`/groups/${selectedGroup.value}/messages/`)
        console.log(selectedGroup)
    }, [selectedGroup])

    const sendMessage = () => {
        if (!selectedGroup) return
        const text = messageText
        setMessageText('')
        callFirebaseFunction('setMessage', {
            collectionPath: `/groups`,
            documentId: selectedGroup.value,
            message: text,
        }).then((results) => {
            const data = results.data
            if (typeof data.type === 'string') {
                console.error(data.message)
                if (data.type === 'silent') return
                alert(data.message)
            } else {
                console.log(data)
            }
            textInput.current?.focus()
        }).catch((error) => {
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
                <LinearGradient
                    colors={GradientColors[activeTheme].secondary}>

                    <View style={Styles.messenger.views}>
                        <Picker
                            data={groups}
                            onValueChanged={setSelectedGroup}
                        />
                    </View>
                </LinearGradient>
                <FirestoreCollectionView<Message>
                    collectionPath={groupCollectionPath}
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
