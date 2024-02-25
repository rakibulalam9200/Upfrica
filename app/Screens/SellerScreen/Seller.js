import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SellerProductCard from "../../components/SellerProductCard";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS } from "../../constants/theme";
import Header from "../../layout/Header";

const filterTabs = ["All", "Popular", "Trending", "Shops", "Deal"];

// const productsData = [
//     {
//         id : "1",
//         image : IMAGES.popularProduct1,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         category : "T-Shirt",
//         price : "$25.15",
//         oldPrice : "$30.15",
//         offer : "32% off",
//         isLike : false,
//     },
//     {
//         id : "2",
//         image : IMAGES.popularProduct2,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         category : "Jackets",
//         price : "$18.50",
//         oldPrice : "$25.18",
//         offer : "sale",
//         isLike : false,
//     },
//     {
//         id : "3",
//         image : IMAGES.popularProduct3,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         category : "Jackets",
//         price : "$32.12",
//         oldPrice : "$48.00",
//         offer : "32% off",
//         isLike : false,
//     },
//     {
//         id : "4",
//         image : IMAGES.popularProduct4,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         category : "T-Shirt",
//         price : "$28.38",
//         oldPrice : "$42.00",
//         offer : "32% off",
//         isLike : false,
//     },
//     {
//         id : "5",
//         image : IMAGES.popularProduct1,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         category : "T-Shirt",
//         price : "$25.15",
//         oldPrice : "$30.15",
//         offer : "32% off",
//         isLike : false,
//     },
//     {
//         id : "6",
//         image : IMAGES.popularProduct2,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         category : "Jackets",
//         price : "$18.50",
//         oldPrice : "$25.18",
//         offer : "sale",
//         isLike : false,
//     },
// ]
// Assuming you have a JavaScript environment with support for the Fetch API
const apiUrl = "https://upfrica-staging.herokuapp.com/api/v1/products";
// const productsData = [];

const tradingData = [];

// const tradingData = [
//     {
//         id : "1",
//         image : IMAGES.tradingProduct1,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         price : "$25.15",
//         isLike : false,
//         rating : "4.5",
//         review : "2547",
//     },
//     {
//         id : "2",
//         image : IMAGES.tradingProduct2,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         price : "$25.15",
//         isLike : false,
//         rating : "4.5",
//         review : "2547",
//     },
//     {
//         id : "3",
//         image : IMAGES.tradingProduct1,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         price : "$25.15",
//         isLike : false,
//         rating : "4.5",
//         review : "2547",
//     },
//     {
//         id : "4",
//         image : IMAGES.tradingProduct2,
//         title : "Men Black Grey Allover Printed Round Neck T-Shirt",
//         price : "$25.15",
//         isLike : false,
//         rating : "4.5",
//         review : "2547",
//     },
// ]

const Seller = ({ navigation }) => {
  const currency = useSelector((state) => state?.currency?.currency);
  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("GH₵");
  const [items, setItems] = useState([
    { label: "Gana", value: "GH₵" },
    // { label: "USA", value: "$" },
    { label: "UK", value: "£" },
    // { label: "Nigeria", value: "₦" },
  ]);

  function productList() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // data = []
        setLoading(false);
        setProductsData(data);
        // productsData.push(data); // Assuming the API returns an array of products
        // console.log(productsData);r
        setPopularProducts(data);
        let tempData = data.reverse();

        setTradingProducts(data.reverse()); // This will contain the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    productList();
  }, []);

  const theme = useTheme();
  const { colors } = theme;

  const [activeTab, setActiveTab] = useState(filterTabs[1]);
  const [porpularProducts, setPopularProducts] = useState([]);

  const [tradingProducts, setTradingProducts] = useState(tradingData);

  const handleLike = (id) => {
    let temp = porpularProducts.map((data, index) => {
      if (id === data.id) {
        return { ...data, isLike: !data.isLike };
      }
      return data;
    });
    setPopularProducts(temp);
  };
  const handleLike2 = (id) => {
    let temp = tradingProducts.map((data, index) => {
      if (id === data.id) {
        return { ...data, isLike: !data.isLike };
      }
      return data;
    });
    setTradingProducts(temp);
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <Header titleLeft leftIcon={"back"} title={"Seller"} rightIcon={"plus"}/>

      {/* Trending Product list  */}
      <View style={[GlobalStyleSheet.container, { paddingTop: 20 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 20,
          }}
        >
          <Text
            style={{
              ...FONTS.h5,
              color: colors.title,
              flex: 1,
            }}
          >
            Your Recent Products
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Items")}>
            <Text style={{ ...FONTS.font, color: COLORS.upfricaTitle }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <View
          style={{
            height: 200,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#a435f0" />
        </View>
      )}

      <ScrollView style={[GlobalStyleSheet.container, { paddingTop: 0 }]}>
        <View style={GlobalStyleSheet.row}>
          {porpularProducts.map((data, index) => {
            return (
              <View
                key={index}
                style={[GlobalStyleSheet.col50, { marginBottom: 15 }]}
              >
                <SellerProductCard
                  onPress={() => navigation.navigate("ProductDetail", { data })}
                  id={data.id}
                  image={data?.product_images ? data?.product_images[0]:'https://www.upfrica.com/assets/upfrica-com-logo-dark_170x-94d438d62a4c6b2c2c70fe1084c008f4584357ed2847dac5fc38818a0de6459d.webp'}

                  category={data?.category ? data?.category : ""}
                  title={data.title}
                  price={data.sale_price.cents / 100}
                  oldPrice={
                    data?.oldPrice
                      ? data?.oldPrice
                      : data.sale_price.cents / 100 + 5
                  }
                  offer={data.id ? `id: ${data.id}` : "Deal"}
                  isLike={data?.isLike ? data.isLike : false}
                  handleLike={handleLike}
                  postage_fee={data?.postage_fee}
                  secondary_postage_fee={data?.secondary_postage_fee}
                  type={data?.description?.body}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Seller;
