// Importér nødvendige komponenter fra React og React Navigation.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm'; // Importér LoginForm
import ConsultantsList from './ConsultantsList'; // Importér ConsultantsList
import CompanyList from './CompanyList'; // Importér CompanyList

const Stack = createStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            {/* Stack Navigator indeholder de forskellige skærme i din app. */}
            <Stack.Navigator initialRouteName="Login">
                {/* Skærmen 'Login' bruger LoginForm-komponenten og skjuler headeren. */}
                <Stack.Screen
                    name="Login"
                    component={LoginForm}
                    options={{ headerShown: false }}
                />
                {/* Skærmen 'ConsultantsList' bruger ConsultantsList-komponenten. */}
                <Stack.Screen name="ConsultantsList" component={ConsultantsList} />
                {/* Skærmen 'CompanyList' bruger CompanyList-komponenten. */}
                <Stack.Screen name="CompanyList" component={CompanyList} /> {/* Tilføj CompanyList som en skærm */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
