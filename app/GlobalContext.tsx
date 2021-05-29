import React, { createContext, useState, useEffect, useRef } from 'react'
import * as Notifications from 'expo-notifications'
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'
import { Keyboard, Platform, useWindowDimensions, ViewStyle } from 'react-native'
import Toast, { AnyObject, ToastPosition } from "react-native-toast-message"

interface IShowToast {
    type: string,
    position?: ToastPosition,
    text1?: string,
    text2?: string,
    visibilityTime?: number,
    autoHide?: boolean,
    topOffset?: number,
    bottomOffset?: number,
    props?: AnyObject,
    onShow?: () => void,
    onHide?: () => void,
    onPress?: () => void
}

type ContextType = {
    hamburgerBadgeText?: string
    setHamburgerBadgeText?: React.Dispatch<React.SetStateAction<string | undefined>>
    sendNotificationImmediately?: (title: string, body: string) => Promise<void>
    showToast: (options: IShowToast) => void
    hideToast: () => void
}

if (Platform.OS !== 'web') {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    })
}

const askMicrophonePermission = async () => {
    const result = await Audio.getPermissionsAsync()
    let finalStatus = result.status
    if (result.status !== "granted") {
        const { status } = await Audio.requestPermissionsAsync()
        finalStatus = status
    }
    if (finalStatus !== "granted") {
        return false
    }
    return true
}

const askCameraPermission = async () => {
    const result = await Camera.getPermissionsAsync()
    let finalStatus = result.status
    if (result.status !== "granted") {
        const { status } = await Camera.requestPermissionsAsync()
        finalStatus = status
    }
    if (finalStatus !== "granted") {
        return false
    }
    return true
}

const askPermissions = async () => {
    const result = await Notifications.getPermissionsAsync()
    let finalStatus = result.status
    if (result.status !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
    }
    if (finalStatus !== "granted") {
        return false
    }
    return true
}

export const GlobalContext = createContext<ContextType>({
    // Defaults
    showToast: (options: IShowToast) => console.log(options), //Toast.show(options),
    hideToast: () => Toast.hide()
})

interface Props {
    children: JSX.Element
}

export const GlobalProvider = ({ children }: Props) => {
    const [hamburgerBadgeText, setHamburgerBadgeText] = useState<string>()

    useEffect(() => {
        if (Platform.OS !== 'web') {
            askPermissions()
                .then(() => {
                    Notifications.addNotificationReceivedListener((event) => {
                        console.log(event)
                    })
                })
            askCameraPermission()
                .then((result) => {
                    console.log(result)
                })
            askMicrophonePermission()
                .then((result) => {
                    console.log(result)
                })
        }
    }, [])

    // If finer control is needed, these can be customized more
    const showToast = (options: IShowToast) => console.log(options) // Toast.show(options)
    const hideToast = () => Toast.hide()
    const sendNotificationImmediately = async (title: string, body: string) => {
        if (Platform.OS === 'web') {
            return showToast({
                type: 'info',
                text1: title,
                text2: body,
                position: 'bottom',
                onHide: () => {

                }
            })
        }
        await Notifications.presentNotificationAsync({ title, body });
    }

    return (
        <GlobalContext.Provider value={{
            hamburgerBadgeText, setHamburgerBadgeText, showToast, hideToast, sendNotificationImmediately
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
