import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Styles } from '../shared/Constants'
import View from './View'

export default () => {
    return (
        <View style={Styles.views.activityIndicator}>
            <ActivityIndicator size="large" />
        </View>
    )
}
