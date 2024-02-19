// https://blog.logrocket.com/improving-mobile-ux-react-native-inappbrowser-reborn/
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { getDeepLink } from "../../../utilities";
// import InAppBrowser from 'react-native-inappbrowser-reborn';
import { useDispatch, useSelector } from "react-redux";
import CheckoutItem from "../../components/CheckoutItem";
import CustomButton from "../../components/CustomButton";
import Divider from "../../components/Dividers/Divider";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS } from "../../constants/theme";
import Header from "../../layout/Header";
// import { cartItemList } from "../../../Store/cart";

const DirectBuy = ({ route, navigation }) => {
  const { token, user } = useSelector((state) => state.user);
  const { cart, cartId } = useSelector((state) => state.cart);

  const { currency } = useSelector((state) => state.currency);
  const dispatch = useDispatch();
  const [CheckoutData, setCheckoutData] = useState([]);
  const [cartData, setCartData] = useState(cart);
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);

  let data = null;

  try {
    if (route.params) {
      data = route.params.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://upfrica-staging.herokuapp.com/api/v1/addresses?page=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result && setAddressId(result))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    console.log("cart...", cart, "cart...");
    setCartData(cart);
  }, [cart]);

  const { colors } = useTheme();
  const [quantity, setquantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [postageFee, setPostageFee] = useState(0);
  const [sndPostageFee, setSndPostageFee] = useState(0);
  const [addressId, setAddressId] = useState(null);

  const handleTotalPrice = (cart) => {
    if (cart?.length > 0) {
      let total = 0;
      cart?.map((item) => {
        total = total + parseInt(item.quantity) * parseFloat(item.price);
      });
      return total;
    }
  };

  const handlePostageFee = (cart) => {
    if (cart?.length > 0) {
      let total = 0;
      cart?.map((item) => {
        total = total + parseInt(item.postage) * parseInt(item.quantity);
      });
      return total;
    }
  };

  const handleSndPostageFee = (cart) => {
    if (cart?.length > 0) {
      let total = 0;
      cart?.map((item) => {
        total =
          total + parseInt(item.secondary_postage) * parseInt(item.quantity);
      });
      return total;
    }
  };

  useEffect(() => {
    if (cart?.length > 0) {
      setTotalPrice(handleTotalPrice(cart));
      setPostageFee(handlePostageFee(cart));
      setSndPostageFee(handleSndPostageFee(cart));
    } else {
      setTotalPrice(0);
      setPostageFee(0);
      setSndPostageFee(0);
    }
  }, [cart]);

  const onLogin = async (URL) => {
    const deepLink = getDeepLink("callback");
    const url = `${URL}?redirect_uri=${deepLink}`;
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, deepLink, {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then((response) => {
          navigation.navigate("Refund");
          if (response.type === "success" && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  };

  const placeOrder = async () => {
    setIsLoading(true);
    // setIsLoading(false);

    if (!cart.length) return;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let itemList = [];
    for (let item of cart) {
      console.log({ product_id: item?.id, quantity: item?.quantity });
      let obj = { product_id: item?.id, quantity: item?.quantity };
      itemList.push(obj);
    }

    if (!addressId) {
      Alert.alert("Address must be selected");
    }
    const deepLink = getDeepLink("callback");
    var data = {
      checkout: {
        address_id: addressId,
        products: [
          {
            id: itemList[0].product_id,
            quantity: itemList[0]?.quantity,
          },
        ],
        redirect_uri: deepLink,
        payment_method: "paystack",
      },
    };

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    // _addLinkingListener();

    fetch(
      "https://upfrica-staging.herokuapp.com/api/v1/orders/checkout",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        // Linking.openURL(result?.paystack?.data?.authorization_url);
        // handleOpenInAppBrowser(result?.paystack?.data?.authorization_url);
        onLogin(result?.paystack?.data?.authorization_url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };
  // const  _addLinkingListener = () => {
  //   Linking.addEventListener("url", _handleRedirect);
  // };
  const _handleRedirect = (event) => {
    let data = Linking.parse(event.url);
    console.log(data);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.card,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          borderRadius: 8,
        }}
      >
        <Header
          backAction={() => navigation.navigate("Home")}
          title={"Buy Now"}
          leftIcon={"back"}
          rightIcon={"more"}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : ""}
        >
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <View
                style={[
                  GlobalStyleSheet.container,
                  { paddingTop: 12, flex: 1 },
                ]}
              >
                {cartData?.length > 0 &&
                  cartData?.map((data, index) => (
                    <View
                      key={index}
                      style={{
                        marginBottom: 8,
                      }}
                    >
                      <CheckoutItem data={data} />
                    </View>
                  ))}
                {/* <Text
                  style={{
                    ...FONTS.fontSm,
                    ...FONTS.fontTitle,
                    color: colors.text,
                    marginBottom: 6,
                  }}
                >
                  Have a coupon code ? enter here
                </Text> */}
                {/* 
                <View>
                  <FeatherIcon
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      left: 18,
                      top: 16,
                    }}
                    size={18}
                    color={COLORS.upfricaTitle}
                    name="scissors"
                  />
                  <TextInput
                    style={{
                      ...FONTS.font,
                      ...FONTS.fontBold,
                      color: colors.title,
                      borderWidth: 1,
                      height: 48,
                      backgroundColor: colors.card,
                      borderColor: colors.borderColor,
                      paddingHorizontal: 18,
                      paddingLeft: 50,
                      borderStyle: "dashed",
                    }}
                    defaultValue=""
                  />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 0,
                      padding: 13,
                    }}
                  >
                    <FeatherIcon
                      size={22}
                      color={colors.title}
                      name="chevron-right"
                    />
                  </TouchableOpacity>
                </View> */}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    marginTop: 12,
                  }}
                >
                  <Text style={{ ...FONTS.font, color: colors.text }}>
                    Price :{" "}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.font,
                      ...FONTS.fontTitle,
                      color: COLORS.upfricaTitle,
                    }}
                  >
                    {currency.value}
                    {totalPrice}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ ...FONTS.font, color: colors.text }}>
                    Postage :{" "}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.font,
                      ...FONTS.fontTitle,
                      color: COLORS.upfricaTitle,
                    }}
                  >
                    {currency.value}
                    {postageFee}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ ...FONTS.font, color: colors.text }}>
                    Secondary Postage :
                  </Text>
                  <Text
                    style={{
                      ...FONTS.font,
                      ...FONTS.fontTitle,
                      color: COLORS.upfricaTitle,
                    }}
                  >
                    {currency.value}
                    {sndPostageFee}
                  </Text>
                </View>
                <Divider
                  dashed
                  color={colors.borderColor}
                  style={{ marginBottom: 0, marginTop: 0 }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    marginTop: 5,
                    alignItems: "center",
                    paddingTop: 8,
                  }}
                >
                  <Text style={{ ...FONTS.font, color: colors.text }}>
                    Total :{" "}
                  </Text>
                  <Text style={{ ...FONTS.h4, color: COLORS.upfricaTitle }}>
                    {currency.value}
                    {(totalPrice + postageFee + sndPostageFee).toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                {addresses ?
                  addresses?.map((address, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          paddingHorizontal: 12,
                          paddingBottom: 12,
                          paddingTop: 12,
                          borderRadius: 5,
                          backgroundColor: colors.card,
                          ...GlobalStyleSheet.shadow,
                          marginBottom: 15,
                        }}
                        activeOpacity={0.9}
                      >
                        {/* <Text>{address?.id}</Text> */}
                        <View style={{ flexDirection: "row" }}>
                          <BouncyCheckbox
                            size={20}
                            fillColor={COLORS.upfricaTitle}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: "red" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked) => {
                              if (isChecked) setAddressId(address?.id);
                            }}
                          />
                          <Text
                            style={{
                              ...FONTS.font,
                              ...FONTS.fontTitle,
                              color: colors.title,
                              fontSize: 16,
                              paddingBottom: 3,
                            }}
                          >
                            Address {index + 1} :
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              ...FONTS.font,
                              ...FONTS.fontTitle,
                              color: colors.title,
                              marginRight: 10,
                            }}
                          >
                            {address?.address_data?.town},
                          </Text>
                          <Text
                            style={{
                              ...FONTS.font,
                              ...FONTS.fontTitle,
                              color: colors.title,
                            }}
                          >
                            {address?.address_data?.country}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              ...FONTS.font,
                              ...FONTS.fontTitle,
                              color: colors.title,
                              marginRight: 3,
                            }}
                          >
                            {address?.address_data?.postcode},
                          </Text>

                          <Text
                            style={{
                              ...FONTS.font,
                              ...FONTS.fontTitle,
                              color: colors.title,
                            }}
                          >
                            {address?.address_data?.address_line_1}
                          </Text>
                        </View>
                        <Text
                          style={{
                            ...FONTS.font,
                            ...FONTS.fontTitle,
                            color: colors.title,
                          }}
                        >
                          Contact: {address?.address_data?.phone_number}
                        </Text>
                      </View>
                    );
                  }) :<></>}
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: colors.card,
            borderTopWidth: 1,
            borderColor: colors.borderColor,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.h4, color: COLORS.upfricaTitle }}>
              {currency.value}
              {(totalPrice + postageFee + sndPostageFee).toFixed(2)}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.secondary,
                  ...FONTS.fontTitle,
                }}
              >
                View price details
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton
              btnSm
              color={COLORS.upfricaTitle}
              onPress={() => {
                placeOrder();

                // console.log("hello");
              }}
              title="Place Order"
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DirectBuy;
