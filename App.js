// Importér de nødvendige biblioteker og komponenter fra React Native og Firebase.
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Card } from 'react-native-paper';

// Importér de forskellige komponenter, der skal bruges i navigationen.
import ProfileScreen from './components/ProfileScreen';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ConsultantsList from './components/ConsultantsList';
import CompanyList from './components/CompanyList';

// Konfigurer din Firebase-app ved hjælp af den angivne konfigurationsnøgle.
const firebaseConfig = {
  apiKey: "AIzaSyApfwVqJhk1Hh436kf8JOKPJSeeqqAtuOk",
  authDomain: "godkendelsesopgave-da5ed.firebaseapp.com",
  projectId: "godkendelsesopgave-da5ed",
  storageBucket: "godkendelsesopgave-da5ed.appspot.com",
  messagingSenderId: "324239871746",
  appId: "1:324239871746:web:d1af4c7877ca6f01dc7c1b"
};

// Initialiser Firebase-appen med konfigurationsnøglen.
const app = initializeApp(firebaseConfig);

// Hent auth-objektet fra Firebase-appen for at håndtere brugerautorisation.
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  // Her aktiverer vi en lytter ved hjælp af onAuthStateChanged til dynamisk at observere, om brugeren er logget ind eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Brugeren er logget ind
        setUser({ loggedIn: true, user: user });
        console.log("Du er logget ind!");
      } else {
        // Brugeren er logget ud
        setUser({ loggedIn: false });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Definér navigationsskærme for din app. */}
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ConsultantsList" component={ConsultantsList} />
        <Stack.Screen name="CompanyList" component={CompanyList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
