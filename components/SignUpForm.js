// Importér nødvendige komponenter fra React Native og Firebase.
import React, { useState } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Brug FontAwesome-ikoner, som også bruges i LoginForm.js

function SignUpForm() {
    const auth = getAuth();
    const navigation = useNavigation();

    // Tilstande til email, password og fejlmeddelelse.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    // Funktion til at håndtere "Sign Up" knappen.
    const handleSubmit = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Hvis brugeroprettelse er vellykket, naviger til skærmen "Login".
            navigation.navigate('Login');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign Up</Text>
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
            <Button onPress={() => handleSubmit()} title="Sign Up" style={styles.button} />
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

    },
    icon: {
        marginHorizontal: 10,
    },
});

export default SignUpForm;
