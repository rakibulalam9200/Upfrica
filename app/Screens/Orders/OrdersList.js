import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "@env";
import axios from "axios";
import { Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DeleteModal from "../../components/Modal/DeleteModal";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { FONTS } from "../../constants/theme";
import Header from "../../layout/Header";

const OrdersList = () => {
  const currency = useSelector((state) => state.currency.currency);
  const { token, user } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const product = {};
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState({});
  const [dataLoader, setDataLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const orderInfo = useRef(null);

  useEffect(() => { }, [currency]);

  const getOrders = () => {
    try {
      setDataLoader(true);
      axios
        .get(`${baseURL}/orders`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          //  console.log('response.......',response)
          if (response?.status === 200) {
            console.log("data response......0 index", response.data[0]);
            setOrders(response?.data?.orders);
            setDataLoader(false);
          }
        })
        .catch((error) => console.log(error.response));
    } catch (error) {
      console.log(error);
      setDataLoader(false);
    } finally {
    }
  };

  const cancelandDeleteOrder = async () => {
    console.log(
      orderInfo.current.id,
      "orderID...........",
      orderInfo.current.buyer.id
    );
    console.log(
      `${baseURL}/orders/${orderInfo?.current?.id}`,
      "orderID........."
    );

    let body = {
      order_cancellation_request: {
        order_id: orderInfo.current.id,
        creator_id: orderInfo.current.buyer.id,
        seller_id: 1,
        reason_by_buyer: "wrong item",
      },
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };

    fetch(`${baseURL}/order_cancellation_requests`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result, 'result.................')
        if (result) {

          console.log(result, 'result..........')
          setRefresh((pre) => !pre);
          setIsModalVisible(false);

        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getOrders();
  }, [refresh]);

  const OrderCard = ({ order }) => {
    return (
      <View
        style={{
          marginVertical: 12,
          paddingHorizontal: 12,
          marginHorizontal: 12,
          paddingBottom: 12,
          paddingTop: 12,
          borderRadius: 5,
          backgroundColor: colors.card,
          ...GlobalStyleSheet.shadow,
        }}
      >
        <View
          activeOpacity={0.9}
          //   onPress={onPress}
          style={{
            flexDirection: "row",
          }}
        >
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
                ...FONTS.h5,
                color: colors.primary,
                marginBottom: 4,
              }}
            >
              {/* {order?.buyer?.first_name + " " + order?.buyer?.last_name} */}
              {`Order Id: ${order?.id}`}

            </Text>
            <Pressable
              onPress={() => {
                orderInfo.current = order;
                setIsModalVisible(true);
              }}
            >
              <MaterialCommunityIcons
                size={20}
                color={"#850101 "}
                name="delete"
              />
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 7 }}>
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.font,
                ...FONTS.h6,
                color: colors.secondary,
                marginBottom: 4,
              }}>
              Name: {order?.cart_items?.[0]?.product?.description?.name}

            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.font,
                ...FONTS.h6,
                color: colors.secondary,
                marginBottom: 4,
              }}
            >
              {`Quantity: ${order?.order_quantity}`}
            </Text>
            <View
              activeOpacity={0.9}
              //   onPress={onPress}
              style={{
                flexDirection: "row",
              }}
            >
              {/* <View
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
              {order?.buyer?.email}
            </Text>
          </View> */}
            </View>
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.font,
                ...FONTS.fontRegular,
                color: colors.secondary,
                marginBottom: 4,
              }}
            >
              {/* {`Address:  ${order?.address?.address_data?.address_line_1}, ${order?.address?.address_data?.postcode}, ${order?.address?.address_data?.town}, ${order?.address?.address_data?.country}`} */}
              {order?.cart_items?.[0]?.product?.description?.body}

            </Text>

            <View
              activeOpacity={0.9}
            //   onPress={onPress}
            // style={{
            //   flexDirection: "row",
            // }}
            >
              {/* <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              > */}
              <Text
                numberOfLines={1}
                style={{
                  ...FONTS.font,
                  ...FONTS.h6,
                  color: colors.secondary,
                  marginBottom: 4,
                }}
              >
                {`Total: ${(order?.cart_items?.[0]?.product?.price?.cents) / 100} ${order?.buyer?.currency}`}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...FONTS.font,
                  ...FONTS.h6,
                  color: colors.primary,
                  marginBottom: 4,
                }}
              >
                {`Status: ${order?.status}`}
              </Text>
              {/* </View> */}
            </View>
          </View>
          <View style={{ flex: 4, padding: 5 }}>
            <Image
              source={{ uri: order?.cart_items?.[0]?.product?.product_images[0] }}
              style={{
                width: 120,
                height: 120,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <Header titleLeft leftIcon={"back"} title={"Orders"} />
      <DeleteModal
        visibility={isModalVisible}
        setVisibility={setIsModalVisible}
        onDelete={cancelandDeleteOrder}
      />
      {dataLoader && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#a435f0" />
        </View>
      )}

      {!dataLoader && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={orders}
            renderItem={({ item, index }) => <OrderCard order={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </SafeAreaView>
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

export default OrdersList;
