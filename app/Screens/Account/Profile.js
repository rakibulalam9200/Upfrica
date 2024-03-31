import React, { useRef } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import UnitedStates from "../../assets/images/flags/UnitedStates.png";
import german from "../../assets/images/flags/german.png";
import india from "../../assets/images/flags/india.png";
import italian from "../../assets/images/flags/italian.png";
import spanish from "../../assets/images/flags/spanish.png";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { FONTS, IMAGES } from "../../constants/theme";
import Header from "../../layout/Header";

import { useTheme } from "@react-navigation/native";

const languagetData = [
  {
    flag: india,
    name: "Indian",
  },
  {
    flag: UnitedStates,
    name: "English",
  },
  {
    flag: german,
    name: "German",
  },
  {
    flag: italian,
    name: "Italian",
  },
  {
    flag: spanish,
    name: "Spanish",
  },
];

const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const RBSheetLanguage = useRef();
  const { token, user } = useSelector((state) => state.user);
  console.log(user);

  return (
    <>
      <RBSheet
        ref={RBSheetLanguage}
        closeOnDragDown={true}
        height={400}
        openDuration={300}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,.3)",
          },
          container: {
            backgroundColor: colors.card,
          },
          draggableIcon: {
            backgroundColor: colors.borderColor,
          },
        }}
      >
        <View
          style={{
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
            paddingBottom: 8,
            paddingTop: 4,
          }}
        >
          <Text style={{ ...FONTS.h5, color: colors.title }}>Language</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 15 }}
        >
          {languagetData.map((data, index) => (
            <TouchableOpacity
              onPress={() => RBSheetLanguage.current.close()}
              key={index}
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: colors.borderColor,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  height: 20,
                  width: 25,
                  marginRight: 12,
                }}
                source={data.flag}
              />
              <Text style={{ ...FONTS.fontLg, color: colors.title, flex: 1 }}>
                {data.name}
              </Text>
              <FeatherIcon
                name="chevron-right"
                color={colors.textLight}
                size={24}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RBSheet>

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
          <Header leftIcon={"back"} rightIcon={"more"} title={"Profile"} />
          <ScrollView>
            {
              <View style={GlobalStyleSheet.container}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 16,
                  }}
                >
                  <Image
                    style={{
                      height: 65,
                      width: 65,
                      borderRadius: 65,
                      marginRight: 15,
                    }}
                    source={IMAGES.user}
                  />
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h6,
                        color: colors.title,
                        marginBottom: 2,
                      }}
                    >
                      {token
                        ? `${user.first_name} ${user.last_name}`
                        : "You aren't logged in."}
                    </Text>
                    {token && (
                      <Text style={{ ...FONTS.font, color: colors.textLight }}>
                        {user.email}
                      </Text>
                    )}
                  </View>
                  {/* <IconButton
                                    onPress={() => navigation.navigate('EditProfile')}
                                    iconColor={COLORS.upfricaTitle} 
                                    icon={props => <Octicons name="pencil" {...props} />} 
                                /> */}
                </View>

                {/* <View style={{
                                flexDirection:'row',
                                flexWrap:'wrap',
                                marginHorizontal:-10,
                            }}>
                                <View style={{width:'50%',paddingHorizontal:5}}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Orders')}
                                        style={[styles.profileBtn,{backgroundColor:colors.card}]}
                                    >
                                        <Ionicons style={{marginRight:10}} color={colors.textLight} size={20} name={'cube-outline'} />
                                        <Text style={{...FONTS.font,fontSize:16,...FONTS.fontTitle,color:colors.title}}>Orders</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width:'50%',paddingHorizontal:5}}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Wishlist')}
                                        style={[styles.profileBtn,{backgroundColor:colors.card}]}
                                        >
                                        <FeatherIcon style={{marginRight:10}} color={colors.textLight} size={20} name={'heart'} />
                                        <Text style={{...FONTS.font,fontSize:16,...FONTS.fontTitle,color:colors.title}}>Wishlist</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width:'50%',paddingHorizontal:5}}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Coupons')}
                                        style={[styles.profileBtn,{backgroundColor:colors.card}]}
                                    >
                                        <FeatherIcon style={{marginRight:10}} color={colors.textLight} size={20} name={'gift'} />
                                        <Text style={{...FONTS.font,fontSize:16,...FONTS.fontTitle,color:colors.title}}>Coupons</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width:'50%',paddingHorizontal:5}}>
                                    <TouchableOpacity
                                        style={[styles.profileBtn,{backgroundColor:colors.card}]}
                                    >
                                        <FeatherIcon style={{marginRight:10}} color={colors.textLight} size={20} name={'headphones'} />
                                        <Text style={{...FONTS.font,fontSize:16,...FONTS.fontTitle,color:colors.title}}>Help Center</Text>
                                    </TouchableOpacity>
                                </View>
                             </View> */}
              </View>
            }
            {token ? (
              <View
                style={{
                  ...GlobalStyleSheet.container,
                  borderTopWidth: 1,
                  borderColor: colors.borderColor,
                }}
              >
                <Text
                  style={{ ...FONTS.h6, color: colors.title, marginBottom: 12 }}
                >
                  Account Settings
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EditProfile")}
                    style={[
                      styles.listItem,
                      { borderBottomColor: colors.borderColor },
                    ]}
                  >
                    <FeatherIcon
                      style={{ marginRight: 12 }}
                      color={colors.textLight}
                      size={20}
                      name="user"
                    />
                    <Text
                      style={{ ...FONTS.font, color: colors.title, flex: 1 }}
                    >
                      Edit Profile
                    </Text>
                    <FeatherIcon
                      size={20}
                      color={colors.textLight}
                      name="chevron-right"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("OrderList")}
                    style={[
                      styles.listItem,
                      { borderBottomColor: colors.borderColor },
                    ]}
                  >
                    <FeatherIcon
                      style={{ marginRight: 12 }}
                      color={colors.textLight}
                      size={20}
                      name="user"
                    />
                    <Text
                      style={{ ...FONTS.font, color: colors.title, flex: 1 }}
                    >
                      Orders List
                    </Text>
                    <FeatherIcon
                      size={20}
                      color={colors.textLight}
                      name="chevron-right"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CancelOrders")}
                    style={[
                      styles.listItem,
                      { borderBottomColor: colors.borderColor },
                    ]}
                  >
                    <FeatherIcon
                      style={{ marginRight: 12 }}
                      color={colors.textLight}
                      size={20}
                      name="user"
                    />
                    <Text
                      style={{ ...FONTS.font, color: colors.title, flex: 1 }}
                    >
                      Cancel Orders
                    </Text>
                    <FeatherIcon
                      size={20}
                      color={colors.textLight}
                      name="chevron-right"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Refund")}
                    style={[
                      styles.listItem,
                      { borderBottomColor: colors.borderColor },
                    ]}
                  >
                    <FeatherIcon
                      style={{ marginRight: 12 }}
                      color={colors.textLight}
                      size={20}
                      name="user"
                    />
                    <Text
                      style={{ ...FONTS.font, color: colors.title, flex: 1 }}
                    >
                      Refund order
                    </Text>
                    <FeatherIcon
                      size={20}
                      color={colors.textLight}
                      name="chevron-right"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.listItem,
                      { borderBottomColor: colors.borderColor },
                    ]}
                  >
                    <FeatherIcon
                      style={{ marginRight: 12 }}
                      color={colors.textLight}
                      size={20}
                      name="bell"
                    />
                    <Text
                      style={{ ...FONTS.font, color: colors.title, flex: 1 }}
                    >
                      Notification Setting
                    </Text>
                    <FeatherIcon
                      size={20}
                      color={colors.textLight}
                      name="chevron-right"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn")}
                    style={[
                      styles.listItem,
                      { borderBottomColor: colors.borderColor },
                    ]}
                  >
                    <FeatherIcon
                      style={{ marginRight: 12 }}
                      color={colors.textLight}
                      size={20}
                      name="log-out"
                    />
                    <Text
                      style={{ ...FONTS.font, color: colors.title, flex: 1 }}
                    >
                      Log Out
                    </Text>
                    <FeatherIcon
                      size={20}
                      color={colors.textLight}
                      name="chevron-right"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Seller")}
                    style={[
                      styles.listItem,
                      { borderBottomColor: colors.borderColor },
                    ]}
                  >
                    <FeatherIcon
                      style={{ marginRight: 12 }}
                      color={colors.textLight}
                      size={20}
                      name="user"
                    />
                    <Text
                      style={{ ...FONTS.font, color: colors.title, flex: 1 }}
                    >
                      Your Seller Profile
                    </Text>
                    <FeatherIcon
                      size={20}
                      color={colors.textLight}
                      name="chevron-right"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  ...GlobalStyleSheet.container,
                  borderTopWidth: 1,
                  borderColor: colors.borderColor,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignIn")}
                  style={[
                    styles.listItem,
                    { borderBottomColor: colors.borderColor },
                  ]}
                >
                  <FeatherIcon
                    style={{ marginRight: 12 }}
                    color={colors.textLight}
                    size={20}
                    name="log-in"
                  />
                  <Text style={{ ...FONTS.font, color: colors.title, flex: 1 }}>
                    Log in
                  </Text>
                  <FeatherIcon
                    size={20}
                    color={colors.textLight}
                    name="chevron-right"
                  />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  profileBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    ...GlobalStyleSheet.shadow,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
});

export default Profile;
