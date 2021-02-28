export type Theme = 'Light' | 'Dark'

export type ThemeStyles = {
    activeTintColor?: string
    backgroundColor?: string
    borderColor?: string
    borderLeftColor?: string
    borderBottomColor?: string
    borderTopColor?: string
    borderRightColor?: string
    color?: string
    inactiveTintColor?: string
    iosBackgroundColor?: string
    thumbColorOn?: string
    thumbColorOff?: string
    trackColorOn?: string
    trackColorOff?: string
}

export interface ThemeType {
    Light: ThemeStyles
    Dark: ThemeStyles
}

export class Themes {
    static readonly screen: ThemeType = {
        Light: {
            backgroundColor: '#ccc',
            borderBottomColor: '#333',
        },
        Dark: {
            backgroundColor: '#333',
            borderBottomColor: '#eee',
        },
    }

    static readonly modal: ThemeType = {
        Light: {
            backgroundColor: '#ddd',
            borderColor: '#333',
        },
        Dark: {
            backgroundColor: '#246',
            borderColor: '#eee',
        },
    }

    static readonly defaultView: ThemeType = {
        Light: {
            borderColor: 'black',
        },
        Dark: {
            borderColor: 'white',
        },
    }

    static readonly container: ThemeType = {
        Light: {
            backgroundColor: '#ddd',
            borderColor: 'black',
        },
        Dark: {
            backgroundColor: '#212121',
            borderColor: '#aaa',
        },
    }

    static readonly view: ThemeType = {
        Light: {
            borderColor: 'black',
        },
        Dark: {
            borderColor: 'white',
        },
    }

    static readonly iconColor: ThemeType = {
        Light: {
            color: '#555',
        },
        Dark: {
            color: 'red',
        },
    }

    static readonly text: ThemeType = {
        Light: {
            color: '#000',
        },
        Dark: {
            color: '#eee',
        },
    }

    static readonly helperText: ThemeType = {
        Light: {
            color: '#400',
        },
        Dark: {
            color: '#D00',
        },
    }

    static readonly themedSwitch: ThemeType = {
        Light: {
            trackColorOn: '#81b0ff',
            trackColorOff: '#767577',
            thumbColorOn: '#ddd',
            thumbColorOff: '#f4f3f4',
            iosBackgroundColor: '#3e3e3e',
        },
        Dark: {
            trackColorOn: '#22b0ff',
            trackColorOff: '#767577',
            thumbColorOn: '#fff',
            thumbColorOff: '#f4f3f4',
            iosBackgroundColor: '#3e3e3e',
        },
    }

    static readonly textInput: ThemeType = {
        Light: {
            color: '#212121',
            backgroundColor: '#eee',
        },
        Dark: {
            color: '#eee',
            backgroundColor: '#333',
        },
    }

    static readonly placeHolderText: ThemeType = {
        Light: {
            color: '#aaa',
        },
        Dark: {
            color: '#888',
        },
    }

    static readonly materialIcons: ThemeType = {
        Light: {
            color: '#212121',
        },
        Dark: {
            color: '#aaaaaa',
        },
    }

    static readonly button: ThemeType = {
        Light: {
            color: 'white',
            backgroundColor: '#999',
        },
        Dark: {
            color: '#eee',
            backgroundColor: '#899eec',
        },
    }

    static readonly buttonDisabled: ThemeType = {
        Light: {
            color: '#aaa',
            backgroundColor: '#444',
        },
        Dark: {
            color: '#999',
            backgroundColor: '#777',
        },
    }

    static readonly picker: ThemeType = {
        Light: {
            color: '#888',
            backgroundColor: '#eee',
        },
        Dark: {
            color: '#eee',
            backgroundColor: '#222',
        },
    }

    static readonly pickerDisabled: ThemeType = {
        Light: {
            color: '#444',
            backgroundColor: '#aaa',
        },
        Dark: {
            color: '#999',
            backgroundColor: '#777',
        },
    }

    static readonly tabNavigator: ThemeType = {
        Light: {
            activeTintColor: '#246',
            inactiveTintColor: '#468',
            activeBackgroundColor: '#ddd',
            inactiveBackgroundColor: '#bbb',
        },
        Dark: {
            activeTintColor: '#eee',
            inactiveTintColor: 'gray',
            activeBackgroundColor: '#555',
            inactiveBackgroundColor: '#444',
        },
    }
}