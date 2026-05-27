import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import SidebarDrawer from '../components/admin/SidebarDrawer';
import AdminDashboardScreen from '../screens/AdminDashboard';
import AddNewPlotScreen from '../screens/admin/AddNewPlotScreen';
import PlotsScreen from '../screens/admin/PlotsScreen';
import EnquiriesScreen from '../screens/admin/EnquiriesScreen';




const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        overlayColor: 'rgba(0,0,0,0.3)',
        swipeEnabled: true,
        drawerStyle: {
          width: '75%',
          backgroundColor: 'transparent',
        },
      }}
      drawerContent={props => (
        <SidebarDrawer {...props} />
      )}>

      {/* ========================= */}
      {/* ADMIN DASHBOARD */}
      {/* ========================= */}
      <Drawer.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
      />

      {/* ========================= */}
      {/* ADD NEW PLOT */}
      {/* ========================= */}
      <Drawer.Screen
        name="AddPlot"
        component={AddNewPlotScreen}
      />


      <Drawer.Screen
        name="PlotsList"
        component={PlotsScreen}
      />

      {/* ENQUIRIES SCREEN */}
      <Drawer.Screen
        name="Enquiries"
        component={EnquiriesScreen}
      />

    </Drawer.Navigator>
  );
};

export default AdminDrawer;