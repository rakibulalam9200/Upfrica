import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Avatar, Card, Divider } from "react-native-paper";
import Header from "../../layout/Header";
// import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

const CategoryData = [
  {
    image: require("../../assets/images/category/pic1.png"),
    category: "Men T-Shirts",
    items: "240",
  },
  {
    image: require("../../assets/images/category/pic2.png"),
    category: "Jackets",
    items: "180",
  },
  {
    image: require("../../assets/images/category/pic3.png"),
    category: "Shoes",
    items: "106",
  },
  {
    image: require("../../assets/images/category/pic4.png"),
    category: "Sunglasses",
    items: "95",
  },
  {
    image: require("../../assets/images/category/pic5.png"),
    category: "Winter",
    items: "150",
  },
];

const apiUrl = "https://upfrica-staging.herokuapp.com/api/v1/categories";

const Categories = ({ navigation }) => {
  const [categoriesData, setCategoriesData] = useState([]);

  function fetchedCategoriesList() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data.......");
        setCategoriesData(data?.categories); // This will contain the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchedCategoriesList();
  }, []);

  const { colors } = useTheme();

  const CategoryCard = ({ item }) => {
    return (
      <View>
        <Card.Title
          title={item?.name}
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} />}
        />
        <Divider />
      </View>
    );
  };

  return (
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
        <Header
          backAction={() => navigation.navigate("Home")}
          titleLeft
          title={"All Categories"}
          rightIcon2={"search"}
          leftIcon={"back"}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={categoriesData}
          renderItem={({ item }) => <CategoryCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={
            {
              // flex: 1,
            }
          }
        />
        {/* <ScrollView>
          <View style={GlobalStyleSheet.container}>
            {CategoryData.map((data, index) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Items")}
                  key={index}
                  style={{
                    marginBottom: 15,
                    backgroundColor: colors.card,
                    ...GlobalStyleSheet.shadow,
                  }}
                >
                  <Image
                    source={data.image}
                    style={{
                      width: "100%",
                      height: undefined,
                      aspectRatio: 2.2 / 1,
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      height: "100%",
                      bottom: 0,
                      left: 0,
                      paddingHorizontal: 20,
                      paddingVertical: 25,
                      alignItems: "flex-start",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ ...FONTS.h3, color: COLORS.title }}>
                        {data.category}
                      </Text>
                      <Text style={{ ...FONTS.font }}>{data.items} Items</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Items")}
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        backgroundColor: COLORS.upfricaTitle,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.font,
                          ...FONTS.fontTitle,
                          color: COLORS.white,
                        }}
                      >
                        Shop Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default Categories;
