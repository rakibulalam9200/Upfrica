import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/cart";
import { COLORS, FONTS } from "../constants/theme";

const ProductCard = ({
  onPress,
  id,
  image,
  category,
  title,
  price,
  oldPrice,
  isLike,
  offer,
  handleLike,
  description,
  postage_fee,
  secondary_postage_fee,
  type,
  containerStyle,
}) => {
  const currency = useSelector((state) => state.currency.currency);
  const navigation = useNavigation();
  const product = {};
  const { colors } = useTheme();
  const dispatch = useDispatch();
  console.log(postage_fee, secondary_postage_fee);

  useEffect(() => {}, [currency]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress()}
      style={[
        styles.productCard,
        {
          backgroundColor: colors.card,
        },
        containerStyle,
      ]}
    >
      <View style={{  }}>
        <View>
          <Image
            source={{ uri: image }}
            style={{
              width: '100%',
              height: 180,
              resizeMode:'stretch'
            }}
          />
          <View
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                paddingHorizontal: 8,
                paddingVertical: 2,
                backgroundColor: COLORS.secondary,
              },
              offer === "sale" && {
                backgroundColor: COLORS.primary,
              },
            ]}
          >
            <Text
              style={[
                { ...FONTS.fontXs, color: COLORS.white },
                offer === "sale" && { textTransform: "uppercase" },
              ]}
            >
              {offer}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleLike(id)}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: 5,
            }}
          >
            <FontAwesome
              size={16}
              color={isLike ? "#F9427B" : COLORS.text}
              name={isLike ? "heart" : "heart-o"}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {category && (
            <Text
              style={{
                ...FONTS.fontSm,
                color: colors.text,
                marginBottom: 5,
              }}
            >
              {category}
            </Text>
          )}
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.h6,
              ...FONTS.fontTitle,
              color: colors.title,
              fontSize: 14,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          // alignItems:'center',
          justifyContent: "space-between",
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <Text style={{ ...FONTS.h5, color: COLORS.upfricaTitle }}>
          {currency.value}
          {price}
        </Text>
        {/* <Text style={{
                        ...FONTS.font,
                        color:colors.textLight,
                        textDecorationLine:'line-through',
                        marginLeft:6,
                        opacity:.7,
                    }}>{currency.value}{oldPrice}</Text>
                     */}

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

const styles = StyleSheet.create({
  productCard: {
    shadowColor: "rgba(0,0,0,.2)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default ProductCard;
