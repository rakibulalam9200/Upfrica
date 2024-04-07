import { baseURL } from "@env";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DocumentPicker, { types } from "react-native-document-picker";
import RNPickerSelect from "react-native-picker-select";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import DeleteConfirmationModal from "../../components/Modal/DeleteModal";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS } from "../../constants/theme";
import Header from "../../layout/Header";

const ProductAddorEdit = ({ navigation, route }) => {
  const theme = useTheme();
  const { colors } = theme;
  const { token, user } = useSelector((state) => state?.user);
  const apiUrl = "https://upfrica-staging.herokuapp.com/api/v1";
  const id = route?.params ? route?.params?.id : null;
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
  const [currency, setCurrency] = useState("");
  const [postAgeFee, setPostAgeFee] = useState(0);
  const [sndPostAgeFee, setSndPostAgeFee] = useState(0);
  const [selctedCategoryId, setSelectCategoryId] = useState(-1);
  const [productImages, setProductImages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onDelete = async () => {
    let deleteMethod = {
      method: "DELETE", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    };

    let url = `${apiUrl}/products/${id}/delete_images`;

    fetch(url, deleteMethod)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setRefresh((pre) => !pre);
          setProductImages([]);
          Alert.alert(data?.message);
        }
      }) // Manipulate the data retrieved back, if we want to do something with it
      .catch((err) => console.log(err))
      .finally(() => {
        toggleModal();
        setRefresh((pre) => !pre);
      });
  };

  let fetchedProductData = () => {
    if (id) {
      fetch(`${apiUrl}/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("single product.......", data?.category_id);
          if (data?.title) {
            setTitle(data?.title);
          }
          if (data?.slug) {
            setSlug(data?.slug);
          }
          if (data?.description?.body) {
            setDescription(data?.description?.body);
          }
          if (data?.product_quantity) {
            setProductQuantity(data?.product_quantity.toString());
          }
          if (data?.price?.cents) {
            setPrice(data?.price?.cents.toString());
          }
          if (data?.sale_price?.cents) {
            setSalesPrice(data?.sale_price?.cents.toString());
          }
          if (data?.postage_fee?.cents) {
            setPostAgeFee(data?.postage_fee?.cents.toString());
          }
          if (data?.secondary_postage_fee?.cents) {
            setSndPostAgeFee(data?.secondary_postage_fee?.cents.toString());
          }
          if (data?.category_id) {
            setSelectCategoryId(data?.category_id);
          }
          if (data?.price?.currency_iso) {
            setCurrency(data?.price?.currency_iso);
          }
          if (data?.product_images) {
            setProductImages(data?.product_images);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  function fetchedCategoriesList() {
    fetch(`${apiUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        let categories = [];
        data?.categories &&
          data?.categories?.map((category, index) => {
            console.log(category);
            categories.push({ label: category?.name, value: category?.id });
          });
        setCategoriesData(categories);
        // This will contain the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.pick({
        allowMultiSelection: false,
        type: [types.images],
        copyTo: "cachesDirectory",
      });

      if (result) {
        console.log(result, "result.........");
        const data = new FormData();
        data.append("product[product_image]", {
          name: result[0].name,
          type: result[0].type,
          uri: result[0].fileCopyUri,
        });

        console.log(
          data,
          "data.........",
          `${apiUrl}/products/${id}/upload_image`
        );

        // setLoading(true);
        fetch(`${apiUrl}/products/${id}/upload_image`, {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data;",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data, "data..........");
            // setLoading(false);
            setRefresh((pre) => !pre);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            // setLoading(false);
          });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const saveOrEditProduct = async () => {
    console.log(categoryId, "category ID");

    let product = {
      title: title,
      slug: slug,
      user_id: user?.id,
      condition_id: 1,
      category_id: categoryId,
      description: description,
      product_quantity: +productQuantity,
      price_cents: +price,
      sale_price_cents: +salesPrice,
      postage_fee_cents: +postAgeFee,
      secondary_postage_fee_cents: +sndPostAgeFee,
      price_currency: currency,
    };

    let body = { product };

    console.log(body, "body...");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (id) {
      setIsLoading(true);
      try {
        let response = await axios.patch(`${baseURL}/products/${id}`, body, {
          headers: headers,
        });
        if (response) {
          console.log(response, "response....");
          navigation.navigate("Seller", { refetch: Math.random() });
        }
      } catch (error) {
        Alert.alert(error?.response?.data?.error);
        console.log(error?.response?.data, "errror...");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        let response = await axios.post(`${baseURL}/products`, body, {
          headers: headers,
        });
        if (response) {
          console.log(response, "response....");
          navigation.navigate("Seller", { refetch: Math.random() });
        }
      } catch (error) {
        Alert.alert(error?.response?.data?.error);
        console.log(error?.response?.data, "errror...");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchedCategoriesList();
  }, []);

  useEffect(() => {
    if (id) {
      fetchedProductData();
    }
  }, [id, refresh]);

  useEffect(() => {
    if (id) {
      console.log(selctedCategoryId);
      const selectedCategory = categoriesData?.find(
        (item) => item?.value === selctedCategoryId
      );
      if (selectedCategory) setCategoryId(selectedCategory?.value);
    }
  }, [selctedCategoryId, id, categoriesData]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        titleLeft
        leftIcon={"sellerBack"}
        title={id ? "Product Update" : "Product Create"}
      />
      <DeleteConfirmationModal
        visibility={isModalVisible}
        setVisibility={setModalVisible}
        confirmationMessage={
          "Do you want to Delete all the images for the product?"
        }
        isDelete={true}
        onDelete={onDelete}
      />
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
            placeholder={{
              label: "Select a Category...",
              value: null,
            }}
            onValueChange={(value) => setCategoryId(value)}
            items={categoriesData}
            value={categoryId}
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
            placeholder={{
              label: "Select a Carrency...",
              value: null,
            }}
            onValueChange={(value) => setCurrency(value)}
            items={allcurrency}
            value={currency}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 10,
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 20, color: "black" }}>
            Upload Product Images:{" "}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <TouchableOpacity onPress={pickDocument}>
              <FontAwesome5 name="cloud-upload-alt" size={28} color={"black"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <MaterialCommunityIcons
                name={"delete"}
                size={28}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={GlobalStyleSheet.row}>
          {productImages &&
            productImages.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[GlobalStyleSheet.col50, { marginBottom: 15 }]}
                >
                  <Image
                    style={{ height: 150, width: 170 }}
                    source={{ uri: item }}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <CustomButton
          onPress={saveOrEditProduct}
          color={COLORS.upfricaTitle}
          title={id ? "Update Product" : "Save Product"}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductAddorEdit;
