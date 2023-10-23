// Importér nødvendige komponenter fra React og React Navigation.
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ProfileScreen from './components/ProfileScreen';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ConsultantsList from './components/ConsultantsList';
import CompanyList from './components/CompanyList';
import ScanContractScreen from './components/ScanContractScreen';
import ContractsScreen from './components/Contracts'; // Tilføjet ContractsScreen

// Konfigurer din Firebase-app ved hjælp af den angivne konfigurationsnøgle.
const firebaseConfig = {
  apiKey: "AIzaSyApfwVqJhk1Hh436kf8JOKPJSeeqqAtuOk",
  authDomain: "godkendelsesopgave-da5ed.firebaseapp.com",
  projectId: "godkendelsesopgave-da5ed",
  storageBucket: "godkendelsesopgave-da5ed.appspot.com",
  messagingSenderId: "324239871746",
  appId: "1:324239871746:web:d1af4c7877ca6f01dc7c1b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const Stack = createStackNavigator();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ loggedIn: true, user: user });
        console.log('Du er logget ind!');
      } else {
        setUser({ loggedIn: false });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ConsultantsList" component={ConsultantsList} />
        <Stack.Screen name="CompanyList" component={CompanyList} />
        <Stack.Screen name="ScanContract" component={ScanContractScreen} />
        <Stack.Screen name="Contracts" component={ContractsScreen} />
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
