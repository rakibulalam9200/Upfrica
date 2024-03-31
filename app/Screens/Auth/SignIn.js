import { baseURL } from "@env";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
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
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { storeToken, storeUser } from "../../../Store/user";
import CustomButton from "../../components/CustomButton";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS, IMAGES } from "../../constants/theme";

const SignIn = (props) => {
  const theme = useTheme();
  const { navFrom } = useSelector((state) => state.cart);
  console.log(navFrom, "nav from....");
  const { colors } = theme;
  const dispatch = useDispatch();

  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);
  const [activeIndicator, setActiveIndicator] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // sign in module
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [email, setEmail] = useState("srikantorajbongshi139@gmail.com");
  const [password, setPassword] = useState("@srikanto12345");
  // const [email, setEmail] = useState("rakibul9200+1@gmail.com");
  // const [password, setPassword] = useState("rakibul@123#");

  // console.log(isLoading, "isloading...");

  const signIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Please, Enter your Valid Email and password.");
      return;
    }
    setIsLoading(true);
    let body = {
      email: email,
      password: password,
    };

    try {
      let response = await axios.post(`${baseURL}/auth.json`, body);
      if (response?.data?.token) {
        setEmail("");
        setPassword("");
        console.log(response?.data);
        dispatch(storeToken(response?.data?.token));
        dispatch(storeUser(response?.data?.user));
        if (navFrom === "cart") {
          props.navigation.navigate("BottomNavigation", { screen: "Cart" });
        } else {
          props.navigation.navigate("BottomNavigation", { screen: "Home" });
        }
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.error);
      console.log(error.response.data?.error, "errror...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Please, Enter your Valid Email and password.");
      return;
    }

    var data = JSON.stringify({
      email: email,
      password: password,
    });
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://upfrica-staging.herokuapp.com/api/v1/auth.json/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      );

      const data = await response.text();
      console.log(data);

      if (response.ok) {
        // Successfully signed in
        console.log("Success", "You have successfully signed in.");
        setIsLoading(false);
        // props.navigation.navigate("DrawerNavigation");
      } else {
        // Sign-in failed
        console.log("Error", data.error);
      }
    } catch (error) {
      console.log("Error signing in:", error);
      console.log("Error", "An error occurred while signing in.");
      setIsLoading(false);
    }
    //   props.navigation.navigate('DrawerNavigation')
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <Text style={{ ...FONTS.h3, color: colors.title, marginBottom: 6 }}>
              Log into Your Account
            </Text>
            {/* <Text style={{...FONTS.font,color:colors.text,textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </Text> */}
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
              type={"email"}
              onFocus={() => setisFocused(true)}
              onBlur={() => setisFocused(false)}
              placeholder="Type Email Here"
              placeholderTextColor={colors.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              defaultValue="srikantorajbongshi139@gmail.com"
            />
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
                onFocus={() => setisFocused2(true)}
                onBlur={() => setisFocused2(false)}
                secureTextEntry={handlePassword}
                placeholder="Type Password Here"
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={setPassword}
                defaultValue="@srikanto12345"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
            }}
          >
            <CustomButton
              // onPress={() => props.navigation.navigate('DrawerNavigation')}
              onPress={signIn}
              color={COLORS.upfricaBackgroundColor}
              title="Sign In"
              isLoading={isLoading}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Text style={{ ...FONTS.font, color: colors.text }}>
              Forgot password?
            </Text>
            <TouchableOpacity>
              <Text style={{ ...FONTS.fontLg, color: COLORS.upfricaTitle }}>
                Reset here
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                ...FONTS.font,
                color: colors.title,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              Don’t have an account?
            </Text>
            <CustomButton
              onPress={() => props.navigation.navigate("SignUp")}
              outline
              title="Register now"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
