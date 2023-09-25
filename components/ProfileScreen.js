// Importér nødvendige komponenter og funktioner fra React Native og Firebase.
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

function ProfileScreen() {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();

    // Funktion til at håndtere logud-funktionalitet.
    const handleLogOut = async () => {
        try {
            await signOut(auth);
            // Naviger til login-skærmen eller hvor du ønsker, når brugeren logger ud.
            navigation.navigate('Login');
        } catch (error) {
            console.error("Logud mislykkedes: ", error);
        }
    };

    if (!user) {
        // Brugeren er ikke logget ind, vis en besked eller naviger til login-skærmen.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Du er ikke logget ind.</Text>
                <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Log ind</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Brugeren er logget ind, vis brugerens email og knapper til handlinger.
    return (
        <View style={styles.container}>
            <Text style={styles.emailText}>Nuværende bruger: {user.email}</Text>
            <TouchableOpacity style={styles.customButton} onPress={() => handleLogOut()}>
                <Text style={styles.buttonText}>Log ud</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('ConsultantsList')}>
                <Text style={styles.buttonText}>Find konsulenter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('CompanyList')}>
                <Text style={styles.buttonText}>Find virksomheder</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 16,
    },
    emailText: {
        fontSize: 18,
        marginBottom: 20,
    },
    customButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        marginBottom: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default ProfileScreen;
