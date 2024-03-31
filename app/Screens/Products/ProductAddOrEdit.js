import { baseURL } from "@env";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS } from "../../constants/theme";
import Header from "../../layout/Header";

const ProductAddorEdit = (props) => {
  const theme = useTheme();
  const { colors } = theme;
  const { token, user } = useSelector((state) => state?.user);
  console.log(user?.id, "-------user-------");
  const apiUrl = "https://upfrica-staging.herokuapp.com/api/v1/categories";
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState(-1);
  const [description, setDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [salesPrice, setSalesPrice] = useState(0);
  const [allcurrency, setAllCurrency] = useState([
    { label: "USD", value: "USD" },
    { label: "GHS", value: "GHS" },
    { label: "EURO", value: "EURO" },
  ]);
  const [currency, setCurrency] = useState("USD");
  const [postAgeFee, setPostAgeFee] = useState(0);
  const [sndPostAgeFee, setSndPostAgeFee] = useState(0);

  function fetchedCategoriesList() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data.......");
        let categories = [];
        data &&
          data?.map((category, index) => {
            categories.push({ label: category?.name, value: category?.id });
          });
        setCategoriesData(categories); // This will contain the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const saveOrEditProduct = async () => {
    console.log(categoryId, "category ID");
    setIsLoading(true);
    let product = {
      title: title,
      slug: slug,
      user_id: user?.id,
      condition_id: 1,
      category_id: categoryId,
      description: description,
      product_quantity: productQuantity,
      price_cents: price,
      sale_price_cents: salesPrice,
      postage_fee_cents: postAgeFee,
      secondary_postage_fee_cents: sndPostAgeFee,
      price_currency: currency,
    };

    let body = { product };

    console.log(body, "body...");

    const headers = {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`, 
    };

    try {
      let response = await axios.post(`${baseURL}/products`, body, {
        headers: headers,
      });
      if (response) {
        console.log(response?.message,response?.product,"----------", "response....");
        props.navigation.navigate("Seller");
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.error);
      console.log(error?.response?.data, "errror...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchedCategoriesList();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header titleLeft leftIcon={"back"} title={"Product Create"} />
      <ScrollView style={{ paddingHorizontal: 16, marginVertical: 20 }}>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Title
          </Text>
          <TextInput
            multiline
            style={[
              GlobalStyleSheet.formControl2,
              {
                backgroundColor: colors.input,
                color: colors.title,
                borderColor: "#a435f0",
                borderRadius: 5,
                textAlignVertical: "top",
              },
            ]}
            value={title}
            onChangeText={(text) => setTitle(text)}
            //   onFocus={() => setisFocused(true)}
            //   onBlur={() => setisFocused(false)}
            placeholder="Product Title"
            placeholderTextColor={colors.textLight}
          />
          {/* {errorMessages?.firstName !== '' ? <Text style={{color:'red'}}>{errorMessages?.firstName}</Text>:<></>} */}
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Slug
          </Text>
          <TextInput
            style={[
              GlobalStyleSheet.formControl,
              {
                backgroundColor: colors.input,
                color: colors.title,
                borderColor: "#a435f0",
                borderRadius: 5,
              },
            ]}
            value={slug}
            onChangeText={(text) => setSlug(text)}
            //   onFocus={() => setisFocused(true)}
            //   onBlur={() => setisFocused(false)}
            placeholder="Product Slug"
            placeholderTextColor={colors.textLight}
          />
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Description
          </Text>
          <TextInput
            multiline
            style={[
              GlobalStyleSheet.formControl3,
              {
                backgroundColor: colors.input,
                color: colors.title,
                borderColor: "#a435f0",
                borderRadius: 5,
                textAlignVertical: "top",
              },
            ]}
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Proudct Description"
            placeholderTextColor={colors.textLight}
          />
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Select Category
          </Text>
          {/* <ScrollView
            contentContainerStyle={{ flex: 1, width: "100%" }}
            horizontal
          > */}
          <RNPickerSelect
            onValueChange={(value) => setCategoryId(value)}
            items={categoriesData}
          />
          {/* </ScrollView> */}
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Quantity
          </Text>
          <TextInput
            keyboardType="numeric"
            style={[
              GlobalStyleSheet.formControl,
              {
                backgroundColor: colors.input,
                color: colors.title,
                borderColor: "#a435f0",
                borderRadius: 5,
              },
            ]}
            value={productQuantity}
            onChangeText={(text) => setProductQuantity(text)}
            //   onFocus={() => setisFocused(true)}
            //   onBlur={() => setisFocused(false)}
            placeholder="Product Quantity"
            placeholderTextColor={colors.textLight}
          />
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Price
          </Text>
          <TextInput
            keyboardType="numeric"
            style={[
              GlobalStyleSheet.formControl,
              {
                backgroundColor: colors.input,
                color: colors.title,
                borderColor: "#a435f0",
                borderRadius: 5,
              },
            ]}
            value={price}
            onChangeText={(text) => setPrice(text)}
            //   onFocus={() => setisFocused(true)}
            //   onBlur={() => setisFocused(false)}
            placeholder="Price"
            placeholderTextColor={colors.textLight}
          />
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Sales Price
          </Text>
          <TextInput
            keyboardType="numeric"
            style={[
              GlobalStyleSheet.formControl,
              {
                backgroundColor: colors.input,
                color: colors.title,
                borderColor: "#a435f0",
                borderRadius: 5,
              },
            ]}
            value={salesPrice}
            onChangeText={(text) => setSalesPrice(text)}
            //   onFocus={() => setisFocused(true)}
            //   onBlur={() => setisFocused(false)}
            placeholder="Sales Price"
            placeholderTextColor={colors.textLight}
          />
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Postage Fee
          </Text>
          <TextInput
            keyboardType="numeric"
            style={[
              GlobalStyleSheet.formControl,
              {
                backgroundColor: colors.input,
                color: colors.title,
                borderColor: "#a435f0",
                borderRadius: 5,
              },
            ]}
            value={postAgeFee}
            onChangeText={(text) => setPostAgeFee(text)}
            //   onFocus={() => setisFocused(true)}
            //   onBlur={() => setisFocused(false)}
            placeholder="Sales Price"
            placeholderTextColor={colors.textLight}
          />
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Secondary Postage Fee
          </Text>
          <TextInput
            keyboardType="numeric"
            style={[
              GlobalStyleSheet.formControl,
              {
                backgroundColor: colors.input,
                color: colors.title,
                borderColor: "#a435f0",
                borderRadius: 5,
              },
            ]}
            value={sndPostAgeFee}
            onChangeText={(text) => setSndPostAgeFee(text)}
            //   onFocus={() => setisFocused(true)}
            //   onBlur={() => setisFocused(false)}
            placeholder="Sales Price"
            placeholderTextColor={colors.textLight}
          />
        </View>
        <View style={GlobalStyleSheet.inputGroup}>
          <Text style={[GlobalStyleSheet.label, { color: colors.title }]}>
            Select Currency
          </Text>
          <RNPickerSelect
            onValueChange={(value) => setCurrency(value)}
            items={allcurrency}
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <CustomButton
          onPress={saveOrEditProduct}
          color={COLORS.upfricaTitle}
          title="Save Product"
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductAddorEdit;
