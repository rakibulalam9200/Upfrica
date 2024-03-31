import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../Store/cart";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import { COLORS, FONTS } from "../constants/theme";

const CheckoutItem = ({
  //   onValueChange,
  data,
  //   removeItem
}) => {
  const { currency } = useSelector((state) => state.currency);
  const { colors } = useTheme();
  let { image, title, price, oldPrice, quantity=1, type, onPress, id } = data;
  // const { image, title, price, oldPrice, quantity, onPress, id } = data;
  const [ productQuantity, setProductQuantity] = useState(1);
  let directBuy = false;
  const dispatch = useDispatch();



 

  // if(!quantity){
  //   quantity = 1;
  //   useEffect(()=>{
  //     dispatch(addToCart(data))
  //   }, [ ])
  // }
  console.log(quantity, "...quantity...");

  const { width } = useWindowDimensions();
  const source = {
    html: `${type?.slice(0, 30)}`,
  };
  const removeHtmltags = (data) => {
    const regex = /(<([^>]+)>)/gi;
    const result = data?.replace(regex, "");
    return result;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingBottom: 12,
        paddingTop: 12,
        borderRadius:5,
        backgroundColor: colors.card,
        ...GlobalStyleSheet.shadow,
        
      }}
    >
      <Image
        style={{
          height: 90,
          width: 75,
          marginRight: 12,
        }}
        source={{ uri: image }}
      />
      <View style={{ flex: 1, paddingVertical: 7 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.font,
              ...FONTS.fontTitle,
              color: colors.title,
              marginBottom: 4,
            }}
          >
            {title}
          </Text>
          <Pressable onPress={() => dispatch(removeItem(id))}>
            <MaterialCommunityIcons
              size={20}
              color={"#850101 "}
              name="delete"
            />
          </Pressable>
        </View>

        <Text
          numberOfLines={1}
          style={{ ...FONTS.fontXs, color: colors.textLight }}
        >
          {removeHtmltags(type)}
        </Text>
        {/* <RenderHTML contentWidth={width} source={source} /> */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text style={{ ...FONTS.h6, color: COLORS.upfricaTitle }}>
              {currency.value}{price}
            </Text>
            <Text
              style={{
                ...FONTS.fontSm,
                color: colors.textLight,
                textDecorationLine: "line-through",
                marginLeft: 8,
              }}
            >
              {oldPrice}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              //   onPress={() => {
              //     itemQuantity > 1 && setItemQuantity(itemQuantity - 1);
              //     onValueChange(itemQuantity - 1);
              //   }}
              onPress={() => {
                dispatch(decrementQuantity(id));
              }}
              style={{
                height: 25,
                width: 25,
                borderWidth: 1,
                borderColor: colors.borderColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FeatherIcon size={14} color={colors.title} name="minus" />
              </TouchableOpacity>


            
            
            <Text
              style={{
                ...FONTS.fontSm,
                ...FONTS.fontBold,
                color: colors.title,
                width: 30,
                textAlign: "center",
              }}
            >
              {quantity}
            </Text>
            <TouchableOpacity
              //   onPress={() => {
              //     setItemQuantity(itemQuantity + 1);
              //     onValueChange(itemQuantity + 1);
              //   }}

              onPress={() => {
                dispatch(incrementQuantity(id));
              }}
              style={{
                height: 25,
                width: 25,
                borderWidth: 1,
                borderColor: colors.borderColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FeatherIcon size={14} color={colors.title} name="plus" />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{...FONTS.h6,marginRight:15}}>{price}</Text>
                    <Text style={{...FONTS.fontXs,textDecorationLine:'line-through'}}>{oldPrice}</Text>
                </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default CheckoutItem;
