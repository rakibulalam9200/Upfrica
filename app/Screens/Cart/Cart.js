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
import CheckoutItem from "../../components/CheckoutItem";
import CustomButton from "../../components/CustomButton";
import Divider from "../../components/Dividers/Divider";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS } from "../../constants/theme";
import Header from "../../layout/Header";

// const CheckoutData = [
//     {
//         image : pic1,
//         title : "Peter England Causual",
//         type  : "Printed Longline Pure Cotteon T-shirt",
//         quantity : 1,
//         price : "$158.2",
//         oldPrice : "$170",
//     },

// ]

const Cart = ({ route, navigation }) => {
  const { cart } = useSelector((state) => state.cart);
  const { currency } = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const [CheckoutData, setCheckoutData] = useState([]);
  const [cartData, setCartData] = useState(cart);
  let data = null;

  try {
    if (route.params) {
      data = route.params.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }

  //   if () {
  //     return (
  //       <View>
  //         <Text style={{ marginTop: "50%", textAlign: "center" }}>
  //           Your cart is empty!!!
  //         </Text>
  //       </View>
  //     );
  //   }

  //   useEffect(() => {
  //     let tempData = [
  //       {
  //         id: data.id,
  //         image: data?.product_images[0],
  //         title: data?.title,
  //         quantity: 1,
  //         price: data?.sale_price?.cents / 100,
  //         type: data?.description?.body,
  //         postage: data?.postage_fee?.cents / 100,
  //         secondary_postage: data?.secondary_postage_fee?.cents / 100,
  //       },
  //     ];
  //     setCheckoutData(cart);
  //   }, []);

  // useEffect(()=>{

  // })

  // console.log("cart...",cart,'cart...')

  useEffect(() => {
    console.log("cart...", cart, "cart...");
    setCartData(cart);
  }, [cart]);

  // console.log(CheckoutData,'llllllllllllll')

  const { colors } = useTheme();

  const [quantity, setquantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [postageFee, setPostageFee] = useState(0);
  const [sndPostageFee, setSndPostageFee] = useState(0);

  // const handleChildValueChange = (value) => {
  // setTotalPrice(parseInt(value)*parseFloat(CheckoutData[0]?.price)?parseInt(value)*parseFloat(CheckoutData[0]?.price):data?.sale_price?.cents/100);
  // };

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
          backAction={() => navigation.navigate("Home")}
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
                      <CheckoutItem
                        // onPress={() => navigation.navigate('ProductDetail')}
                        // onValueChange={handleChildValueChange}
                        data={data}

                        // removeItem={removeItemData(data?.id)}
                      />
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
                    {currency.value}{totalPrice}
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
                    {currency.value}{postageFee}
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
                    {currency.value}{sndPostageFee}
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
                    {currency.value}{(totalPrice + postageFee + sndPostageFee).toFixed(2)}
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
              {currency.value}{(totalPrice + postageFee + sndPostageFee).toFixed(2)}
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
                if (cart?.length > 0) {
                  navigation.navigate("AddDeliveryAddress", {
                    total: (totalPrice + postageFee + sndPostageFee).toFixed(2),
                  });
                }else{
                    Alert.alert("Empty Card is not able to checkout!")
                }
              }}
              title="Checkout"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
