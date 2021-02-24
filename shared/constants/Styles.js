import { StyleSheet } from 'react-native'

export const view = StyleSheet.create({
    default: {

    }
})

export const themedSwitch = StyleSheet.create({
    default: {

    }
})

export const displayError = StyleSheet.create({
    header: {
        paddingTop: 5,
        fontSize: 18,
        fontWeight: '600'
    },
    text: {
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: '600'
    }
})

export const materialIcons = StyleSheet.create({
    icons: {
        paddingHorizontal: 3
    },
})

export const modal = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    }
})

export const auth = StyleSheet.create({
    logo: {
        flex: 1,
        height: 180,
        width: 180,
        alignSelf: "center",
        margin: 30
    },
    footerView: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
})

export const views = StyleSheet.create({
    screen: {
        flex: 1,
        paddingBottom: 2
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        flex: 1,
    },
    flexRowJustifyCenter: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    filletedBorderView: {
        flex: 1,
        margin: 0,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: "100%"
    },
    flatList: {

    }
})

export const button = StyleSheet.create({
    native: {

    },
    touchable: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    text: {
        fontWeight: '600'
    }
})

export const container = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        borderRadius: 5
    },
    scrollView: {
        width: "100%",
    }
})

export const infiniteScroll = StyleSheet.create({
    view: {
        flex: 1,
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: "100%"
    }
})

export const textInput = StyleSheet.create({
    input: {
        height: 32,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 5,
        marginHorizontal: 5,
        paddingLeft: 10
    },
})

export const picker = StyleSheet.create({
    toggleBox: {
        backgroundColor: '#ddd',
        borderColor: 'rgb(178,181,189)',
        borderBottomWidth: 1,
    },
    picker: {
        margin: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 2
    },
    item: {

    }
})

export const logoutModal = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        marginTop: 5,
        marginHorizontal: 10
    }
})

export const messenger = StyleSheet.create({
    viewChat: {
        flex: 1,
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: "100%"
    },
    views: {
        flexDirection: 'row',
        //alignContent: 'stretch',
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    flatList: {

    },
    textInput: {
        flex: 5,
        height: 35,
        marginLeft: 5,
        marginVertical: 5,
    },
    sendButton: {
        flex: 1,
        marginRight: 5,
        marginVertical: 5,
        height: 35,
    }
})