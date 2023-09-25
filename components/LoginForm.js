// Importér nødvendige komponenter fra React Native og Firebase.
import React, { useState } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome-ikoner

function LoginForm() {
    const auth = getAuth();
    const navigation = useNavigation();

    // Tilstande til email, password og fejlmeddelelse.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    // Funktion til at håndtere loginknappen.
    const handleSubmit = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Hvis login er vellykket, naviger til skærmen "Profile".
            navigation.navigate('Profile');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // Funktion til at håndtere "Sign Up" knappen.
    const handleSignUp = () => {
        // Naviger til skærmen "SignUp", når "Sign Up" knappen trykkes.
        navigation.navigate('SignUp');
    };

    // Funktion til at håndtere "Forgot Password?" knappen.
    const handleForgotPassword = () => {
        // Implementér logikken for håndtering af glemt adgangskode her.
        // Du kan navigere til en "ForgotPassword" skærm eller vise en modal, for eksempel.
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <View style={styles.inputContainer}>
                <FontAwesome name="user-circle-o" size={24} color="gray" style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    style={styles.inputField}
                />
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="gray" style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry
                    style={styles.inputField}
                />
            </View>
            {errorMessage && <Text style={styles.error}>Error: {errorMessage}</Text>}
            <Button onPress={() => handleSubmit()} title="Login" style={styles.button} />
            <Button onPress={() => handleSignUp()} title="Sign Up" style={styles.button} />
            <Button onPress={() => handleForgotPassword()} title="Forgot Password?" style={styles.button} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        marginVertical: 10,
        width: 300,
        borderColor: 'gray',
        borderRadius: 8,
    },
    inputField: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    header: {
        fontSize: 40,
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        // Bemærk: Button-komponenten har sine egne stilarter, som ikke er styret af denne styling.
    },
    icon: {
        marginHorizontal: 10,
    },
});

export default LoginForm;
