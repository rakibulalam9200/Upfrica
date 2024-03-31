import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useSelector } from "react-redux";
import Profile from "../Screens/Account/Profile";
import Cart from "../Screens/Cart/Cart";
import Categories from "../Screens/Categories/Categories";
import Home from "../Screens/Home/Home";
import CustomBottomNavigation from "./CustomBottomNavigation";

const Tab = createBottomTabNavigator();

const Cart2 = () => {};

const BottomNavigation = () => {
  const { token } = useSelector((store) => store.user);
  const { navFrom } = useSelector((store) => store.cart);
  console.log(navFrom, "navFrom.......");
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={navFrom === "cart" ? "Cart" : "Home"}
      tabBar={(props) => <CustomBottomNavigation {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Categories" component={Categories} />

      {/* <Tab.Screen name="Wishlist" component={Empty} /> */}
      <Tab.Screen name="Account" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
