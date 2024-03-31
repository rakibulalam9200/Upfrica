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
  Platform,
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

  const PaymentProcess = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // var data = {
    //     order: {
    //         currency: "USD"
    //     }};
    var data = { redirect_uri: "https://google.com" };

    axios
      .post(
        `https://upfrica-staging.herokuapp.com/api/v1/orders/${id}/create_paystack_transaction`,
        JSON.stringify(data),
        { headers }
      )
      .then((response) => {
        console.log(response?.data);
        // navigation.navigate("Payment", { total: total });
        // Linking.openURL(response?.data?.paystack?.data?.authorization_url );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const processToPayment = () => {
    if (
      fullName === "" ||
      locality === "" ||
      postcode === "" ||
      country === "" ||
      mobile === "" ||
      fullAddress === ""
    ) {
      Alert.alert(
        "Name, Mobile No, Post Code, Locality, Address, Country Should not be blank!"
      );
      return;
    }
    setIsLoading(true);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // console.log(addresses);
    var data = {
      order: {
        cart_id: cartId,
        buyer_id: user.id,
        address_id: addresses[0]?.id,
      },
    };
    console.log(data, "data........");
    axios
      .post(
        "https://upfrica-staging.herokuapp.com/api/v1/orders",
        JSON.stringify(data),
        { headers }
      )
      .then((response) => {
        console.log(response?.data);
        if (response?.data) {
          setIsLoading(false);
          setShowPaymentOptionModal(true);
          // PaymentProcess(response?.data?.order?.id);
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
            console.log(response.data);
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
  };

  const renderAddresses = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 8,
          marginVertical: 8,
          flex: 1,
          backgroundColor: "lightblue",
          borderRadius: 8,
          width: width - 32,
          // alignSelf: "stretch"
        }}
        onPress={() => filledDatatoAddress(item)}
      >
        <View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
          <Text style={{ fontWeight: "700", color: "black" }}>Name: </Text>
          <Text style={{ flex: 1 }}>{item?.full_name}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
          <Text style={{ fontWeight: "700", color: "black" }}>Address: </Text>
          <Text style={{ flex: 1 }}>{item?.address_data?.address_line_1}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
          <Text style={{ fontWeight: "700", color: "black" }}>Post Code: </Text>
          <Text style={{ flex: 1 }}>{item?.address_data?.postcode}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
          <Text style={{ fontWeight: "700", color: "black" }}>Mobile No: </Text>
          <Text style={{ flex: 1 }}>{item?.address_data?.phone_number}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
          <Text style={{ fontWeight: "700", color: "black" }}>
            Locality/Town:{" "}
          </Text>
          <Text style={{ flex: 1 }}>{item?.address_data?.town}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
          <Text style={{ fontWeight: "700", color: "black" }}>Country: </Text>
          <Text style={{ flex: 1 }}>{item?.address_data?.country}</Text>
        </View>
      </TouchableOpacity>
    );
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
            <ScrollView estedScrollEnabled={true} style={{ width: "100%" }}>
              <View style={GlobalStyleSheet.container}>
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
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderColor,
                    paddingBottom: 10,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ ...FONTS.h6, color: colors.title }}>
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
              <ScrollView horizontal={true} style={{ width: "100%" }}>
                {!dataLoader ? (
                  <FlatList
                    data={addresses}
                    renderItem={renderAddresses}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                      paddingHorizontal: 16,
                      width: "100%",
                      flex: 1,
                    }}
                  />
                ) : (
                  <ActivityIndicator size={"small"} color={"blue"} />
                )}
              </ScrollView>
            </ScrollView>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: "row",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <CustomButton
              // onPress={
              //   () => processToPayment()
              //   navigation.navigate("Payment", { total: totalPayable })
              // }
              color={COLORS.label}
              // title={"Save Address"}
              title={"Pay with PayStack"}
              style={{ width: "51%" }}
              // isLoading={isLoading}
            />
            <CustomButton
              style={{ width: "48%" }}
              // onPress={
              //   () => processToPayment()
              //   navigation.navigate("Payment", { total: totalPayable })
              // }
              color={COLORS.upfricaTitle}
              // title={"Save Address"}
              title={"Pay with Card"}
              // isLoading={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default AddDeliveryAddress;
