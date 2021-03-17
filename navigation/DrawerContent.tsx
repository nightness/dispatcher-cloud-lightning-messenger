import React, { useContext, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { Orientation } from 'expo-screen-orientation'
import {
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { LinearGradient } from 'expo-linear-gradient'
import { FirebaseContext } from '../firebase/FirebaseContext'
import DrawerContentItem from './DrawerContentItem'
import { NavigationParams } from './DrawerParams'
import { GlobalContext } from '../shared/GlobalContext'
import { GradientColors } from '../shared/GradientColors'

const randomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
// Homer photoURL: https://yt3.ggpht.com/yti/ANoDKi75CjXyn5Omt5Z22dCgKdM_Ey2f9nraM4bYrxuu3A=s88-c-k-c0x00ffffff-no-rj-mo

interface RouteParameters {
    theme: 'Light' | 'Dark'
    isDrawerOpen: boolean
    screenOrientation: Orientation
}

export const DrawerContent = ({ navigation, ...restProps }: DrawerContentComponentProps) => {
    // Need to grab the stateful theme to determine the best background image
    // Like ../assets/ddd0da2a.png for dark mode
    // Like ../assets/dd426684.png for light mode
    const routeNames = restProps.state.routeNames
    const routes = restProps.state.routes
    const routeParams = routes?.[0].params as RouteParameters
    const theme: 'Light' | 'Dark' = routeParams?.theme ? routeParams.theme : 'Light'

    console.log(theme)

    const navigateTo = (screenName: string) => {
        navigation.closeDrawer()
        navigation.navigate(screenName)
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <LinearGradient
                colors={GradientColors[theme].drawer}
                    style={{
                    flex: 1,
                }}
            >
                <DrawerContentScrollView {...restProps}>
                    {routeNames.map((routeName) => {
                        const currentRoute = routes.filter(value => value.name === routeName)?.[0]
                        const params = currentRoute.params as NavigationParams
                        return (
                            <DrawerContentItem
                                navigation={navigation}
                                {...restProps}
                                activeTintColor={params?.activeTintColor}
                                inactiveTintColor={params?.inactiveTintColor}
                                labelText={routeName}
                                iconGroup={params?.iconGroup}
                                iconName={params?.iconName}
                                focusedIconName={params?.focusedIconName}
                                onPress={() => navigateTo(routeName)}
                                key={`route-${routeName}`}
                            />
                        )
                    })}
                </DrawerContentScrollView>
            </LinearGradient>
        </View>
    )
}