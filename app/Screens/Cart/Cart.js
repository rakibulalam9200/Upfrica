import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { setCartId, setGTotalPrice, setNavFrom } from "../../../Store/cart";
import CheckoutItem from "../../components/CheckoutItem";
import CustomButton from "../../components/CustomButton";
import Divider from "../../components/Dividers/Divider";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS } from "../../constants/theme";
import Header from "../../layout/Header";
// import { cartItemList } from "../../../Store/cart";

const Cart = ({ route, navigation }) => {
  const { token, user } = useSelector((state) => state.user);
  const { cart, cartId } = useSelector((state) => state.cart);
  const { currency } = useSelector((state) => state.currency);
  const dispatch = useDispatch();
  const [CheckoutData, setCheckoutData] = useState([]);
  const [cartData, setCartData] = useState(cart);
  const [isLoading, setIsLoading] = useState(false);

  let data = null;

  try {
    if (route.params) {
      data = route.params.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }

  useEffect(() => {
    setCartData(cart);
  }, [cart]);

  const { colors } = useTheme();
  const [quantity, setquantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [postageFee, setPostageFee] = useState(0);
  const [sndPostageFee, setSndPostageFee] = useState(0);

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

  const cartItems = async () => {
    if (!token) {
      dispatch(setNavFrom("cart"));
      navigation.navigate("SignIn");
      return;
    }
    setIsLoading(true);

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

    var data = {
      cart_items: {
        user_id: user?.id,
        items: itemList,
      },
    };
    console.log(data);
    var requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    // dispatch(setCartId("100"))

    fetch(
      "https://upfrica-staging.herokuapp.com/api/v1/cart_items/bulk_create",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result?.cart?.id);
        dispatch(setGTotalPrice(totalPrice));
        dispatch(setCartId(result?.cart?.id));
        setIsLoading(false);

        if (cart?.length > 0) {
          navigation.navigate("AddDeliveryAddress", {
            total: (totalPrice + postageFee + sndPostageFee).toFixed(2),
          });
        } else {
          Alert.alert("Empty Card is not able to checkout!");
        }
      })
      .catch((error) => console.log("error", error));
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
        }}
      >
        <Header
          backAction={() => navigation.goBack()}
          title={"Cart"}
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
                <Text
                  style={{
                    ...FONTS.fontSm,
                    ...FONTS.fontTitle,
                    color: colors.text,
                    marginBottom: 6,
                  }}
                >
                  Have a coupon code ? enter here
                </Text>

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
                </View>

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
                cartItems();
              }}
              title="Checkout"
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
