// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { PAYSTACK_PUBLIC_KEY } from "@env";
import { useTheme } from "@react-navigation/native";
import { CardField, createToken } from "@stripe/stripe-react-native";
import React, { useRef, useState } from "react";
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
import RNPaystack from "react-native-paystack";
import { Paystack } from "react-native-paystack-webview";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();
  const paystackWebViewRef = useRef();

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

  const paymentComplete = async () => {
    // console.log(paymentOption,'payment option')
    if (paymentOption === "Credit") {
      if (cardInfo) {
        setIsLoading(true);
        // console.dir(cardInfo, { depth: null })
        // console.log(cardInfo, "-------------");
        try {
          const resToken = await createToken({ ...cardInfo, type: "Card" });
          console.log(resToken, "response token...");
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
      chargeCard();
    }
  };

  const chargeCardAccess = () => {
    console.log("charge card");
    RNPaystack.chargeCardWithAccessCode({
      cardNumber: "50606 66666 66666 6666",
      expiryMonth: "12",
      expiryYear: "24",
      cvc: "123",
      accessCode: "2p3j42th639duy4",
    })
      .then((response) => {
        console.log("hit access here ");
        console.log(response); // do stuff with the token
      })
      .catch((error) => {
        console.log("error access here ");
        console.log(error.message);
      });
  };

  const chargeCard = () => {
    console.log(
      "charge card",
      cardNumber,
      date.split("/")[0],
      date.split("/")[1],
      CVC,
      total
    );
    setIsLoading(true);
    RNPaystack.chargeCard({
      cardNumber: cardNumber,
      expiryMonth: date.split("/")[0],
      expiryYear: date.split("/")[1],
      cvc: CVC,
      amountInKobo: +total,
      email: "rakibul9200@gmail.com",
      currency: "GHS",
      // cardNumber: "4084084084084081",
      // expiryMonth: "09",
      // expiryYear: "24",
      // cvc: "408",
      // email: "rakibul9200@gmail.com",
      //  amountInKobo: 150000,
      // currency: 'GHS'
    })
      .then((response) => {
        navigation.navigate("DeliveryTracking");
        dispatch(resetCart());
        setIsLoading(false);
        // console.log("hit here......");
        console.log(response); // do stuff with the token
      })
      .catch((error) => {
        Alert.alert(error.message);
        setIsLoading(false);
        // console.log("hit error here......");
        console.log(error.message);
      });
  };

  function Pay() {
    return (
      <View style={{ flex: 1 }}>
        <Paystack
          paystackKey={publicKey}
          amount={"25000.00"}
          billingEmail="rakibul9200@gmail.com"
          activityIndicatorColor="green"
          onCancel={(e) => {
            // handle response here
          }}
          onSuccess={(res) => {
            // handle response here
          }}
          autoStart={true}
        />
      </View>
    );
  }

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
            {/* <View style={[GlobalStyleSheet.container]}>
       
                            <View style={{flexDirection:'row'}}>
                                <View style={{
                                    height:3,
                                    width:3,
                                    borderRadius:3,
                                    backgroundColor:colors.text,
                                    marginRight:10,
                                    opacity:.5,
                                    marginTop:8,
                                }}/>
                                <Text style={{...FONTS.font,color:colors.text}}>10% instant Savings on Citi Credit and Debit Cards on a min spend of Rs 3,0000. TCA</Text>
                            </View>
                        </View> */}
            {/* <View
                            style={{
                                paddingHorizontal:15,
                                paddingBottom:10,
                                paddingTop:15,
                            }}
                        >
                            <Text style={{...FONTS.font,...FONTS.fontTitle,color:COLORS.text}}>Payment Options</Text>
                        </View>
                         */}
            {/* <View style={{
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                            marginHorizontal:15,
                            marginBottom:8,
                        }}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'Cash' ? '' : 'Cash')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.textLight}]}
                                    source={cash}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>Cash On Delivery(Cash/UPI)</Text>
                                <FeatherIcon color={colors.textLight} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "Cash" ? false : true}>
                               
                            </Collapsible>
                        </View> */}

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
                  {/* <View style={{ marginBottom: 15 }}>
                    <TextInput
                      style={[
                        GlobalStyleSheet.formControl,
                        {
                          backgroundColor: colors.input,
                          borderColor: colors.borderColor,
                          color: colors.title,
                        },
                      ]}
                      placeholder="Card Number"
                      placeholderTextColor={colors.textLight}
                    />
                  </View>  */}
                  {/* <View style={{marginBottom:15}}>
                                        <TextInput
                                            style={[GlobalStyleSheet.formControl,{
                                                backgroundColor:colors.input,
                                                borderColor:colors.borderColor,
                                                color:colors.title,
                                            }]}
                                            placeholder='Name on card'
                                            placeholderTextColor={colors.textLight}
                                        />
                                    </View> */}
                  {/* <View style={[GlobalStyleSheet.row]}>
                    <View style={[GlobalStyleSheet.col50]}>
                      <TextInput
                        style={[
                          GlobalStyleSheet.formControl,
                          {
                            backgroundColor: colors.input,
                            borderColor: colors.borderColor,
                            color: colors.title,
                          },
                        ]}
                        placeholder="Valid Thru(MM/YY)"
                        placeholderTextColor={colors.textLight}
                      />
                    </View>
                    <View style={[GlobalStyleSheet.col50]}>
                      <TextInput
                        style={[
                          GlobalStyleSheet.formControl,
                          {
                            backgroundColor: colors.input,
                            borderColor: colors.borderColor,
                            color: colors.title,
                          },
                        ]}
                        placeholder="CVV"
                        placeholderTextColor={colors.textLight}
                      />
                    </View>
                  </View> */}
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
                  <Paystack
                    paystackKey={PAYSTACK_PUBLIC_KEY}
                    billingEmail="rakibul9200@gmail.com"
                    amount={"25000.00"}
                    onCancel={(e) => {
                      // handle response here
                    }}
                    onSuccess={(res) => {
                      // handle response here
                    }}
                    ref={paystackWebViewRef}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      paystackWebViewRef.current.startTransaction()
                    }
                  >
                    <Text>Pay Now</Text>
                  </TouchableOpacity>
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
                    
                  /> */}
                  {/* <DateTimePickerAndroid/> */}
                  {/* <TouchableOpacity onPress={chargeCardAccess}>
                    <Text style={styles.instructions}>
                      Charge Card with AccessCode
                    </Text>
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity onPress={chargeCard}>
                    <Text style={[styles.instructions, { marginTop: 10 }]}>
                      Charge Card without AccessCode
                    </Text>
                  </TouchableOpacity> */}
                  {/* {PhonePeOption.map((data, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setPayActive(data.title)}
                        key={index}
                        style={[
                          styles.payList,
                          {
                            borderBottomColor: colors.borderColor,
                          },
                          PhonePeOption.length - 1 === index && {
                            borderBottomWidth: 0,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.listRadio,
                            {
                              borderColor: colors.text,
                            },
                            payActive === data.title && {
                              borderColor: COLORS.primary,
                            },
                          ]}
                        >
                          {payActive === data.title && (
                            <View style={styles.listRadioCircle} />
                          )}
                        </View>

                        <Text
                          style={[
                            {
                              ...FONTS.font,
                              color: colors.text,
                            },
                            payActive === data.title && {
                              ...FONTS.fontBold,
                              color: colors.title,
                            },
                          ]}
                        >
                          {data.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })} */}
                </View>
              </Collapsible>
            </View>

            {/* <View style={{
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                            marginHorizontal:15,
                            marginBottom:8,
                        }}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'PaytmWallet' ? '' : 'PaytmWallet')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.textLight}]}
                                    source={wallet}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>Paytm/ Wallets</Text>
                                <FeatherIcon color={colors.textLight} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "PaytmWallet" ? false : true}>
                                <View style={{paddingBottom:20}}>
                                    {PhonePeOption.map((data,index) => {
                                        return(
                                            <TouchableOpacity
                                                onPress={() => setPayActive(data.title)}
                                                key={index}
                                                style={[styles.payList,{
                                                    borderBottomColor:colors.borderColor,
                                                }, PhonePeOption.length - 1 === index && {
                                                    borderBottomWidth:0,
                                                }]}
                                            >
                                                <View
                                                    style={[styles.listRadio,{
                                                        borderColor:colors.text,
                                                    }, payActive === data.title && {
                                                        borderColor:COLORS.primary,
                                                    }]}
                                                >
                                                    {payActive === data.title &&
                                                        <View style={styles.listRadioCircle}/>
                                                    }
                                                </View>
                                                <View
                                                    style={[styles.payMedia,{
                                                        borderColor:colors.borderColor,
                                                    }]}
                                                >
                                                    <Image style={styles.payImg} source={data.image}/>
                                                </View>
                                                <Text style={[
                                                    {
                                                        ...FONTS.font,
                                                        color:colors.text
                                                    },
                                                    payActive === data.title && {
                                                        ...FONTS.fontBold,
                                                        color:colors.title
                                                    }]}>{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </Collapsible>
                        </View> */}

            {/* <View style={{
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                            marginHorizontal:15,
                            marginBottom:8,
                        }}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'Netbanking' ? '' : 'Netbanking')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.textLight}]}
                                    source={bank}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>Net Banking</Text>
                                <FeatherIcon color={colors.textLight} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "Netbanking" ? false : true}>
                                <View style={{paddingBottom:20}}>
                                    {PhonePeOption.map((data,index) => {
                                        return(
                                            <TouchableOpacity
                                                onPress={() => setPayActive(data.title)}
                                                key={index}
                                                style={[styles.payList,{
                                                    borderBottomColor:colors.borderColor,
                                                }, PhonePeOption.length - 1 === index && {
                                                    borderBottomWidth:0,
                                                }]}
                                            >
                                                <View
                                                    style={[styles.listRadio,{
                                                        borderColor:colors.text,
                                                    }, payActive === data.title && {
                                                        borderColor:COLORS.primary,
                                                    }]}
                                                >
                                                    {payActive === data.title &&
                                                        <View style={styles.listRadioCircle}/>
                                                    }
                                                </View>
                                                <View
                                                    style={[styles.payMedia,{
                                                        borderColor:colors.borderColor,
                                                    }]}
                                                >
                                                    <Image style={styles.payImg} source={data.image}/>
                                                </View>
                                                <Text style={[
                                                    {
                                                        ...FONTS.font,
                                                        color:colors.text
                                                    },
                                                    payActive === data.title && {
                                                        ...FONTS.fontBold,
                                                        color:colors.title
                                                    }]}>{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </Collapsible>
                        </View> */}

            {/* <View style={{
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                            marginHorizontal:15,
                            marginBottom:8,
                        }}>
                            <TouchableOpacity
                                onPress={() => setPaymentOption(paymentOption === 'EMI' ? '' : 'EMI')}
                                style={[styles.list]}
                            >
                                <Image
                                    style={[styles.listImg,{tintColor:colors.textLight}]}
                                    source={personal}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>EMI/ Pay Later</Text>
                                <FeatherIcon color={colors.textLight} name={'chevron-down'} size={22} />
                            </TouchableOpacity>
                            <Collapsible collapsed={paymentOption === "EMI" ? false : true}>
                                <View style={{paddingBottom:20}}>
                                    {PhonePeOption.map((data,index) => {
                                        return(
                                            <TouchableOpacity
                                                onPress={() => setPayActive(data.title)}
                                                key={index}
                                                style={[styles.payList,{
                                                    borderBottomColor:colors.borderColor,
                                                }, PhonePeOption.length - 1 === index && {
                                                    borderBottomWidth:0,
                                                }]}
                                            >
                                                <View
                                                    style={[styles.listRadio,{
                                                        borderColor:colors.text,
                                                    }, payActive === data.title && {
                                                        borderColor:COLORS.primary,
                                                    }]}
                                                >
                                                    {payActive === data.title &&
                                                        <View style={styles.listRadioCircle}/>
                                                    }
                                                </View>
                                                <View
                                                    style={[styles.payMedia,{
                                                        borderColor:colors.borderColor,
                                                    }]}
                                                >
                                                    <Image style={styles.payImg} source={data.image}/>
                                                </View>
                                                <Text style={[
                                                    {
                                                        ...FONTS.font,
                                                        color:colors.text
                                                    },
                                                    payActive === data.title && {
                                                        ...FONTS.fontBold,
                                                        color:colors.title
                                                    }]}>{data.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </Collapsible>
                        </View> */}

            {/* <View style={[GlobalStyleSheet.container]}>
                            <View
                                style={{
                                    paddingHorizontal:15,
                                    paddingVertical:15,
                                    backgroundColor:theme.dark ? colors.card : "#eee",
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <Image
                                    style={{height:18,width:18,marginRight:12,tintColor:colors.textLight}}
                                    source={gift}
                                />
                                <Text style={[styles.listTitle,{color:colors.title}]}>Have a Gift Card?</Text>
                                <TouchableOpacity>
                                    <Text style={{...FONTS.font,color:COLORS.primary,...FONTS.fontBold}}>APPLY</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
            {/* <View style={[GlobalStyleSheet.container,{backgroundColor:colors.card}]}>
                            <View
                                style={{
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    paddingBottom:10,
                                    marginBottom:10,
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontTitle,color:colors.title}}>Price Details(1 item)</Text>
                            </View>
                            <View style={styles.detailList}>
                                <Text style={{...FONTS.font,color:colors.text}}>Total MRP</Text>
                                <Text style={{...FONTS.font,color:colors.text}}>1599</Text>
                            </View>
                            <View style={styles.detailList}>
                                <Text style={{...FONTS.font,color:colors.text}}>Discount on MRP</Text>
                                <Text style={{...FONTS.font,color:COLORS.success}}>-640</Text>
                            </View>
                            <View style={styles.detailList}>
                                <Text style={{...FONTS.font,color:colors.text}}>Coupon Discount</Text>
                                <Text style={{...FONTS.font,color:COLORS.success}}>-200</Text>
                            </View>
                            <View
                                style={{
                                    borderTopWidth:1,
                                    borderTopColor:colors.borderColor,
                                    paddingTop:8,
                                    marginTop:10,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontTitle,color:colors.title}}>Total Amount</Text>
                                <Text style={{...FONTS.font,...FONTS.fontTitle,color:colors.title}}>759</Text>
                            </View>
                        </View> */}
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
                  ${total}
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
