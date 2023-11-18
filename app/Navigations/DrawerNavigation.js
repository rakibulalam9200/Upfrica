import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import BottomNavigation from './BottomNavigation';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';


const Drawer = createDrawerNavigator();
const DrawerNavigation = (props) => {

    const {colors} = useTheme();

    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
            <Drawer.Navigator
                initialRouteName='BottomNavigation'
                screenOptions={{
                    headerShown:false,
                }}
                drawerContent={(props) => {
                    return <CustomDrawer navigation={props.navigation}/>
                }}
            >
                <Drawer.Screen name='BottomNavigation' component={BottomNavigation}/>
            </Drawer.Navigator>
        </SafeAreaView>
    );
};


export default DrawerNavigation;