import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Profile from '../Screens/Account/Profile';
import Categories from '../Screens/Categories/Categories';
import Empty from '../Screens/Empty/Empty';
import Home from '../Screens/Home/Home';
import CustomBottomNavigation from './CustomBottomNavigation';

const Tab = createBottomTabNavigator();

const Cart2 = () => {}

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown : false,
            }}
            initialRouteName={'Home'}
            tabBar={props => <CustomBottomNavigation {...props} />}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Categories" component={Categories} />
            <Tab.Screen name="Cart2" component={Cart2} />
            <Tab.Screen name="Wishlist" component={Empty} />
            <Tab.Screen name="Account" component={Profile} />
        </Tab.Navigator>
    );
};

export default BottomNavigation;