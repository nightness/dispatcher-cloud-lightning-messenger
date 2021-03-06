import 'react-native-gesture-handler'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ActivityIndicator, DisplayError, ThemeContext } from '../components'
import { useAuthState } from '../database/Firebase'
import { DrawerNavigator } from '../navigation'
import Authentication from '../screens/Authentication'
import { initialNavigationElements } from './DefaultRoutes'
import { FirebaseContext } from '../database/FirebaseContext'
import { GradientColors } from '../app/GradientColors'
import { Styles } from '../app/Styles'
import { GlobalContext } from '../app/GlobalContext'
import Toast from '../components/Toast'
import LoginActivity from '../screens/LoginActivity'
import { SafeAreaView } from 'react-native'

export const Stack = createStackNavigator()
export default () => {
    const [user, firebaseLoading, firebaseError] = useAuthState()
    const { activeTheme, getThemedComponentStyle } = useContext(ThemeContext)
    const { messages, setMessages } = useContext(GlobalContext)
    const { claims } = useContext(FirebaseContext)
    const colorSet = GradientColors[activeTheme]

    if (firebaseLoading) return (
        <ActivityIndicator viewStyle={Styles.views.activityIndicator} />
    )
    if (firebaseError) {
        const error = new Error(firebaseError.message ? firebaseError.message : firebaseError.code)
        return <DisplayError error={error} />
    }
    return (
        <NavigationContainer theme={activeTheme === 'Dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator
                headerMode="none"
                initialRouteName={user ? 'Main' : 'Authentication'}
            >
                <Stack.Screen name="Authentication" component={Authentication} />
                <Stack.Screen name="LoginActivity" component={LoginActivity} />
                <Stack.Screen name="Main">
                    {props => (
                        <DrawerNavigator
                            {...props}
                            background={colorSet.drawer}
                            claims={claims}
                            initialScreens={initialNavigationElements}
                            labelStyle={getThemedComponentStyle('Text')[activeTheme]} />
                    )}

                </Stack.Screen>
            </Stack.Navigator>
            <Toast messages={messages} setMessages={setMessages} />
        </NavigationContainer>
    )
}
