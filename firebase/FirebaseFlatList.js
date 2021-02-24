import React, { useState, useEffect, useRef } from 'react'
import { FlatList } from 'react-native'

// Bring local for NPM package
import { useCollection, useDocument, getDocumentsDataWithId, getData } from './Firebase'

// Remove for NPM package
import ActivityIndicator from '../components/ActivityIndicator'
import DisplayError from '../components/DisplayError'

export const EnhancedFlatList = ({ onStartReached, onStartReachedThreshold, autoScrollToEnd, refreshing, ...restProps }) => {
    const flatList = useRef()
    const atTop = useRef(true)
    const scrollOffset = useRef(0)
    const flatListHeight = useRef(0)

    if (typeof onStartReachedThreshold !== 'number')
        onStartReachedThreshold = 0

    const onScroll = ({
        nativeEvent: {
            contentOffset: { x, y },
            contentSize: { height: contentHeight, width: contentWidth },
            layoutMeasurement: { height, width },
        }
    }) => {
        const scrollHeight = contentHeight - height
        const scaledThreshold = Math.round(scrollHeight * onStartReachedThreshold)
        scrollOffset.current = y
        if (y < scaledThreshold && !atTop.current) {
            atTop.current = true
            if (typeof onStartReached === 'function')
                onStartReached(y)
        } else if (y - scaledThreshold > 0) {
            atTop.current = false
        }
    }

    // Web Native doesn't scroll 100% to the bottom
    const scrollToEnd = (animated = false) => {
        if (autoScrollToEnd && !refreshing && flatList.current) {
            flatList.current.scrollToEnd({ animated })

            // https://syntaxbytetutorials.com/react-native-flatlist-scrolltoindex-function-to-scroll-to-item-with-index-with-fixed-or-variable-unknown-row-size/
            // flatList.current.scrollToIndex({ offset: 17 })

            // flatList.current.scrollToOffset({ x: 0, y: 198, animated: true })
        }
    }

    const onContentSizeChange = newHeight => {
        //console.log(flatList.current)
        scrollToEnd()
    }

    const onLayout = ({ nativeEvent }) => {
        //console.log(nativeEvent.layout)
        flatListHeight.current = nativeEvent.layout.height
        scrollToEnd()
    }

    return (
        <FlatList
            {...restProps}
            refreshing={refreshing}
            ref={flatList}
            onScroll={onScroll}
            onLayout={onLayout}
            onContentSizeChange={onContentSizeChange}
        />
    )
}

export const FirebaseFlatList = ({ documentPath, collectionPath, orderBy, onStartReached, ...restProps }) => {
    const [collectionSnapshot, loadingCollection, errorCollection] = useCollection(collectionPath)
    //const [documentData, loadingData, errorData] = useDocumentData(documentPath)
    const [messages, setMessages] = useState([])
    const [loadingData, setDataLoading] = useState(true)
    const [errorData, setDataError] = useState(false)

    const fetchData = () => {
        getData(collectionSnapshot, orderBy).then((querySnapshot) => {
            setMessages(getDocumentsDataWithId(querySnapshot))
            setDataLoading(false)
        }).catch((e) => {
            setDataError(e)
        })
    }

    useEffect(() => {
        if (!loadingCollection && !errorCollection && collectionSnapshot)
            fetchData()
    }, [collectionSnapshot])

    let result = <ActivityIndicator />
    if (errorCollection || errorData) {
        result =
            <DisplayError
                permissionDenied={(errorCollection?.code === 'permission-denied' || errorData?.code === 'permission-denied')}
            />
    } else if (!loadingCollection && !loadingData) {
        result =
            <EnhancedFlatList data={messages} {...restProps} />
    }
    return (
        { result }
    )

}

export default FirebaseFlatList