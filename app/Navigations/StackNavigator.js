import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home/Home";
import Splash from "../Screens/Onboarding/Splash";
import Onboarding from "../Screens/Onboarding/Onboarding";
import SignUp from "../Screens/Auth/SignUp";
import SignIn from "../Screens/Auth/SignIn";
import Products from "../Screens/Products/Products";
import DrawerNavigation from "./DrawerNavigation";
import ProductDetail from "../Screens/Products/ProductDetail";
import Featured from "../Screens/Featured/Featured";
import Orders from "../Screens/Orders/Orders";
import DeliveryTracking from "../Screens/Delivery/DeliveryTracking";
import Profile from "../Screens/Account/Profile";
import EditProfile from "../Screens/Account/EditProfile";
import Coupons from "../Screens/Account/Coupons";
import Address from "../Screens/Account/Address";
import AddDeliveryAddress from "../Screens/Account/AddDeliveryAddress";
import Filter from "../Screens/Filter/Filter";
import Items from "../Screens/Items/Items";
import Search from "../Screens/Search/Search";
import Payment from "../Screens/Delivery/Payment";
import Components from "../Screens/Components/Components";
import AccordionScreen from "../Screens/Components/Accordion";
import ActionSheet from "../Screens/Components/ActionSheet";
import Buttons from "../Screens/Components/Buttons";
import Inputs from "../Screens/Components/Inputs";
import ActionModals from "../Screens/Components/ActionModals";
import Charts from "../Screens/Components/Charts";
import Badges from "../Screens/Components/Badges";
import DividerElements from "../Screens/Components/DividerElements";
import Headers from "../Screens/Components/Headers";
import Footers from "../Screens/Components/Footers";
import TabStyle1 from "../components/Footers/FooterStyle1";
import TabStyle2 from "../components/Footers/FooterStyle2";
import TabStyle3 from "../components/Footers/FooterStyle3";
import TabStyle4 from "../components/Footers/FooterStyle4";
import ListScreen from "../Screens/Components/Lists";
import Pricings from "../Screens/Components/Pricings";
import Snackbars from "../Screens/Components/Snakbars";
import Socials from "../Screens/Components/Socials";
import SwipeableScreen from "../Screens/Components/Swipeable";
import Tabs from "../Screens/Components/Tabs";
import Tables from "../Screens/Components/Tables";
import Toggles from "../Screens/Components/Toggles";
import Cart from "../Screens/Cart/Cart";
import { StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import Empty from "../Screens/Empty/Empty";
import DirectBuy from "../Screens/Cart/DirectBuy";
import RefundOrder from "../Screens/Orders/RefundOrder";
import OrdersList from "../Screens/Orders/OrdersList";
import CancelOrders from "../Screens/Orders/CancelOrders";
import Seller from "../Screens/SellerScreen/Seller";
const StackComponent = createNativeStackNavigator();

const StackNavigator = () => {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.card}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />
      <StackComponent.Navigator
        initialRouteName={"SignIn"}
        // initialRouteName={"Home"}
        detachInactiveScreens={true}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
        }}
      >
        <StackComponent.Screen name={"Home"} component={Home} />
        <StackComponent.Screen name={"Splash"} component={Splash} />
        <StackComponent.Screen name={"Onboarding"} component={Onboarding} />
        <StackComponent.Screen name={"SignUp"} component={SignUp} />
        <StackComponent.Screen name={"SignIn"} component={SignIn} />
        <StackComponent.Screen
          name={"DrawerNavigation"}
          component={DrawerNavigation}
        />
        <StackComponent.Screen name={"Products"} component={Products} />
        <StackComponent.Screen
          name={"ProductDetail"}
          component={ProductDetail}
        />
        <StackComponent.Screen name={"Featured"} component={Featured} />
        <StackComponent.Screen name={"Orders"} component={Orders} />
        <StackComponent.Screen name={"Cart"} component={Cart} />
        {/* <StackComponent.Screen name={"Cart"} component={Empty} /> */}
        <StackComponent.Screen
          name={"DeliveryTracking"}
          component={DeliveryTracking}
        />
        <StackComponent.Screen name={"Profile"} component={Profile} />
        <StackComponent.Screen name={"EditProfile"} component={EditProfile} />
        <StackComponent.Screen name={"Coupons"} component={Coupons} />
        <StackComponent.Screen name={"Address"} component={Address} />
        <StackComponent.Screen name={"Payment"} component={Payment} />
        <StackComponent.Screen
          name={"AddDeliveryAddress"}
          component={AddDeliveryAddress}
        />
        <StackComponent.Screen name={"Filter"} component={Filter} />
        <StackComponent.Screen name={"Items"} component={Items} />
        <StackComponent.Screen name={"Search"} component={Search} />
        <StackComponent.Screen name={"Components"} component={Components} />
        <StackComponent.Screen name={"Accordion"} component={AccordionScreen} />
        <StackComponent.Screen name={"ActionSheet"} component={ActionSheet} />
        <StackComponent.Screen name={"ActionModals"} component={ActionModals} />
        <StackComponent.Screen name={"Buttons"} component={Buttons} />
        <StackComponent.Screen name={"Charts"} component={Charts} />
        <StackComponent.Screen name={"Badges"} component={Badges} />
        <StackComponent.Screen
          name={"DividerElements"}
          component={DividerElements}
        />
        <StackComponent.Screen name={"Inputs"} component={Inputs} />
        <StackComponent.Screen name={"Headers"} component={Headers} />
        <StackComponent.Screen name={"Footers"} component={Footers} />
        <StackComponent.Screen name={"TabStyle1"} component={TabStyle1} />
        <StackComponent.Screen name={"TabStyle2"} component={TabStyle2} />
        <StackComponent.Screen name={"TabStyle3"} component={TabStyle3} />
        <StackComponent.Screen name={"TabStyle4"} component={TabStyle4} />
        <StackComponent.Screen name={"lists"} component={ListScreen} />
        <StackComponent.Screen name={"Pricings"} component={Pricings} />
        <StackComponent.Screen name={"Snackbars"} component={Snackbars} />
        <StackComponent.Screen name={"Socials"} component={Socials} />
        <StackComponent.Screen name={"Swipeable"} component={SwipeableScreen} />
        <StackComponent.Screen name={"Tabs"} component={Tabs} />
        <StackComponent.Screen name={"Tables"} component={Tables} />
        <StackComponent.Screen name={"Toggles"} component={Toggles} />
        <StackComponent.Screen name={"DirectBuy"} component={DirectBuy} />
        <StackComponent.Screen name={"Refund"} component={RefundOrder} />
        <StackComponent.Screen name={"OrderList"} component={OrdersList} />
        <StackComponent.Screen name={"CancelOrders"} component={CancelOrders} />
        <StackComponent.Screen name={"Seller"} component={Seller} />
      </StackComponent.Navigator>
    </>
  );
};
export default StackNavigator;
