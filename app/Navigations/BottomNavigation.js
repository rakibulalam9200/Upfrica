import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';
import Profile from '../Screens/Account/Profile';
import Categories from '../Screens/Categories/Categories';
import Home from '../Screens/Home/Home';
import CustomBottomNavigation from './CustomBottomNavigation';

const Tab = createBottomTabNavigator();

const Cart2 = () => {}

const BottomNavigation = () => {
    const {token} = useSelector(store=> store.user)
    console.log(token,'token.......')
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
            {/* <Tab.Screen name="Wishlist" component={Empty} /> */}
            {token ?  <Tab.Screen name="Account" component={Profile} /> :<></>}
        </Tab.Navigator>
    );
};

export default BottomNavigation;