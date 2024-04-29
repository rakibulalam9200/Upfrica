import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/cart";
import { COLORS, FONTS } from "../constants/theme";
// secondary_postage:data?.secondary_postage_fee?.cents/100
// postage:data?.postage_fee?.cents/100

const ProductBox = ({
  onPress,
  id,
  image,
  title,
  price,
  rating,
  review,
  isLike,
  handleLike,
  description,
  postage_fee,
  secondary_postage_fee,
  type,
  containerStyle,
}) => {
  const currency = useSelector((state) => state.currency.currency);
  const { token, user } = useSelector((state) => state.user);
  const { colors } = useTheme();
  const navigation = useNavigation();
  let dispatch = useDispatch();
  console.log(postage_fee, secondary_postage_fee);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress()}
      style={[
        { backgroundColor: "white", flex: 1, justifyContent: "space-between" },
        containerStyle,
      ]}
    >
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 10 }}>
          <Image
            style={{
              width: "100%",
              height: 180,
              resizeMode: "stretch",
            }}
            source={{ uri: image }}
          />
          <TouchableOpacity
            onPress={() => handleLike(id)}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: 6,
            }}
          >
            <FontAwesome
              size={16}
              color={isLike ? "#F9427B" : COLORS.text}
              name={isLike ? "heart" : "heart-o"}
            />
          </TouchableOpacity>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.75)",
              // backgroundColor:'white',
              paddingHorizontal: 8,
              paddingVertical: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome color={"#DA8D46"} size={10} name="star" />
              <Text
                style={{
                  ...FONTS.fontSm,
                  color: COLORS.white,
                  ...FONTS.fontTitle,
                  marginLeft: 3,
                }}
              >
                {rating}
              </Text>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.white,
                  opacity: 0.7,
                  marginLeft: 5,
                }}
              >
                | {review}
              </Text>
            </View>
          </View>
        </View>
        <Text
          numberOfLines={2}
          style={{
            ...FONTS.font,
            ...FONTS.fontTitle,
            color: colors.title,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <Text style={{ ...FONTS.h5, color: COLORS.upfricaTitle }}>
          {currency.value}
          {price}
        </Text>

        <TouchableOpacity
          onPress={() => {
            let tempData = {
              id: id,
              image: image,
              title: title,
              quantity: 1,
              price: price,
              type: description?.body,
              postage: postage_fee?.cents / 100,
              secondary_postage: secondary_postage_fee?.cents / 100,
              type: type,
            };
            if (token) {
              dispatch(addToCart(tempData));
              navigation.navigate("DirectBuy", {
                id: id,
                image: image,
                title: title,
                price: price,
                isLike: isLike,
                type: description?.body,
                postage: postage_fee?.cents / 100,
                secondary_postage: secondary_postage_fee?.cents / 100,
              });
            } else {
              navigation.navigate("SignIn");
            }
          }}
          style={{
            backgroundColor: COLORS.upfricaTitle,
            paddingHorizontal: 15,
            paddingVertical: 6,
            //   marginTop: 15,
            marginHorizontal: 20,
            marginRight: 0,
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
    </TouchableOpacity>
  );
};

export default ProductBox;
