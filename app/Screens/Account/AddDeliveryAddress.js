import { baseURL } from "@env";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import PaymentOptionModal from "../../components/Modal/PaymentOptionModal";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS } from "../../constants/theme";
import Header from "../../layout/Header";
import { FinancialConnections } from "@stripe/stripe-react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const AddDeliveryAddress = ({ route, navigation }) => {
  const { token, user } = useSelector((state) => state.user);
  const { cartId } = useSelector((state) => state.cart);
  const { colors } = useTheme();
  // const { total } = route.params;
  let width = Dimensions.get("window").width;
  // const [totalPayable, setTotalPayble] = useState(total);
  const [loading, setLoading] = useState(false);
  const [defaultAddress, setAddress] = useState("Home");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [postcode, setPostCode] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [dataLoader, setDataLoader] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentOptionModal, setShowPaymentOptionModal] = useState(false);
  const [addressId, setAddressId] = useState(null)
  const [saturday, setSaturday] = useState(false)
  const [sunday, setSunday] = useState(true)

  const saveAddress = async () => {
    let body = {
      address: {
        full_name: fullName,
        owner_id: user?.id,
        town: locality,
        city: city,
        country: country,
        postcode: postcode,
        phone_number: mobile,
        address_line_1: fullAddress,
        sunday_delivery: sunday,
        saturday_delivery: saturday
      },
    };

    try {
      setLoading(true);
      let response = await axios.post(`${baseURL}/addresses`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        Alert.alert("Address saved successfully.");
        setRefresh((pre) => !pre);
        resetAddress();
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const linkingUri = 'upfrica://';

  useEffect(() => {
    const handleOpenURL = ({ url }) => {
      console.log("Opened via URL: ", url);

      // Here, you can parse the URL to determine the action
      // For example, navigate to a specific part of your app or display a message
    };

    const extractTokenFromUrl = (url) => {
      const tokenParam = url.match(/token=([^&]+)/);
      return tokenParam ? tokenParam[1] : null;
    };

    const handleDeepLink = (event) => {
      console.log("Incoming URL:", event.url);
      // Parse the URL and extract the token parameter

      const token = extractTokenFromUrl(event.url);
      if (token) {
        console.log("Extracted Token:", token);
        // Here you can set the token in your app's state or do other actions
      }

    };

    // Listen for incoming links
    Linking.addEventListener('url', handleOpenURL);
    Linking.addEventListener('url', handleDeepLink);

    // Check if the app was opened by a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url });
      }
    });

    // Cleanup
    return () => {
      Linking.removeAllListeners('url')
    };

  }, []);

  const browserController = (url) => {
    // Linking.openURL(response?.data?.paystack?.data?.authorization_url);
    // Linking.openURL(url);
    // let url = "https://checkout.stripe.com/c/pay/cs_test_a1El9Ohz6shwO90zMYxGN2sIFgebFNzdD47B4rWIbb9B7OQRnaNRhZszYX#fidkdWxOYHwnPyd1blpxYHZxWjA0SWA9fDxNNlZoQFJENktIdDN1UUN1bUpvQzJ9PW5DVmIxTHBSfE0xYHJ%2FUn1xNT02TE0zQXJAMjN3bkxRdVdWMzE3d2BHUWxmXH9raGFTbnZ3MU90bnNnNTVfUm1XYlRjaicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));

  }

  const PaymentProcess = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    var data = { redirect_uri: linkingUri };
    axios
      .post(
        `https://upfrica-staging.herokuapp.com/api/v1/orders/${id}/create_paystack_transaction`,
        JSON.stringify(data),
        { headers }
      )
      .then((response) => {
        console.log(response?.data);
        browserController(response?.data?.paystack?.data?.authorization_url);
        setIsLoading(false);
        setLoading(FinancialConnections)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const processToPayment = () => {
    if (!addressId) return;
  
    setIsLoading(true);
    setLoading(true)
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // console.log(addresses);
    var data = {
      order: {
        cart_id: cartId,
        buyer_id: user.id,
        address_id: addressId,
      },
    };
    axios
      .post(
        "https://upfrica-staging.herokuapp.com/api/v1/orders",
        JSON.stringify(data),
        { headers }
      )
      .then((response) => {
        // console.log(response?.data);
        if (response?.data) {
          // setIsLoading(false);
          // setShowPaymentOptionModal(true);
          PaymentProcess(response?.data?.order?.id);

        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const getAddresses = () => {
    setDataLoader(true);
    try {
      axios
        .get(`${baseURL}/addresses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response?.status === 200) {
            console.log(response.data?.addresses);
            setAddresses(response?.data?.addresses);
          }
        })
        .catch((error) => console.log(error.response));
    } catch (error) {
      console.log(error);
    } finally {
      setDataLoader(false);
    }
  };

  useEffect(() => {
    getAddresses();
  }, [refresh]);

  const filledDatatoAddress = (item) => {
    console.log(item, "item...");

    setFullName(item.full_name);
    setMobile(item?.address_data?.phone_number);
    setFullAddress(item?.address_data?.address_line_1);
    setCity(item?.address_data?.city);
    setLocality(item?.address_data?.town);
    setCountry(item?.address_data?.country);
    setPostCode(item?.address_data?.postcode);
  };

  const resetAddress = () => {
    setFullName("");
    setMobile("");
    setFullAddress("");
    setCity("");
    setLocality("");
    setCountry("");
    setPostCode("");
    setSaturday(false)
    setSunday(false)
  };

  const renderAddresses = ({ item, index }) => {




    return (<View
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
    ><View style={{ flexDirection: "row" }}>
        <BouncyCheckbox
          size={20}
          fillColor={COLORS.upfricaTitle}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: "red" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={(isChecked) => {
            if (isChecked) setAddressId(item?.id);
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
          {item?.address_data?.town},
        </Text>
        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontTitle,
            color: colors.title,
          }}
        >
          {item?.address_data?.country}
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
          {item?.address_data?.postcode},
        </Text>

        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontTitle,
            color: colors.title,
          }}
        >
          {item?.address_data?.address_line_1}
        </Text>
      </View>
      <Text
        style={{
          ...FONTS.font,
          ...FONTS.fontTitle,
          color: colors.title,
        }}
      >
        Contact: {item?.address_data?.phone_number}
      </Text>
    </View >)
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
        <PaymentOptionModal
          openModal={showPaymentOptionModal}
          setOpenModal={setShowPaymentOptionModal}
        />
        <Header titleLeft leftIcon={"back"} title={"Add delivery address"} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >


          <View style={{ flex: 1 }}>
            <ScrollView style={{ width: "100%", flex: 8 }}>
              <Text style={{ ...FONTS.h4, color: COLORS.upfricaTitle, ...{ padding: 10, paddingLeft: 16 } }}>Your Addresses: </Text>
              {!dataLoader ? (
                <FlatList
                  data={addresses}
                  renderItem={renderAddresses}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{
                    paddingHorizontal: 16,
                    width: "100%",

                  }}
                />

              ) : (
                <ActivityIndicator size={"small"} color={"blue"} />
              )}
            </ScrollView>
            <ScrollView estedScrollEnabled={true} style={{ width: "100%", borderColor: COLORS.upfricaTitle, borderTopWidth: 2, flex: 9 }}>

              <View style={GlobalStyleSheet.container}>
                <Text style={{ ...FONTS.h4, color: COLORS.upfricaTitle, ...{ paddingVertical: 10 } }}>Add new address: </Text>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderColor,
                    paddingBottom: 10,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ ...FONTS.h6, color: colors.title }}>
                    Contact Details
                  </Text>
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text
                    style={[GlobalStyleSheet.label, { color: colors.title }]}
                  >
                    Full Name
                  </Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      {
                        backgroundColor: colors.input,
                        color: colors.title,
                        borderColor: colors.borderColor,
                      },
                    ]}
                    placeholder="Type your name"
                    placeholderTextColor={colors.textLight}
                    value={fullName}
                    onChangeText={(text) => setFullName(text)}
                  />
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text
                    style={[GlobalStyleSheet.label, { color: colors.title }]}
                  >
                    Mobile No.
                  </Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      {
                        backgroundColor: colors.input,
                        color: colors.title,
                        borderColor: colors.borderColor,
                      },
                    ]}
                    placeholder="Type your mobile no."
                    placeholderTextColor={colors.textLight}
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
                    keyboardType="phone-pad"
                  />
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderColor,
                    paddingBottom: 10,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ ...FONTS.h6, color: colors.title }}>
                    Address
                  </Text>
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text
                    style={[GlobalStyleSheet.label, { color: colors.title }]}
                  >
                    Post Code
                  </Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      {
                        backgroundColor: colors.input,
                        color: colors.title,
                        borderColor: colors.borderColor,
                      },
                    ]}
                    placeholder="Post Code"
                    placeholderTextColor={colors.textLight}
                    value={postcode}
                    onChangeText={(text) => setPostCode(text)}
                  />
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text
                    style={[GlobalStyleSheet.label, { color: colors.title }]}
                  >
                    Address
                  </Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      {
                        backgroundColor: colors.input,
                        color: colors.title,
                        borderColor: colors.borderColor,
                      },
                    ]}
                    placeholder="Address"
                    placeholderTextColor={colors.textLight}
                    value={fullAddress}
                    onChangeText={(text) => setFullAddress(text)}
                  />
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text
                    style={[GlobalStyleSheet.label, { color: colors.title }]}
                  >
                    Locality/Town
                  </Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      {
                        backgroundColor: colors.input,
                        color: colors.title,
                        borderColor: colors.borderColor,
                      },
                    ]}
                    placeholder="Locality/Town"
                    placeholderTextColor={colors.textLight}
                    value={locality}
                    onChangeText={(text) => setLocality(text)}
                  />

                </View>
                <View style={[GlobalStyleSheet.row]}>
                  <View style={[GlobalStyleSheet.col50]}>
                    <View style={GlobalStyleSheet.inputGroup}>
                      <Text
                        style={[
                          GlobalStyleSheet.label,
                          { color: colors.title },
                        ]}
                      >
                        City/District
                      </Text>
                      <TextInput
                        style={[
                          GlobalStyleSheet.formControl,
                          {
                            backgroundColor: colors.input,
                            color: colors.title,
                            borderColor: colors.borderColor,
                          },
                        ]}
                        placeholder="City/District"
                        placeholderTextColor={colors.textLight}
                        value={city}
                        onChangeText={(text) => setCity(text)}
                      />
                    </View>
                  </View>

                  <View style={[GlobalStyleSheet.col50]}>
                    <View style={GlobalStyleSheet.inputGroup}>
                      <Text
                        style={[
                          GlobalStyleSheet.label,
                          { color: colors.title },
                        ]}
                      >
                        Country
                      </Text>
                      <TextInput
                        style={[
                          GlobalStyleSheet.formControl,
                          {
                            backgroundColor: colors.input,
                            color: colors.title,
                            borderColor: colors.borderColor,
                          },
                        ]}
                        placeholder="Country"
                        placeholderTextColor={colors.textLight}
                        value={country}
                        onChangeText={(text) => setCountry(text)}
                      />
                    </View>
                  </View>
                </View>
                <View style={GlobalStyleSheet.inputGroup}>
                  <Text
                    style={[GlobalStyleSheet.label, { color: colors.title }]}
                  >
                    Do we need additional instructions to find this address?
                  </Text>
                  <TextInput
                    style={[
                      GlobalStyleSheet.formControl,
                      {
                        backgroundColor: colors.input,
                        color: colors.title,
                        borderColor: colors.borderColor,
                        height:80,
                      },
                    ]}
                    placeholder="Additional info."
                    placeholderTextColor={colors.textLight}
                    value={locality}
                    onChangeText={(text) => setLocality(text)}
                  />

                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderColor,
                    paddingBottom: 10,
                    marginBottom: 20,
                    // marginTop: 20
                  }}
                >
                  <Text style={{ ...FONTS.h6, color: colors.title }}>
                    Weekend delivery: I can receive packages on
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: "row" }}>
                    <BouncyCheckbox
                      size={20}
                      fillColor={COLORS.upfricaTitle}
                      unfillColor="#FFFFFF"
                      iconStyle={{ borderColor: "red" }}
                      innerIconStyle={{ borderWidth: 2 }}
                      textStyle={{ fontFamily: "JosefinSans-Regular" }}
                      onPress={(isChecked) => {
                        if (isChecked) setSaturday(true);
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
                      Saturdays
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <BouncyCheckbox
                      size={20}
                      fillColor={COLORS.upfricaTitle}
                      unfillColor="#FFFFFF"
                      iconStyle={{ borderColor: "red" }}
                      innerIconStyle={{ borderWidth: 2 }}
                      textStyle={{ fontFamily: "JosefinSans-Regular" }}
                      onPress={(isChecked) => {
                        if (isChecked) setSunday(true);
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
                      Sundays
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderColor,
                    paddingBottom: 20,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ ...FONTS.h6, color: colors.title, ...{ paddingTop: 20 } }}>
                    Save Address for Future Use
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setAddress("Home")}
                    style={[
                      {
                        borderWidth: 1,
                        borderColor: COLORS.upfricaTitle,
                        borderRadius: 30,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        marginRight: 10,
                      },
                      defaultAddress === "Home" && {
                        borderColor: COLORS.upfricaTitle,
                      },
                    ]}
                  >
                    <TouchableOpacity onPress={saveAddress} disabled={loading}>
                      {!loading ? (
                        <Text
                          style={[
                            {
                              ...FONTS.font,
                              color: COLORS.upfricaTitle,
                              paddingBottom: 2,
                            },
                            defaultAddress === "Home" && {
                              color: COLORS.upfricaTitle,
                            },
                          ]}
                        >
                          Save Address
                        </Text>
                      ) : (
                        <ActivityIndicator size="small" color="#0000ff" />
                      )}
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              </View>

            </ScrollView>
          </View>
          <View
            style={{
            //  paddingTop:10,
              paddingHorizontal: 16,
              flexDirection: "row",
              gap: 8,
              marginBottom: 8,
              backgroundColor: 'white',
              borderTopColor: COLORS.upfricaTitle,
            }}
          >
            <Pressable style={{ width: "51%" }}>
              {isLoading && <View style={{
                height: 50,
                borderRadius: 5,
                backgroundColor: COLORS.upfricaTitle,
                alignItems: 'center',
                paddingHorizontal: 20,
                justifyContent: 'center',
                shadowColor: COLORS.upfricaTitle,
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 8,
              }}><ActivityIndicator size={'large'} color={'white'} /></View>}
              {!isLoading && <CustomButton
                // onPress={() => browserController()}
                onPress={processToPayment}
                color={COLORS.upfricaTitle}
                title={"Pay with PayStack"}

              />}

            </Pressable>
            <CustomButton
              style={{ width: "48%" }}
              // onPress={
              //   () => processToPayment()
              //   navigation.navigate("Payment", { total: totalPayable })
              // }
              color={COLORS.upfricaTitle}
              // title={"Save Address"}
              title={"Pay with Stripe"}
            // isLoading={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default AddDeliveryAddress;
