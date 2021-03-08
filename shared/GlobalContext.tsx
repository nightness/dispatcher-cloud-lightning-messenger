import React, { createContext, useState, useEffect, useRef } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as Notifications from 'expo-notifications'
import * as Defaults from './Defaults'
import { Theme } from './Themes'
import { Platform } from 'react-native'
import { Constants } from 'expo'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

type ContextType = {
    theme: Theme
    setTheme?: (theme: Theme) => void
    screenOrientation?: ScreenOrientation.Orientation
}

export const GlobalContext = createContext<ContextType>({
    theme: Defaults.defaultTheme,
})

interface Props {
    children: JSX.Element
}

export const GlobalProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState<Theme>(Defaults.defaultTheme)
    const [
        screenOrientation,
        setScreenOrientation,
    ] = useState<ScreenOrientation.Orientation>(ScreenOrientation.Orientation.UNKNOWN)

    // Screen orientation state handling
    useEffect(() => {
        ScreenOrientation.unlockAsync().catch((err) => console.warn(err))
        ScreenOrientation.getOrientationAsync()
            .then((value: ScreenOrientation.Orientation) => {
                setScreenOrientation(value)
                // @ts-ignore
                ScreenOrientation.lockAsync(value).catch((err) => console.warn(err))
            })
            .catch((err) => console.warn(err))

        ScreenOrientation.addOrientationChangeListener((value) =>
            setScreenOrientation(value.orientationInfo.orientation)
        )
    }, [])

    // Clean-up
    useEffect(() => () => ScreenOrientation.removeOrientationChangeListeners())

    return (
        <GlobalContext.Provider value={{ theme, setTheme, screenOrientation }}>
            {children}
        </GlobalContext.Provider>
    )
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}