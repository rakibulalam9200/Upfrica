import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Snackbar } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Store/cart";
import CustomButton from "../../components/CustomButton";
import { COLORS, FONTS } from "../../constants/theme";
import Header from "../../layout/Header";
// import { useSelector } from "react-redux";


const productImg1 = require("../../assets/images/product/detail/pic1.png");
const productImg2 = require("../../assets/images/product/detail/pic2.png");
const productImg3 = require("../../assets/images/product/detail/pic3.png");
const productImg4 = require("../../assets/images/product/detail/pic4.png");
const productSmImg1 = require("../../assets/images/product/detail/small/pic1.png");
const productSmImg2 = require("../../assets/images/product/detail/small/pic2.png");
const productSmImg3 = require("../../assets/images/product/detail/small/pic3.png");
const productSmImg4 = require("../../assets/images/product/detail/small/pic4.png");

// const ProductImages = [
//     {
//         id : "1",
//         image : productImg1,
//         smallImage : productSmImg1,
//     },
//     {
//         id : "1",
//         image : productImg2,
//         smallImage : productSmImg2,
//     },
//     {
//         id : "1",
//         image : productImg3,
//         smallImage : productSmImg3,
//     },
//     {
//         id : "1",
//         image : productImg4,
//         smallImage : productSmImg4,
//     },
// ]

const ProductDetail = ({ route, navigation }) => {
  const currency = useSelector(((state)=> state?.currency?.currency))
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const [ProductImages, setImages] = useState([]);
  const { token, user } = useSelector((state) => state.user);


  const { data } = route.params;
  console.log(data?.description?.body);
  useEffect(() => {
    setDetails(data);
    // setImages(data.product_images)
    let images = data.product_images.map((item) => {
      return { id: 1, image: item, smallImage: item };
    });
    setImages(images);
  }, []);

  const { colors } = useTheme();

  const productColors = [
    COLORS.primary,
    COLORS.secondary,
    "#8E84CA",
    "#E5907D",
  ];
  const productSizes = ["S", "M", "L", "XL"];

  const [isLike, setIsLike] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState("Loading...");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [activeColor, setActiveColor] = useState(productColors[0]);
  const [activeSize, setActiveSize] = useState(productSizes[0]);

  const handleLike = () => {
    if (isLike) {
      setSnackText("Item removed to Favourite.");
    } else {
      setSnackText("Item add to Favourite.");
    }
    setIsSnackbar(true);
    setIsLike(!isLike);
  };

  const formattedDescription = (description) => {
    let str = description?.toString();
    let removeTag = str.replace(/(<([^>]+)>)/gi, "");
    return removeTag;
  };

  const source = {
    html: `${data?.description?.body}`,
  };

  const Cart = () =>{
    console.log("cart clicked!!!")
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    // var raw = "{\n    \"cart\": {}\n}";

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch("https://upfrica-staging.herokuapp.com/api/v1/carts", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://upfrica-staging.herokuapp.com/api/v1/carts?page=1", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result[0]?.cart_items[0]))
      .catch(error => console.log('error', error));
      }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <Header
        leftIcon={"back"}
        title={"Product Details"}
        rightIcon={"wishlist"}
        handleLike={handleLike}
        isLike={isLike}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <ScrollView>
          <View>
            <Image
              // source={ProductImages[currentSlide].image}
              source={{ uri: ProductImages[currentSlide]?.image }}
              style={{
                width: "100%",
                height: undefined,
                aspectRatio: 1 / 1,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 20,
                left: 20,
              }}
            >
              {ProductImages.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setCurrentSlide(index)}
                    key={index}
                    style={[
                      {
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor: COLORS.white,
                        borderColor: "gray",
                        // backgroundColor:COLORS.white,
                        backgroundColor: "whitesmoke",
                      },
                      currentSlide === index && {
                        borderColor: COLORS.upfricaTitle,
                        borderWidth: 3,
                      },
                    ]}
                  >
                    <Image
                      style={[
                        {
                          height: 45,
                          width: 45,
                        },
                        currentSlide === index && {
                          opacity: 0.7,
                        },
                      ]}
                      source={{ uri: data?.smallImage }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            backgroundColor: colors.card,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{ ...FONTS.font, color: colors.textLight, marginBottom: 5 }}
          >
            Product Name
          </Text>
          <Text
            style={{
              ...FONTS.h5,
              ...FONTS.fontTitle,
              color: colors.title,
              marginBottom: 12,
              lineHeight: 26,
            }}
          >
            {details?.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.upfricaTitle,
                flex: 1,
              }}
            >
              {currency.value}{details?.sale_price?.cents / 100}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                style={{ marginRight: 4 }}
                size={14}
                color={"#F28D30"}
                name="star"
              />
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontTitle,
                  color: colors.textLight,
                }}
              >
                <Text style={{ color: colors.title }}>4.5</Text> (2.6k review)
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 0,
            }}
          >
            <Text
              style={{
                ...FONTS.font,
                ...FONTS.fontTitle,
                color: "black",
                marginRight: 25,
              }}
            >
              {" "}
              Postage Fee:
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ color: COLORS.upfricaTitle }}>
              {currency.value}{details?.postage_fee?.cents / 100}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                ...FONTS.font,
                ...FONTS.fontTitle,
                color: "black",
                marginRight: 25,
              }}
            >
              SecondaryPostage Fee:
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ color: COLORS.upfricaTitle }}>
              {currency.value}{details?.secondary_postage_fee?.cents / 100}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                ...FONTS.h6,
                ...FONTS.fontTitle,
                color: colors.title,
                marginRight: 25,
              }}
            >
              Size:
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {productSizes.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActiveSize(data)}
                    key={index}
                    style={[
                      {
                        height: 30,
                        width: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: colors.borderColor,
                        marginHorizontal: 4,
                      },
                      activeSize === data && {
                        backgroundColor: COLORS.secondary,
                        borderColor: COLORS.secondary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          ...FONTS.font,
                          ...FONTS.fontTitle,
                          color: colors.title,
                        },
                        activeSize === data && { color: COLORS.white },
                      ]}
                    >
                      {data}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                ...FONTS.h6,
                ...FONTS.fontTitle,
                color: colors.title,
                marginRight: 15,
              }}
            >
              Color:
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {productColors.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActiveColor(data)}
                    key={index}
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                      marginLeft: 4,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {activeColor === data && (
                      <View
                        style={{
                          height: 24,
                          width: 24,
                          borderRadius: 24,
                          borderWidth: 2,
                          borderColor: COLORS.primary,
                          position: "absolute",
                        }}
                      />
                    )}
                    <View
                      style={{
                        height: 16,
                        width: 16,
                        borderRadius: 16,
                        backgroundColor: data,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View
            style={{
              paddingTop: 20,
              borderTopWidth: 1,
              borderColor: colors.borderColor,
            }}
          >
            <Text
              style={{
                ...FONTS.h6,
                ...FONTS.fontTitle,
                color: colors.title,
                marginBottom: 5,
              }}
            >
              Description:
            </Text>

            <RenderHTML contentWidth={width} source={source} />

            {/* <Text style={{...FONTS.font,color:colors.text}}>{details?.description?.body}</Text> */}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: colors.borderColor,
          backgroundColor: colors.card,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{ ...FONTS.font, color: colors.textLight, marginBottom: 2 }}
          >
            Price
          </Text>
          <Text
            style={{ ...FONTS.h3, lineHeight: 30, color: COLORS.upfricaTitle }}
          >
            {currency.value}
            {details?.sale_price?.cents / 100 +
              details?.postage_fee?.cents / 100 +
              details?.secondary_postage_fee?.cents / 100}
          </Text>
        </View>
        <CustomButton
          onPress={() => {
           
           let tempData =  {id:data.id,image:data?.product_images[0],title:data?.title,quantity:1, price:data?.sale_price?.cents/100,type:data?.description?.body,postage:data?.postage_fee?.cents/100,secondary_postage:data?.secondary_postage_fee?.cents/100} 
            dispatch(addToCart(tempData));
            navigation.navigate("Cart", { data });
          }}
          color={COLORS.upfricaTitle}
          title="Add Cart"
          style={{
            paddingHorizontal: 40,
          }}
        />
        {/* <CustomButton
          onPress={() => {
            // console.log("Add cart clicked...");
            // console.log("======", data);
           let tempData =  {id:data.id,image:data?.product_images[0],title:data?.title,quantity:1, price:data?.sale_price?.cents/100,type:data?.description?.body,postage:data?.postage_fee?.cents/100,secondary_postage:data?.secondary_postage_fee?.cents/100} 
            dispatch(addToCart(tempData));
            navigation.navigate("Cart", { data });
            Cart()
          }}
          color={COLORS.upfricaTitle}
          title="Add Cart"
          style={{
            paddingHorizontal: 40,
          }}
        /> */}
      </View>
      <Snackbar
        visible={isSnackbar}
        duration={3000}
        onDismiss={() => setIsSnackbar(false)}
        action={{
          label: "Wishlist",
          onPress: () => {
            navigation.navigate("Wishlist");
          },
        }}
      >
        {snackText}
      </Snackbar>
    </SafeAreaView>
  );
};

export default ProductDetail;
