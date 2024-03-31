// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useTheme } from "@react-navigation/native";
import { CardField, createToken } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
// import RNPaystack from "react-native-paystack";
// import { Paystack } from "react-native-paystack-webview";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../../Store/cart";
import card from "../../assets/images/icons/card.png";
import pay from "../../assets/images/icons/pay.png";
import phonepe from "../../assets/images/icons/phonepe.png";
import CustomButton from "../../components/CustomButton";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS } from "../../constants/theme";
import Header from "../../layout/Header";


// DateTimePickerAndroid.open(params: AndroidNativeProps)
// DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['mode'])

const Payment = ({ route, navigation }) => {
  // RNPaystack.init({
  //   publicKey: PAYSTACK_PUBLIC_KEY,
  // });

  const dispatch = useDispatch()
  // let selector = useSelector();
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user.user)
  const {totalPrice} = useSelector((state) => state.cart)
  

  // Alert.alert(PAYSTACK_PUBLIC_KEY)
  const { total } = route.params;
  console.log(total);

  const theme = useTheme();
  const { colors } = theme;
  const [isLoading, setIsLoading] = useState(false);

  const [paymentOption, setPaymentOption] = useState("");
  const [cardInfo, setCardInfo] = useState(null);

  const [payActive, setPayActive] = useState("");
  const [date, setDate] = useState("--/----");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [CVC, setCVC] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    let getDateYear = new Date(date).getFullYear().toString();
    let getDateMonth =
      new Date(date).getMonth().toString()?.length === 1
        ? `0${(new Date(date).getMonth() + 1).toString()}`
        : (new Date(date).getMonth() + 1).toString();
    console.log("yes yesy", getDateMonth + "/" + getDateYear);
    setDate(getDateMonth + "/" + getDateYear);

    hideDatePicker();
  };

  const PhonePeOption = [
    {
      image: phonepe,
      title: "Local",
    },
  ];
  const fetchCardDetails = (cardDetails) => {
    // console.log(cardDetails,'carddetails')
    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };



  const paymentWithPaystack = ()=>{
    
    // console.log(token);
    // console.log(user);

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    
    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };
    
    // fetch("https://upfrica-staging.herokuapp.com/api/v1/addresses", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
 




  // var raw = {
  //     order: {
  //         cart_id: 1,
  //         buyer_id: 61,
  //         address_id: 16
  //     }
  // };

 

  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body:JSON.stringify(raw),
  //   redirect: 'follow'
  // };
  
  // fetch("https://upfrica-staging.herokuapp.com/api/v1/orders", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  //  }


    var raw = "";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://upfrica-staging.herokuapp.com/api/v1/orders/3/create_paystack_transaction", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  const paymentComplete = async () => {
    // console.log(paymentOption,'payment option')
    if (paymentOption === "Credit") {
      if (cardInfo) {
        setIsLoading(true);
        // console.dir(cardInfo, { depth: null })
        // console.log(cardInfo, "-------------");
        try {
          const resToken = await createToken({ ...cardInfo, type: "Card" });
          // console.log(resToken, "response token...");
          if (resToken) {
            dispatch(resetCart());
            setIsLoading(false);
          }
        } catch (error) {
          Alert.alert(error.response);
          setIsLoading(false);
        }
        navigation.navigate("DeliveryTracking");
      } else if (!cardInfo) {
        Alert.alert("Invalid Payment");
        setIsLoading(false);
      }
    } else {
      // chargeCard();
    }
  };

  // const chargeCardAccess = () => {
  //   console.log("charge card");
  //   RNPaystack.chargeCardWithAccessCode({
  //     cardNumber: "50606 66666 66666 6666",
  //     expiryMonth: "12",
  //     expiryYear: "24",
  //     cvc: "123",
  //     accessCode: "2p3j42th639duy4",
  //   })
  //     .then((response) => {
  //       console.log("hit access here ");
  //       console.log(response); // do stuff with the token
  //     })
  //     .catch((error) => {
  //       console.log("error access here ");
  //       console.log(error.message);
  //     });
  // };

  // const chargeCard = () => {
  //   console.log(
  //     "charge card",
  //     cardNumber,
  //     date.split("/")[0],
  //     date.split("/")[1],
  //     CVC,
  //     total
  //   );
  //   setIsLoading(true);
  //   RNPaystack.chargeCard({
  //     cardNumber: cardNumber,
  //     expiryMonth: date.split("/")[0],
  //     expiryYear: date.split("/")[1],
  //     cvc: CVC,
  //     amountInKobo: +total,
  //     email: "rakibul9200@gmail.com",
  //     currency: "GHS",
  //     // cardNumber: "4084084084084081",
  //     // expiryMonth: "09",
  //     // expiryYear: "24",
  //     // cvc: "408",
  //     // email: "rakibul9200@gmail.com",
  //     //  amountInKobo: 150000,
  //     // currency: 'GHS'
  //   })
  //     .then((response) => {
  //       navigation.navigate("DeliveryTracking");
  //       dispatch(resetCart());
  //       setIsLoading(false);
  //       // console.log("hit here......");
  //       console.log(response); // do stuff with the token
  //     })
  //     .catch((error) => {
  //       Alert.alert(error.message);
  //       setIsLoading(false);
  //       // console.log("hit error here......");
  //       console.log(error.message);
  //     });
  // };

  // function Pay() {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <Paystack
  //         paystackKey={publicKey}
  //         amount={"25000.00"}
  //         billingEmail="rakibul9200@gmail.com"
  //         activityIndicatorColor="green"
  //         onCancel={(e) => {
  //           // handle response here
  //         }}
  //         onSuccess={(res) => {
  //           // handle response here
  //         }}
  //         autoStart={true}
  //       />
  //     </View>
  //   );
  // }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
          }}
        >
          <Header titleLeft leftIcon={"back"} title={"Payment"} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        

            <View
              style={{
                backgroundColor: colors.card,
                ...GlobalStyleSheet.shadow,
                marginHorizontal: 15,
                marginBottom: 8,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  setPaymentOption(paymentOption === "Credit" ? "" : "Credit")
                }
                style={[styles.list]}
              >
                <Image
                  style={[styles.listImg, { tintColor: colors.textLight }]}
                  source={card}
                />
                <Text style={[styles.listTitle, { color: colors.title }]}>
                  Credit / Debit Card
                </Text>
                <FeatherIcon
                  color={colors.textLight}
                  name={"chevron-down"}
                  size={22}
                />
              </TouchableOpacity>
              <Collapsible
                collapsed={paymentOption === "Credit" ? false : true}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingBottom: 30,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.font,
                      color: colors.text,
                      marginBottom: 10,
                    }}
                  >
                    Please ensure your card can be used for online transactions.
                  </Text>
                  <View>
                    <CardField
                      postalCodeEnabled={false}
                      placeholders={{
                        number: "Card Number",
                      }}
                      cardStyle={[
                        {
                          backgroundColor: "#FFFFFF",
                          textColor: "#000000",
                        },
                      ]}
                      style={{
                        width: "100%",
                        height: 30,
                        marginVertical: 10,
                        borderWidth: 1,
                        borderColor: "#888888",
                        // flex:1
                      }}
                      onCardChange={(cardDetails) => {
                        fetchCardDetails(cardDetails);
                      }}
                      onFocus={(focusedField) => {
                        console.log("focusField", focusedField);
                      }}
                    />
                  </View>
                 
                </View>
              </Collapsible>
            </View>

            <View
              style={{
                backgroundColor: colors.card,
                ...GlobalStyleSheet.shadow,
                marginHorizontal: 15,
                marginBottom: 8,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  setPaymentOption(
                    paymentOption === "Paystack" ? "" : "Paystack"
                  )
                }
                style={[styles.list]}
              >
                <Image
                  style={[styles.listImg, { tintColor: colors.textLight }]}
                  source={pay}
                />
                <Text style={[styles.listTitle, { color: colors.title }]}>
                  Local Payment
                </Text>
                <FeatherIcon
                  color={colors.textLight}
                  name={"chevron-down"}
                  size={22}
                />
              </TouchableOpacity>
              <Collapsible
                collapsed={paymentOption === "Paystack" ? false : true}
              >
                <View style={{ paddingBottom: 20 }}>
                  {/* <Paystack
                    paystackKey={PAYSTACK_PUBLIC_KEY}
                    billingEmail="rakibul9200@gmail.com"
                    amount={"25000.00"}
                    onCancel={(e) => {
                     
                    }}
                    onSuccess={(res) => {
                      
                    }}
                    ref={paystackWebViewRef}
                  /> */}
                  {/* <TouchableOpacity
                    onPress={() =>
                      paystackWebViewRef.current.startTransaction()
                    }
                  >
                    <Text>Pay Now</Text>
                  </TouchableOpacity> */}
                  {/* <TextInput
                    style={{ marginHorizontal: 16, marginBottom: 8 }}
                    inputMode="numeric"
                    onChangeText={
                      (text) => setCardNumber(text)
                      // console.log(text.replace(/[^0-9]/, ""))
                    }
                    mode="outlined"
                    label="Card Number"
                    placeholder="Card Number"
                    left={<TextInput.Icon icon="card" />}
                  /> */}
                  {/* <TouchableOpacity activeOpaticy={1} onPress={showDatePicker}>
                    <TextInput
                      style={{ marginHorizontal: 16, marginBottom: 8 }}
                      value={date}
                      editable={false}
                      mode="outlined"
                      label="Date"
                      placeholder="Date"
                      left={<TextInput.Icon icon="calendar" />} // optional
                    />
                  </TouchableOpacity> */}
                  {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                  {/* <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  /> */}
                  {/* <TextInput
                    style={{ marginHorizontal: 16, marginBottom: 8 }}
                    inputMode="numeric"
                    onChangeText={
                      (text) => setCVC(text)
                      
                    }
                    mode="outlined"
                    label="CVC"
                    placeholder="CVC"
                    // left={<TextInput.Icon icon="verfication" />}
                  />*/}

                 
                </View>
              </Collapsible>
            </View>


            {/* <CustomButton
             
                  title={"Pay now"}
                  color={COLORS.upfricaTitle}
                  isLoading={isLoading}
                /> */}

            

            

            

            
          </ScrollView>
          <View
            style={[
              GlobalStyleSheet.container,
              {
                borderTopWidth: 1,
                borderColor: colors.borderColor,
                backgroundColor: colors.card,
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ width: 120 }}>
                <Text style={{ ...FONTS.h5, color: COLORS.upfricaTitle }}>
                   ${totalPrice}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      ...FONTS.font,
                      color: COLORS.secondary,
                      lineHeight: 16,
                    }}
                  >
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <CustomButton
                  // onPress={() => navigation.navigate("DeliveryTracking")}
                  onPress={paymentComplete}
                  title={"Pay now"}
                  color={COLORS.upfricaTitle}
                  isLoading={isLoading}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  stepItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stepIcon: {
    height: 30,
    width: 30,
    borderRadius: 35,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary2,
  },
  list: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
  listImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 12,
  },
  listTitle: {
    ...FONTS.font,
    ...FONTS.fontTitle,
    flex: 1,
  },
  detailList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  payList: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  listRadio: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  listRadioCircle: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  payImg: {
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  payMedia: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 40,
    marginRight: 15,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

export default Payment;
