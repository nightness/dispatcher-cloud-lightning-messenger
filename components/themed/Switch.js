import React, { useState, useEffect, useContext } from 'react'
import { Switch } from 'react-native'
import { Styles, Themes } from '../shared/Constants'
import { themedSwitch } from '../shared/constants/Themes'
import { GlobalContext } from '../shared/GlobalContext'

export default ({ children, style, onChange }) => {
    const [isEnabled, setIsEnabled] = useState(false)
    const { theme } = useContext(GlobalContext)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    useEffect(() => {
        if (typeof onChange === 'function')
            onChange(isEnabled)
    }, [isEnabled])

    return (
        <Switch style={[Styles.themedSwitch.default, style]}
            trackColor={{
                false: Themes.themedSwitch[theme].trackColorOff,
                true: Themes.themedSwitch[theme].trackColorOn
            }}
            thumbColor={
                isEnabled ?
                    Themes.themedSwitch[theme].thumbColorEnabled :
                    Themes.themedSwitch[theme].thumbColorDisabled
            }
            ios_backgroundColor={Themes.themedSwitch[theme].iosBackgroundColor}
            onValueChange={toggleSwitch}
            value={isEnabled}
        >
            {children}
        </Switch>
    )
}
