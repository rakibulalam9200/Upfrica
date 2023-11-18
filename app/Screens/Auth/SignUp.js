import { baseURL } from "@env";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";
import CustomButton from "../../components/CustomButton";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS, IMAGES } from "../../constants/theme";
import { hasEmailErrors, hasPasswordErrors, hasPolicyErrors, hasUserNameErrors, hasfNameErrors, haslNameErrors } from "../../utilities/Error";

const SignUp = (props) => {
  const theme = useTheme();
  const { colors } = theme;

  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [isFocused3, setisFocused3] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);
  const [handlePassword2, setHandlePassword2] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [policy, setPolicy] = useState(false);
  const scrollViewRef = useRef(null);

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    rePassword:"",
    username: "",
    policy: "",
  });

  const handleSignUp = async () => {

    if (
      hasEmailErrors(email, setErrorMessages) ||
      hasUserNameErrors(username,setErrorMessages) ||
      hasfNameErrors(firstName, setErrorMessages) ||
      haslNameErrors(lastName,setErrorMessages)
    ) {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: true,
      })
      return
    }

    if(
      hasPasswordErrors(password,rePassword,setErrorMessages)
      ){
      return
    }
    // console.log(hasPolicyErrors(policy,setErrorMessages),"check policy...")
    if(
      hasPolicyErrors(policy,setErrorMessages)
      ){
      return
    }
    setIsLoading(true);
    let user = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      password_confirmation: rePassword,
      account_type: "Seller (Individual)",
      phone_number: phoneNumber,
      city: city,
      country: country,
      terms_of_service: policy,
    };

    let body = { user };

    console.log(body, "body...");

    try {
      let response = await axios.post(`${baseURL}/users.json`, body);
      if (response?.data?.api_token) {
        console.log(response?.data?.api_token, "response....");
        props.navigation.navigate("SignIn");
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.error);
      console.log(error?.response?.data?.error, "errror...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollViewRef}>
        <View
          style={{
            ...GlobalStyleSheet.container,
            flex: 1,
            backgroundColor: colors.background,
          }}
        >
          <View
            style={{ marginBottom: 30, alignItems: "center", marginTop: 30 }}
          >
            <Image
              style={{
                height: 40,
                width: 160,
                resizeMode: "contain",
                marginBottom: 20,
              }}
              source={theme.dark ? IMAGES.logoWhite : IMAGES.logo}
            />
            <Text style={{ ...FONTS.h3, marginBottom: 6, color: colors.title }}>
              Create your account
            </Text>
            <Text style={{ ...FONTS.font, color: colors.text }}>
              It's quick and easy !
            </Text>
          </View>

          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
              Email Address
            </Text>
            <TextInput
              style={[
                GlobalStyleSheet.formControl,
                {
                  backgroundColor: colors.input,
                  color: colors.title,
                  borderColor: "#a435f0",
                  borderRadius: 5,
                },
              ]}
              value={email}
              onChangeText={(text) => setEmail(text)}
              onFocus={() => setisFocused(true)}
              onBlur={() => setisFocused(false)}
              placeholder="Email Address"
              placeholderTextColor={colors.textLight}
            />
            {errorMessages?.email !== '' ? <Text style={{color:'red'}}>{errorMessages?.email}</Text>:<></>}
          </View>
          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
              First Name
            </Text>
            <TextInput
              style={[
                GlobalStyleSheet.formControl,
                {
                  backgroundColor: colors.input,
                  color: colors.title,
                  borderColor: "#a435f0",
                  borderRadius: 5,
                },
              ]}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              onFocus={() => setisFocused(true)}
              onBlur={() => setisFocused(false)}
              placeholder="First Name"
              placeholderTextColor={colors.textLight}
            />
             {errorMessages?.firstName !== '' ? <Text style={{color:'red'}}>{errorMessages?.firstName}</Text>:<></>}
          </View>
          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
              Last Name
            </Text>
            <TextInput
              style={[
                GlobalStyleSheet.formControl,
                {
                  backgroundColor: colors.input,
                  color: colors.title,
                  borderColor: "#a435f0",
                  borderRadius: 5,
                },
              ]}
              value={setLastName}
              onChangeText={(text) => setLastName(text)}
              onFocus={() => setisFocused(true)}
              onBlur={() => setisFocused(false)}
              placeholder="Last Name"
              placeholderTextColor={colors.textLight}
            />
            {errorMessages?.lastName !== '' ? <Text style={{color:'red'}}>{errorMessages?.lastName}</Text>:<></>}
          </View>
          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
              Username/Display name
            </Text>
            <TextInput
              style={[
                GlobalStyleSheet.formControl,
                {
                  backgroundColor: colors.input,
                  color: colors.title,
                  borderColor: "#a435f0",
                  borderRadius: 5,
                },
              ]}
              value={username}
              onChangeText={(text) => setUsername(text)}
              onFocus={() => setisFocused(true)}
              onBlur={() => setisFocused(false)}
              placeholder="No Space, No Special Character"
              placeholderTextColor={colors.textLight}
            />
            {errorMessages?.username !== '' ? <Text style={{color:'red'}}>{errorMessages?.username}</Text>:<></>}
          </View>
          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
              Password
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => setHandlePassword(!handlePassword)}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  height: 50,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  right: 0,
                  opacity: 0.5,
                }}
              >
                {handlePassword ? (
                  <FeatherIcon name="eye" color={colors.title} size={18} />
                ) : (
                  <FeatherIcon name="eye-off" color={colors.title} size={18} />
                )}
              </TouchableOpacity>
              <TextInput
                style={[
                  GlobalStyleSheet.formControl,
                  {
                    backgroundColor: colors.input,
                    color: colors.title,
                    borderColor: "#a435f0",
                    borderRadius: 5,
                  },
                ]}
                value={password}
                onChangeText={(text) => setPassword(text)}
                onFocus={() => setisFocused2(true)}
                onBlur={() => setisFocused2(false)}
                secureTextEntry={handlePassword}
                placeholder="Password"
                placeholderTextColor={colors.textLight}
              />
               {errorMessages?.password !== '' ? <Text style={{color:'red'}}>{errorMessages?.password}</Text>:<></>}
            </View>
          </View>
          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
              Confirm Password
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => setHandlePassword2(!handlePassword2)}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  height: 50,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  right: 0,
                  opacity: 0.5,
                }}
              >
                {handlePassword2 ? (
                  <FeatherIcon name="eye" color={colors.title} size={18} />
                ) : (
                  <FeatherIcon name="eye-off" color={colors.title} size={18} />
                )}
              </TouchableOpacity>
              <TextInput
                style={[
                  GlobalStyleSheet.formControl,
                  {
                    backgroundColor: colors.input,
                    color: colors.title,
                    borderColor: "#a435f0",
                    borderRadius: 5,
                  },
                ]}
                value={rePassword}
                onChangeText={(text) => setRePassword(text)}
                onFocus={() => setisFocused2(true)}
                onBlur={() => setisFocused2(false)}
                secureTextEntry={handlePassword2}
                placeholder="Confrim Password"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: 15,
            }}
          >
            <Checkbox.Item
              onPress={() => setPolicy((pre)=> !pre)}
              position="leading"
              label="I agree to all Term, Privacy Policy and fees"
              color={COLORS.upfricaTitle}
              uncheckedColor={colors.textLight}
              status={policy ? "checked" : "unchecked"}
              style={{
                paddingHorizontal: 0,
                paddingVertical: 5,
              }}
              labelStyle={{
                ...FONTS.font,
                color: colors.title,
                textAlign: "left",
              }}
            />
             {errorMessages?.policy !== '' ? <Text style={{color:'red'}}>{errorMessages?.policy}</Text>:<></>}
          </View>
          <CustomButton
            onPress={handleSignUp}
            color={COLORS.upfricaTitle}
            title="Sign Up"
            isLoading={isLoading}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
            }}
          >
            <Text style={{ ...FONTS.font, color: colors.text, marginRight: 5 }}>
              Already have an account ?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignIn")}
              // onPress={handleSignUp}
            >
              <Text style={{ ...FONTS.font, color: COLORS.upfricaTitle }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                height: 1,
                flex: 1,
                backgroundColor: "gray",
              }}
            />
            <Text
              style={{
                ...FONTS.font,
                color: colors.text,
                marginHorizontal: 15,
              }}
            >
              Or sign in with
            </Text>
            <View
              style={{
                height: 1,
                flex: 1,
                backgroundColor: "gray",
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 48,
                width: 48,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderRadius: 48,
                borderColor: "gray",
                marginHorizontal: 5,
              }}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                }}
                source={IMAGES.google}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 48,
                width: 48,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderRadius: 48,
                borderColor: "gray",
                marginHorizontal: 5,
              }}
            >
              <Image
                style={{
                  height: 28,
                  width: 28,
                }}
                source={IMAGES.facebook}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
