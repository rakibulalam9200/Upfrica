import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import Header from "../../layout/Header";

const ProductAddorEdit = () => {
  const theme = useTheme();
  const { colors } = theme;
  const apiUrl = "https://upfrica-staging.herokuapp.com/api/v1/categories";

  const [categoriesData, setCategoriesData] = useState([]);

  function fetchedCategoriesList() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data.......");
        let categories = []
        data && data?.map((category,index)=>{
          categories.push({label: category?.name,value: category?.id})
        })
        setCategoriesData(categories); // This will contain the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

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
            //   value={firstName}
            //   onChangeText={(text) => setFirstName(text)}
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
            //   value={setLastName}
            //   onChangeText={(text) => setLastName(text)}
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
            //   value={username}
            //   onChangeText={(text) => setUsername(text)}
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
              onValueChange={(value) => console.log(value)}
              items={categoriesData}
            />
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductAddorEdit;
