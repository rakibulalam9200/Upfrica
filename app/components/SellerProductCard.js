import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/cart";
import { COLORS, FONTS } from "../constants/theme";
import DeleteConfirmationModal from "./Modal/DeleteModal";
// import { Button } from 'react-native-paper';

const SellerProductCard = ({
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
  refresh,
  setRefresh
}) => {
  const currency = useSelector((state) => state.currency.currency);
  const { token } = useSelector((state) => state.user);
  console.log(token, "token............");
  const navigation = useNavigation();
  const product = {};
  const { colors } = useTheme();
  const dispatch = useDispatch();
  // console.log(postage_fee, secondary_postage_fee);
  const productId = useRef();

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {}, [currency]);

  const onDelete = async () => {
    let deleteMethod = {
      method: "DELETE", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    };

    let url = `https://upfrica-staging.herokuapp.com/api/v1/products/${productId?.current}`;

    fetch(url, deleteMethod)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          Alert.alert(data?.message);
          setRefresh((pre) => !pre);
        }
      }) // Manipulate the data retrieved back, if we want to do something with it
      .catch((err) => console.log(err))
      .finally(() => {
        toggleModal();
      });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress && onPress()}
      style={[
        styles.productCard,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <DeleteConfirmationModal
        visibility={isModalVisible}
        setVisibility={setModalVisible}
        confirmationMessage={"Are you sure want to Delete?"}
        isDelete={true}
        onDelete={onDelete}
      />
      {/* <View style={{ flex: 1 , height:200}}>
          <Text>Are you sure you want to delete this item?</Text>

          <Button title="Delete" onPress={toggleModal} />
        </View>
      </Modal>  */}

      <View>
        <Image
          source={{ uri: image }}
          style={{
            width: 100,
            height: 100,
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
          {/* <FontAwesome 
                        size={16}
                        color={isLike ? "#F9427B" : COLORS.text}
                        name={isLike ? "heart" : "heart-o"}
                    /> */}
          <Text style={{ ...FONTS.h6, color: COLORS.upfricaTitle }}>
            {currency.value}
            {price}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            ...FONTS.fontSm,
            color: colors.text,
            marginBottom: 5,
          }}
        >
          {category}
        </Text>
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
        <View
          style={{
            flexDirection: "row",
            // alignItems:'center',
            justifyContent: "space-between",
            marginTop: 8,
            marginBottom: 2,
          }}
        >
          {/* <Text style={{...FONTS.h5,color:COLORS.upfricaTitle}}>{currency.value}{price}</Text> */}

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
              //   backgroundColor: COLORS.upfricaTitle,
              backgroundColor: "#8388a4",
              paddingHorizontal: 22,
              paddingVertical: 6,
              //   marginTop: 15,
              // marginHorizontal:20,
              marginRight: 0,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                ...FONTS.fontXs,
                color: COLORS.white,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // let tempData = {
              //   id: id,
              //   image: image,
              //   title: title,
              //   quantity: 1,
              //   price: price,
              //   type: description?.body,
              //   postage: postage_fee?.cents / 100,
              //   secondary_postage: secondary_postage_fee?.cents / 100,
              //   type: type,
              // };
              // dispatch(addToCart(tempData));
              //   navigation.navigate('DirectBuy', {id : id,image:image,title:title,price:price,isLike:isLike, type:description?.body, postage:postage_fee?.cents/100,secondary_postage:secondary_postage_fee?.cents/100})} }
              toggleModal();
              productId.current = id;
            }}
            style={{
              //   backgroundColor: COLORS.upfricaTitle,
              backgroundColor: "#ed5e68",
              paddingHorizontal: 15,
              paddingVertical: 6,
              //   marginTop: 15,
              marginHorizontal: 20,
              marginRight: 0,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                ...FONTS.fontXs,
                color: COLORS.white,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
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

export default SellerProductCard;
