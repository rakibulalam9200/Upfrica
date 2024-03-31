import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const BannerSlider = ({ productsData }) => {
  const navigation = useNavigation();
  const [bannerProduct1, setBannerProduct1] = useState(null);
  const [bannerProduct2, setBannerProduct2] = useState({});
  const [bannerProduct3, setBannerProduct3] = useState({});
  const [bannerProduct4, setBannerProduct4] = useState({});
  const [bannerProduct5, setBannerProduct5] = useState({});
  let count = 0;
  console.log(productsData[0]?.homepageitems,"home page items")
  let first_bannder_product = productsData?.find(
    (p) => p.homepageitems.homepage_pos_1 == "1"
  );
  let second_bannder_product = productsData?.find(
    (p) => p.homepageitems.homepage_pos_2 == "1"
  );
  let third_bannder_product = productsData?.find(
    (p) => p.homepageitems.homepage_pos_3 == "1"
  );
  let forth_bannder_product = productsData?.find(
    (p) => p.homepageitems.homepage_pos_4 == "1"
  );
  let fifth_bannder_product = productsData?.find(
    (p) => p.homepageitems.homepage_pos_5 == "1"
  );

  // setBannerProduct1(first_bannder_product)

  console.log("first_bannder_product", bannerProduct1?.product_images[0]);
  useEffect(() => {
    setBannerProduct1(first_bannder_product);
  }, [first_bannder_product]);

  useEffect(() => {
    setBannerProduct2(second_bannder_product);
  }, [second_bannder_product]);

  useEffect(() => {
    setBannerProduct3(third_bannder_product);
  }, [third_bannder_product]);

  useEffect(() => {
    setBannerProduct4(forth_bannder_product);
  }, [forth_bannder_product]);

  useEffect(() => {
    setBannerProduct5(fifth_bannder_product);
  }, [fifth_bannder_product]);

  return (
    <View
      style={{
        height: SIZES.width / 2.4,
      }}
    >
      <Swiper
        paginationStyle={{
          flexDirection: "column",
          alignItems: "flex-end",
          bottom: 0,
          justifyContent: "center",
          height: "100%",
          paddingHorizontal: 10,
        }}
        dotStyle={{
          height: 7,
          width: 7,
        }}
        activeDotStyle={{
          height: 7,
          width: 7,
        }}
        activeDotColor={COLORS.upfricaTitle}
      >
        {bannerProduct1 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
              backgroundColor: Colors.white,
            }}
          >
            <View
              style={{
                paddingLeft: 15,
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: Colors.white,
              }}
            >
              <Text
                style={{
                  ...FONTS.fontSm,
                  ...FONTS.fontMedium,
                  color: COLORS.upfricaTitle,
                  marginBottom: 4,
                }}
              >
                {bannerProduct1?.title?.length > 20
                  ? bannerProduct1.title.slice(0, 20)
                  : bannerProduct1.title}
              </Text>
              <Text style={{ ...FONTS.h2, color: COLORS.title }}>
                {bannerProduct1?.price?.cents} GHS
              </Text>
              {/* <Text style={{ ...FONTS.fontSm }}>
                Discover our latest Products
              </Text> */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDetail", { data: bannerProduct1 })
                }
                style={{
                  backgroundColor: COLORS.upfricaTitle,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontXs,
                    color: COLORS.white,
                  }}
                >
                  Shop Now
                </Text>
              </TouchableOpacity>
            </View>
            {bannerProduct1?.product_images && (
              <Image
                // resizeMode="cover"
                // resizeMethod="scale"
                style={{
                  width: "100%",
                  resizeMode: "contain",
                  flex: 1,
                  // width: "100%",
                  // height: undefined,
                  // aspectRatio: 2 / 1,
                  // resizeMode:"cover",
                  // overflow:'hidden',
                  // backgroundColor:"gray"
                }}
                source={{ uri: bannerProduct1?.product_images[0] }}
              />
            )}
          </View>
        )}
        {bannerProduct2 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
              backgroundColor: Colors.white,
            }}
          >
            <View
              style={{
                // position: "absolute",
                // left: 15,
                // flex:1,
                paddingLeft: 15,
                paddingRight: 15,
                // height: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: Colors.white,
                // width:'100%'
                // top: 0,
                // opacity: 0.6,
                // backgroundColor: "black",
                // width: '100%',
              }}
            >
              <Text
                style={{
                  ...FONTS.fontSm,
                  ...FONTS.fontMedium,
                  color: COLORS.upfricaTitle,
                  marginBottom: 4,
                }}
              >
                {bannerProduct2?.title?.length > 20
                  ? bannerProduct2.title.slice(0, 20)
                  : bannerProduct2.title}
              </Text>
              <Text style={{ ...FONTS.h2, color: COLORS.title }}>
                {bannerProduct2?.price?.cents} GHS
              </Text>
              {/* <Text style={{ ...FONTS.fontSm }}>
                Discover our latest Products
              </Text> */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDetail", { data: bannerProduct2 })
                }
                // onPress={() => navigation.navigate("Items")}
                style={{
                  backgroundColor: COLORS.upfricaTitle,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontXs,
                    color: COLORS.white,
                  }}
                >
                  Shop Now
                </Text>
              </TouchableOpacity>
            </View>
            {bannerProduct2?.product_images && (
              <Image
                // resizeMode="cover"
                style={{
                  width: "100%",
                  resizeMode: "contain",
                  flex: 1,
                }}
                source={{ uri: bannerProduct2?.product_images[0] }}
              />
            )}
          </View>
        )}
        {bannerProduct3 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
              backgroundColor: Colors.white,
            }}
          >
            <View
              style={{
                // position: "absolute",
                // left: 15,
                // flex:1,
                paddingLeft: 15,
                paddingRight: 15,
                // height: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: Colors.white,
                // width:'100%'
                // top: 0,
                // opacity: 0.6,
                // backgroundColor: "black",
                // width: '100%',
              }}
            >
              <Text
                style={{
                  ...FONTS.fontSm,
                  ...FONTS.fontMedium,
                  color: COLORS.upfricaTitle,
                  marginBottom: 4,
                }}
              >
                {bannerProduct3?.title?.length > 20
                  ? bannerProduct3.title.slice(0, 20)
                  : bannerProduct3.title}
              </Text>
              <Text style={{ ...FONTS.h2, color: COLORS.title }}>
                {bannerProduct3?.price?.cents} GHS
              </Text>
              {/* <Text style={{ ...FONTS.fontSm }}>
                Discover our latest Products
              </Text> */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDetail", { data: bannerProduct3 })
                }
                // onPress={() => navigation.navigate("Items")}
                style={{
                  backgroundColor: COLORS.upfricaTitle,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontXs,
                    color: COLORS.white,
                  }}
                >
                  Shop Now
                </Text>
              </TouchableOpacity>
            </View>
            {bannerProduct3?.product_images && (
              <Image
                style={{
                  width: "100%",
                  resizeMode: "contain",
                  flex: 1,
                }}
                source={{ uri: bannerProduct3?.product_images[0] }}
              />
            )}
          </View>
        )}
        {bannerProduct4 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
              backgroundColor: Colors.white,
            }}
          >
            <View
              style={{
                // position: "absolute",
                // left: 15,
                // flex:1,
                paddingLeft: 15,
                paddingRight: 15,
                // height: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: Colors.white,
                // width:'100%'
                // top: 0,
                // opacity: 0.6,
                // backgroundColor: "black",
                // width: '100%',
              }}
            >
              <Text
                style={{
                  ...FONTS.fontSm,
                  ...FONTS.fontMedium,
                  color: COLORS.upfricaTitle,
                  marginBottom: 4,
                }}
              >
                {bannerProduct4?.title?.length > 20
                  ? bannerProduct4.title.slice(0, 20)
                  : bannerProduct4.title}
              </Text>
              <Text style={{ ...FONTS.h2, color: COLORS.title }}>
                {bannerProduct4?.price?.cents} GHS
              </Text>
              {/* <Text style={{ ...FONTS.fontSm }}>
                Discover our latest Products
              </Text> */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDetail", { data: bannerProduct4 })
                }
                // onPress={() => navigation.navigate("Items")}
                style={{
                  backgroundColor: COLORS.upfricaTitle,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontXs,
                    color: COLORS.white,
                  }}
                >
                  Shop Now
                </Text>
              </TouchableOpacity>
            </View>
            {bannerProduct4?.product_images && (
              <Image
                style={{
                  width: "100%",
                  resizeMode: "contain",
                  flex: 1,
                }}
                source={{ uri: bannerProduct4?.product_images[0] }}
              />
            )}
          </View>
        )}
        {bannerProduct5 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
              backgroundColor: Colors.white,
            }}
          >
            <View
              style={{
                // position: "absolute",
                // left: 15,
                // flex:1,
                paddingLeft: 15,
                paddingRight: 15,
                // height: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: Colors.white,
                // width:'100%'
                // top: 0,
                // opacity: 0.6,
                // backgroundColor: "black",
                // width: '100%',
              }}
            >
              <Text
                style={{
                  ...FONTS.fontSm,
                  ...FONTS.fontMedium,
                  color: COLORS.upfricaTitle,
                  marginBottom: 4,
                }}
              >
                {bannerProduct5?.title?.length > 20
                  ? bannerProduct5.title.slice(0, 20)
                  : bannerProduct5.title}
              </Text>
              <Text style={{ ...FONTS.h2, color: COLORS.title }}>
                {bannerProduct5?.price?.cents} GHS
              </Text>
              {/* <Text style={{ ...FONTS.fontSm }}>
                Discover our latest Products
              </Text> */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDetail", { data: bannerProduct5 })
                }
                // onPress={() => navigation.navigate("Items")}
                style={{
                  backgroundColor: COLORS.upfricaTitle,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontXs,
                    color: COLORS.white,
                  }}
                >
                  Shop Now
                </Text>
              </TouchableOpacity>
            </View>
            {bannerProduct5?.product_images && (
              <Image
                style={{
                  width: "100%",
                  resizeMode: "contain",
                  flex: 1,
                }}
                source={{ uri: bannerProduct5?.product_images[0] }}
              />
            )}
          </View>
        )}
        {/* <View>
          <Image
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 2.4 / 1,
            }}
            source={IMAGES.bannerimg2}
          />

          <View
            style={{
              position: "absolute",
              left: 0,
              height: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: "50%",
            }}
          >
            <Text
              style={{
                ...FONTS.fontSm,
                ...FONTS.fontMedium,
                color: COLORS.upfricaTitle,
                marginBottom: 4,
              }}
            >
              #UPFRICA SALE
            </Text>
            <Text style={{ ...FONTS.h2, color: COLORS.title }}>25% Off</Text>
            <Text style={{ ...FONTS.fontSm }}>
              Discover our latest Products
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Items")}
              style={{
                backgroundColor: COLORS.upfricaTitle,
                paddingHorizontal: 15,
                paddingVertical: 6,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.white,
                }}
              >
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Image
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 2.4 / 1,
            }}
            source={IMAGES.bannerimg3}
          />

          <View
            style={{
              position: "absolute",
              left: 15,
              height: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                ...FONTS.fontSm,
                ...FONTS.fontMedium,
                color: COLORS.upfricaTitle,
                marginBottom: 4,
              }}
            >
              #UPFRICA SELL
            </Text>
            <Text style={{ ...FONTS.h2, color: COLORS.title }}>35% Off</Text>
            <Text style={{ ...FONTS.fontSm }}>
              Discover our latest Products
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Items")}
              style={{
                backgroundColor: COLORS.upfricaTitle,
                paddingHorizontal: 15,
                paddingVertical: 6,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.white,
                }}
              >
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </Swiper>
    </View>
  );
};

export default BannerSlider;
