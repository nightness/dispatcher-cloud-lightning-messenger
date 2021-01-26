import React, { useState, useContext, useEffect } from 'react'
import { View, Image } from 'react-native'
import { Container, Text, TextInput, Button, ScrollView, Modal, ActivityIndicator, DisplayError } from './common/Components'
import { getAuth, callFunction, GoogleAuthProvider } from './firebase/Firebase'
import { Styles, Themes } from './shared/Constants'
import { GlobalContext } from './shared/GlobalContext'

export const LogoutModal = ({ navigation, shown, dismiss }) => {
    const firebaseLogout = () => {
        getAuth().signOut().then(() => {
            navigation.replace('Authentication')
        }).catch(error => {

        })
    }

    return (
        <Modal
            visible={shown}
            onTouchOutside={() => dismiss && dismiss()}
        >
            <View style={{ flex: 1 }}>
                <Text style={Styles.logoutModal.text}>
                    Are you sure you want to logout?
                    </Text>
                <View style={Styles.logoutModal.buttonView}>
                    <Button
                        style={Styles.logoutModal.button}
                        title='Yes'
                        onPress={firebaseLogout}
                    />
                    <Button
                        style={Styles.logoutModal.button}
                        title='No'
                        onPress={() => dismiss && dismiss()}
                    />
                </View>
            </View>
        </Modal>
    )
}

export const Authentication = ({ navigation, customToken }) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordResetModalVisible, setPasswordResetModalVisible] = useState(false)
    const [isValidEMail, setIsValidEMail] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { theme, setTheme } = useContext(GlobalContext)
    const auth = getAuth()

    useEffect(() => {
        if (customToken) {
            auth
                .signInWithCustomToken(customToken)
                .then(() => {
                    navigation.replace("Main")
                })
                .catch(error => {
                    alert(error)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const onSignUpPress = () => {
        setIsRegistering(true)
    }

    const onGotoLoginPress = () => {
        setIsRegistering(false)
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
        } else {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigation.replace("Main")
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }

    const onPasswordKeyPress = ({ key }) => {
        if (key != 'Enter') return
        onLoginPress()
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        auth.signInWithPopup(provider)
            .then(() => {
                navigation.replace("Main")
            })
            .catch(error => {
                alert(error)
            })
    }

    const onLoginPress = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.replace("Main")
            })
            .catch(error => {
                alert(error)
            })
    }

    const sendPasswordReset = () => {
        if (isValidEMail) {
            console.log(`Send Password reset to: ${email}`)
            setSubmitted(true)
            auth
                .sendPasswordResetEmail(email)
                .then(() => {
                    setPasswordResetModalVisible(false)
                    setSubmitted(false)
                })
                .catch(error => {
                    alert(error)
                    setSubmitted(false)
                })
        }
    }

    const onPasswordResetPress = () => {
        setPasswordResetModalVisible(true)
    }

    useEffect(() => {
        const emailRegEx = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        setIsValidEMail(email.match(emailRegEx))
    }, [email])

    if (isLoading) {
        return <ActivityIndicator />
    } else if (error) {
        const message = error.message ? error.message : error
        return <DisplayError errorMessage={message} />
    } else {
        return (
            <>
                <Modal
                    visible={passwordResetModalVisible}
                    onTouchOutside={() => {
                        setPasswordResetModalVisible(false)
                    }}
                >
                    <View>
                        <TextInput
                            placeholder='E-mail'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <Button
                            disabled={submitted || !isValidEMail}
                            title='Reset Password'
                            onPress={sendPasswordReset}
                        />
                    </View>
                </Modal>
                <Container>
                    <ScrollView
                        style={{ flex: 1, width: '100%' }}
                        keyboardShouldPersistTaps="always">

                        <Image
                            style={Styles.auth.logo}
                            source={require('../assets/icon.png')}
                        />
                        {isRegistering &&
                            <TextInput
                                placeholder='Full Name'
                                onChangeText={(text) => setFullName(text)}
                                value={fullName}
                            />
                        }
                        <TextInput
                            placeholder='E-mail'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <TextInput
                            secureTextEntry
                            placeholder='Password'
                            onChangeText={(text) => setPassword(text)}
                            onKeyPress={onPasswordKeyPress}
                            value={password}
                        />
                        {isRegistering &&
                            <TextInput
                                secureTextEntry
                                placeholder='Confirm Password'
                                onChangeText={(text) => setConfirmPassword(text)}
                                value={confirmPassword}
                            />
                        }
                        {isRegistering && <>
                            <Button
                                title='Create Account'
                                disabled={submitted || !isValidEMail}
                                onPress={onRegisterPress}
                            />
                            <View style={Styles.auth.footerView}>
                                <Text fontSize={16}>Already got an account?</Text>
                                <Button
                                    title='Log in'
                                    onPress={onGotoLoginPress}
                                />
                            </View>
                        </>}
                        {!isRegistering && <>
                            <Button
                                title='Log in'
                                disabled={submitted || !isValidEMail}
                                onPress={onLoginPress}
                            />
                            <View style={Styles.auth.footerView}>
                                <Text fontSize={16}>Don't have an account?</Text>
                                <Button
                                    title='Sign up'
                                    onPress={onSignUpPress}
                                />
                            </View>
                            <View style={Styles.auth.footerView}>
                                <Text fontSize={16}>Did you forget your password?</Text>
                                <Button
                                    title='Password Reset'
                                    onPress={onPasswordResetPress}
                                />
                            </View>
                            <View style={Styles.auth.footerView}>
                                <Text fontSize={16}>Google Sign-In?</Text>
                                <Button
                                    title='Google Sign-In'
                                    onPress={signInWithGoogle}
                                />
                            </View>
                        </>}
                    </ScrollView>
                </Container>
            </>
        )
    }
}

export default ({ navigation }) =>
    <Authentication
        navigation={navigation}
        customToken={'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYxMTI4OTc0MiwiZXhwIjoxNjExMjkzMzQyLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1iZ3NtZ0BjbG91ZC1saWdodG5pbmcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1iZ3NtZ0BjbG91ZC1saWdodG5pbmcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiJpZ05yRmFqbGJCMFhIVkVtYnp5dSIsImNsYWltcyI6eyJkaXNwYXRjaGVyIjp0cnVlfX0.roYbfVM3KsWbBwuwcBRhD5HO-vVOyuw6lwYe9Que-kcwaf-ooUPOeARgbnV4g74KAeT_z7-m_xH47HoQreqKBYpwAe6DNHRpjKiEPY7B44XImo9ghREBo13U0W_yZMEsss7dma-3tf2ESBrBebupeF_9W9wAD5PqfamCoJGEtjBo_wSX0FITYEXXV0zTe2o8I98jtfAhc6THEhJ1pXdZF-X4_QPq-6JAJgruTF0mU84LaI9cObuBsygNqXGuOLq-CKAiib-hjdna_-WM4kA6eqtX6t4bT_x_IPD4RLT7Ppa4Ea14s5Y3kbsOs2Cv615Tr88x5sv9c4-PWg3yAULX9Q'}
    />

