// src/navigation/AppNavigator.tsx

import React from 'react';
import AdminDrawer from './AdminDrawer';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// USER SCREENS
import DashboardScreen from '../screens/DashboardScreen';

import PlotDetailsScreen from '../screens/PlotDetailsScreen';

import EnquiryScreen from '../screens/EnquiryScreen';

import ProfileScreen from '../screens/ProfileScreen';

import RegisterScreen from '../screens/RegisterScreen';


import SavedPlotsScreen from '../screens/SavedPlotsScreen';

// ADMIN SCREEN
import LoginScreen from '../screens/LoginScreens';
import AddNewPlotScreen from '../screens/admin/AddNewPlotScreen';
import CartScreen from '../screens/CartScreen';
import BookingSummaryScreen from '../screens/BookingSummaryScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import MyEnquiriesScreen from '../screens/MyEnquiriesScreen';


const Stack =
    createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}>

                {/* ========================= */}
                {/* USER REGISTER */}
                {/* ========================= */}
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                />

                {/* ========================= */}
                {/* USER LOGIN */}
                {/* ========================= */}
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    initialParams={{
                        isAdmin: false,
                    }}
                />

                {/* ========================= */}
                {/* ADMIN LOGIN */}
                {/* ========================= */}
                <Stack.Screen
                    name="AdminLogin"
                    component={LoginScreen}
                    initialParams={{
                        isAdmin: true,
                    }}
                />
                <Stack.Screen
                    name="AdminDrawer"
                    component={AdminDrawer}
                />

                {/* ========================= */}
                {/* USER DASHBOARD */}
                {/* ========================= */}
                <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                />



                {/* ========================= */}
                {/* OTHER USER SCREENS */}
                {/* ========================= */}
                <Stack.Screen
                    name="PlotDetails"
                    component={PlotDetailsScreen}
                />

                <Stack.Screen
                    name="Enquiry"
                    component={EnquiryScreen}
                />

                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                />

                <Stack.Screen
                    name="SavedPlots"
                    component={SavedPlotsScreen}
                />

                <Stack.Screen
                    name="HelpSupport"
                    component={HelpSupportScreen}
                />

                <Stack.Screen
  name="MyEnquiries"
  component={MyEnquiriesScreen}
/>

                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                />

                <Stack.Screen
                    name="BookingSummary"
                    component={BookingSummaryScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;