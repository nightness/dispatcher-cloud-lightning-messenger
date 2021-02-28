import React, { useContext } from 'react'
import { Button, TouchableOpacity } from 'react-native'
import { Text } from './Components'
import { GlobalContext } from '../shared/GlobalContext'
import { Styles } from '../shared/Styles'
import { Themes } from '../shared/Themes'

interface Props {
    style: any
    title: string
    disabled: boolean
    reactNativeButton: any
    onPress: () => any
}

export default ({
    style,
    title,
    disabled,
    reactNativeButton,
    onPress,
    ...restProps
}: Props) => {
    const { theme } = useContext(GlobalContext)
    const properTheme = !disabled ? Themes.button[theme] : Themes.buttonDisabled[theme]

    // Use the native button
    if (reactNativeButton) {
        return <Button title={title} disabled={disabled} onPress={onPress} />
    }
    // TouchableHighlight is another option, this works nice though
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[Styles.button.touchable, properTheme, style]}
            onPress={onPress}
            {...restProps}
        >
            <Text style={[properTheme, Styles.button.text]}>{title}</Text>
        </TouchableOpacity>
    )
}