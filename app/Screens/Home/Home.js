import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import DropDownPicker from "react-native-dropdown-picker";
import { IconButton } from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "../../../Store/currency";
import ProductBox from "../../components/ProductBox";
import ProductCard from "../../components/ProductCard";
import BannerSlider from "../../components/bannerSlider";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS, IMAGES } from "../../constants/theme";

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

const Home = ({ navigation }) => {
  const currency = useSelector(((state)=> state?.currency?.currency))
  const dispatch = useDispatch()
  const [productsData, setProductsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("$");
  const [items, setItems] = useState([
    { label: "USA", value: "$" },
    { label: "UK", value: "£" },
    { label: "Nigeria", value: "₦" },
    { label: "Gana", value: "GH₵" },

  ]);

  function productList() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProductsData(data);
        // productsData.push(data); // Assuming the API returns an array of products
        // console.log(productsData);r
        setPopularProducts(data.slice(0, 4));
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

  useEffect(() => {

  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <DropShadow
          style={[
            {
              shadowColor: COLORS.secondary,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              zIndex: 1,
            },
            Platform.OS === "ios" && {
              backgroundColor: colors.card,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.card,
              justifyContent: "space-between",
              height: 48,
              alignItems: "center",
            }}
          >
            <View></View>
            {/* <IconButton
                            icon={() => <Image style={{height:26,width:26,tintColor:colors.title}} source={IMAGES.menu}/>}
                            onPress={() => navigation.openDrawer()}
                        /> */}
            <Image
              style={{
                height: 26,
                width: 110,
                resizeMode: "contain",
              }}
              source={theme.dark ? IMAGES.logoWhite : IMAGES.logo}
            />
            <IconButton
              icon={(props) => <FeatherIcon name="search" {...props} />}
              size={20}
              iconColor="#a435f0"
              onPress={() => navigation.navigate("Search")}
            />
          </View>
        </DropShadow>
        <View
          style={{
            zIndex: 1000,
            flexDirection: "row",
            paddingHorizontal: 16,
            alignItems: "center",
            backgroundColor:"#0D99FF"
          }}
        >
        <SimpleLineIcons name="location-pin" size={20} />
          <Text
            style={{
              ...FONTS.h5,
              color: colors.title,
              marginHorizontal:8,
            }}
          >
            Deliver to
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            defaultValue={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={{
              zIndex: 1001,
              flex: 1,
              backgroundColor: "#0D99FF",
              
            }}
            style={{ backgroundColor: "#0D99FF",borderWidth:0,width:120 }}
            onSelectItem={(item) => {
              dispatch(changeCurrency(item))
            }}
            dropDownContainerStyle={{
                backgroundColor:"#0D99FF",
                width:120
            }}
          />
        </View>

        <ScrollView style={{ flex: 1 }}>
          <BannerSlider productsData={productsData} />

          <View
            style={{
              backgroundColor: colors.card,
              paddingVertical: 12,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 15,
              }}
            >
              {filterTabs.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveTab(data)}
                    style={[
                      {
                        backgroundColor: colors.background,
                        paddingHorizontal: 20,
                        marginRight: 10,
                        paddingVertical: 8,
                      },
                      activeTab === data && {
                        backgroundColor: COLORS.upfricaBackgroundColor
                          ? COLORS.upfricaBackgroundColor
                          : COLORS.upfricaBackgroundColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          ...FONTS.font,
                          fontSize: 15,
                          color: colors.title,
                        },
                        activeTab === data && {
                          color: COLORS.white,
                        },
                      ]}
                    >
                      {data}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={GlobalStyleSheet.container}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  ...FONTS.h5,
                  color: colors.title,
                  flex: 1,
                }}
              >
                Most Popular
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Items", { tradingProducts })
                }
              >
                <Text style={{ ...FONTS.font, color: COLORS.upfricaTitle }}>
                  See more
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[GlobalStyleSheet.container, { paddingTop: 0 }]}>
            <View style={GlobalStyleSheet.row}>
              {porpularProducts.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={[GlobalStyleSheet.col50, { marginBottom: 15 }]}
                  >
                    {/* <ProductCard
                                            onPress={() => navigation.navigate('ProductDetail')}
                                            id={data.id}
                                            image={data.image}
                                            category={data.category}
                                            title={data.title}
                                            price={data.price}
                                            oldPrice={data.oldPrice}
                                            offer={data.offer}
                                            isLike={data.isLike}
                                            handleLike={handleLike}
                                        /> */}
                    <ProductCard
                      onPress={() =>
                        navigation.navigate("ProductDetail", { data })
                      }
                      id={data.id}
                      image={data?.product_images[0]}
                      category={data?.category ? data?.category : ""}
                      title={data.title}
                      price={data.sale_price.cents / 100}
                      oldPrice={
                        data?.oldPrice
                          ? data?.oldPrice
                          : data.sale_price.cents / 100 + 5
                      }
                      offer={data.offer ? "Deal" : "Deal"}
                      isLike={data?.isLike ? data.isLike : false}
                      handleLike={handleLike}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <View style={[GlobalStyleSheet.container, { paddingTop: 0 }]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  ...FONTS.h5,
                  color: colors.title,
                  flex: 1,
                }}
              >
                Trending Now
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Items")}>
                <Text style={{ ...FONTS.font, color: COLORS.upfricaTitle }}>
                  See more
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              paddingBottom: 50,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 15,
              }}
            >
              {tradingProducts.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 150,
                      marginRight: 15,
                    }}
                  >
                    <ProductBox
                      onPress={() =>
                        navigation.navigate("ProductDetail", { data })
                      }
                      id={data.id}
                      image={data?.product_images[0]}
                      category={data?.category ? data?.category : ""}
                      title={data.title}
                      price={data.sale_price.cents / 100}
                      rating={
                        data?.rating
                          ? data?.rating
                          : Math.floor(Math.random() * (5 - 3 + 3)) + 2
                      }
                      review={
                        data?.review
                          ? data?.review
                          : Math.floor(Math.random() * (500 - 300 + 300)) + 1
                      }
                      isLike={data?.isLike ? false : false}
                      handleLike={handleLike2}
                    />
                    {/* {
                                        id : "1",
                                        image : IMAGES.tradingProduct1,
                                        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
                                        price : "$25.15",
                                        isLike : false,
                                        rating : "4.5",
                                        review : "2547",
                                      } */}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
