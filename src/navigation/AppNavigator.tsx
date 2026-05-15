// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/DashboardScreen';
import PlotDetailsScreen from '../screens/PlotDetailsScreen';
import EnquiryScreen from '../screens/EnquiryScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';

import RegisterScreen from '../screens/RegisterScreen';

import LoginScreens from '../screens/LoginScreens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>

 <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />


                

                 <Stack.Screen
          name="Login"
          component={LoginScreens}
        />
                

                <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                />

                <Stack.Screen
                    name="PlotDetails"
                    component={PlotDetailsScreen}
                />

                <Stack.Screen
                    name="Enquiry"
                    component={EnquiryScreen}
                />

                {/* <Stack.Screen
                    name="Booking"
                    component={BookingScreen}
                /> */}

                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;