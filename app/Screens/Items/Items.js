import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import ProductItem from '../../components/ProductItem';
import pic1 from '../../assets/images/product/pic1.jpg';
import pic2 from '../../assets/images/product/pic2.jpg';
import pic3 from '../../assets/images/product/pic3.jpg';
import pic4 from '../../assets/images/product/pic4.jpg';
import pic5 from '../../assets/images/product/pic5.jpg';
import pic6 from '../../assets/images/product/pic6.jpg';
import pic7 from '../../assets/images/product/pic7.jpg';
import pic8 from '../../assets/images/product/pic8.jpg';
import pic9 from '../../assets/images/popular/pic1.png';
import pic10 from '../../assets/images/popular/pic2.png';
import pic11 from '../../assets/images/popular/pic3.png';
import pic12 from '../../assets/images/popular/pic4.png';
import { Checkbox, RadioButton, Snackbar } from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import { useTheme } from '@react-navigation/native';

var ProductData = [
    {
        id : 11,
        image : pic10,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
    },
    {
        id : 12,
        image : pic12,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
    },
    {
        id : 1,
        image : pic1,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
    },
    {
        id : 2,
        image : pic11,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
    },
    {
        id : 9,
        image : pic9,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
    },
    {
        id : 10,
        image : pic2,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
        status : "Sale",
    },
    {
        id : 3,
        image : pic3,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
        status : "Trending",
    },
    {
        id : 4,
        image : pic4,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
    },
    {
        id : 5,
        image : pic5,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
    },
    {
        id : 6,
        image : pic6,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
        status : "Sale",
    },
    {
        id : 7,
        image : pic7,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
    },
    {
        id : 8,
        image : pic8,
        title : "Peter England Causual",
        desc : "Printed Longline Pure Cotteon T-shirt",
        price : "$151.15",
        oldPrice : "$255.11",
        rating : "4.2",
        reviews : "245",
    },
]
var ProductData = [

]

const discountFilterData = [
    {
        selected : false,
        title : "50% or more",
    },
    {
        selected : false,
        title : "30% or more",
    },
    {
        selected : false,
        title : "40% or more",
    },
    {
        selected : false,
        title : "60% or more",
    },
    {
        selected : false,
        title : "70% or more",
    },
]
const brandFilterData = [
    {
        selected : true,
        title : "Roadster",
    },
    {
        selected : true,
        title : "Peter England",
    },
    {
        selected : true,
        title : "Flying Machine",
    },
    {
        selected : true,
        title : "Killer",
    },
    {
        selected : true,
        title : "Levi's",
    },
    {
        selected : true,
        title : "Puma",
    },
    {
        selected : true,
        title : "Wildcraft",
    },
    {
        selected : true,
        title : "Ndet",
    },
    {
        selected : true,
        title : "Woodland",
    },
]

const Items = ({ route, navigation}) => {
    const [itemData, setItemData] = useState(ProductData);

    const [CheckoutData, setCheckoutData] = useState([])
    let datas = null;

    try {
      if (route.params) {
        datas = route.params.tradingProducts;
        // ProductData.push(...data)
        console.log("************************data array *******************************")
        console.log(data);
        // console.log(ProductData)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    if (!datas ) {
      return (
        <View>
          <Text style={{marginTop:'50%',textAlign:'center'}}>Your bucket is empty!!!</Text>
        </View>
      );
    }

    const {colors} = useTheme();

    const sheetRef = useRef();

    

    const [sortVal , setSortVal] = useState('');
    const [sheetType , setSheetType] = useState('');
    const [brandFilter , setBrandFilter] = useState(brandFilterData);
    const [discountFilter , setDiscountFilter] = useState(discountFilterData);
    const [filterData , setFilterData] = useState([]);
    const [isSnackbar , setIsSnackbar] = useState(false);
    const [snackText , setSnackText] = useState("Loading...");

    const handleItemLike = (val) => {
        let items = itemData.map((data) => {
            if(val === data.id){
                if(data.isLike){
                    setSnackText("Item removed to Favourite.");
                }else{
                    setSnackText("Item add to Favourite.");
                }
                setIsSnackbar(true);
                return { ...data, isLike : !data.isLike};
            }
            return data;
        })
        setItemData(items);
    }

    const handleFilterSelected = (val) => {
        let Brand = brandFilter.map((data) => {
            if (val === data.title) {
                return { ...data, selected: !data.selected };
            }
            return data;
        });
        let Discount = discountFilter.map((data) => {
            if (val === data.title) {
                return { ...data, selected: !data.selected };
            }
            return data;
        });
        setBrandFilter(Brand);
        setDiscountFilter(Discount);
        setFilterData(
            sheetType == "brand" ? Brand :
            sheetType == "discount" ? Discount :
            []
        )
    }

    return (
        <>
            <RBSheet
                ref={sheetRef}
                height={
                    sheetType === "sort" ? 250 :
                    sheetType === "discount" ? 310 :
                    sheetType === "brand" ? 400 :
                    300
                }
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container:{
                        backgroundColor:colors.card,
                    },
                    draggableIcon:{
                        backgroundColor:colors.background,
                    }
                }}
            >
                {sheetType == "sort" ?
                    <RadioButton.Group onValueChange={value => {setSortVal(value); sheetRef.current.close()}} value={sortVal}>
                        <RadioButton.Item labelStyle={{color:colors.title}} color={COLORS.primary} uncheckedColor={COLORS.label} style={{paddingVertical:2}} label="What's new" value="newest" />
                        <RadioButton.Item labelStyle={{color:colors.title}} color={COLORS.primary} uncheckedColor={COLORS.label} style={{paddingVertical:2}} label="Price - high to low" value="price-hightolow" />
                        <RadioButton.Item labelStyle={{color:colors.title}} color={COLORS.primary} uncheckedColor={COLORS.label} style={{paddingVertical:2}} label="Price - low to hight" value="price-lowtohigh" />
                        <RadioButton.Item labelStyle={{color:colors.title}} color={COLORS.primary} uncheckedColor={COLORS.label} style={{paddingVertical:2}} label="Popularity" value="popularity" />
                        <RadioButton.Item labelStyle={{color:colors.title}} color={COLORS.primary} uncheckedColor={COLORS.label} style={{paddingVertical:2}} label="Discount" value="discount" />
                    </RadioButton.Group>
                    :
                    <>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                paddingHorizontal:5,
                                marginTop:-10,
                                marginBottom:5,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => sheetRef.current.close()}
                                style={{
                                    padding:10,
                                    marginRight:3,
                                }}
                            >
                                <FeatherIcon color={colors.title} size={24} name='x'/>
                            </TouchableOpacity>
                            <Text style={{...FONTS.h6,top:1,color:colors.title}}>Filters</Text>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                flexWrap:'wrap',
                            }}
                        >
                            {filterData.map((data,index) => (
                                <View
                                    key={index}
                                    style={{
                                        width:'50%',
                                    }}
                                >
                                    <Checkbox.Item 
                                        onPress={() => handleFilterSelected(data.title)} 
                                        label={data.title} 
                                        labelStyle={{
                                            ...FONTS.font,
                                            color:colors.title,
                                        }}
                                        style={{
                                            paddingVertical:5,
                                        }}
                                        color={COLORS.primary}
                                        status={data.selected ? 'checked' : 'unchecked'} 
                                    />
                                </View>
                            ))}
                        </View>
                        <View
                            style={GlobalStyleSheet.container}
                        >
                            <View style={GlobalStyleSheet.row}>
                                <View style={GlobalStyleSheet.col50}>
                                    <TouchableOpacity
                                        style={{
                                            borderWidth:1,
                                            borderColor:colors.title,
                                            paddingHorizontal:15,
                                            alignItems:'center',
                                            paddingVertical:14,
                                        }}
                                    >
                                        <Text style={{...FONTS.fontLg,color:colors.title}}>Clear</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={GlobalStyleSheet.col50}>
                                    <CustomButton
                                        color={COLORS.secondary}
                                        title={'Apply'}
                                    />
                                </View>
                            </View>
                        </View>
                    </>
                }
            </RBSheet>
            
            <SafeAreaView
                style={{
                    flex:1,
                    backgroundColor:colors.card,
                }}
            >
                <Header
                    titleLeft
                    leftIcon={'back'}
                    title={"Products"}
                />
                <View
                    style={{
                        flex:1,
                        backgroundColor:colors.background,
                    }}
                >
                    <View
                        style={{
                            backgroundColor:colors.card,
                        }}
                    >
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <View
                                style={{
                                    paddingHorizontal:15,
                                    paddingVertical:10,
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <Ripple
                                    onPress={() => {setSheetType('sort');sheetRef.current.open()}}
                                    style={[styles.badge,{backgroundColor:colors.background,borderColor:colors.borderColor}]}
                                >
                                    <Octicons size={16} color={colors.textLight} style={{marginRight:6}} name='sort-desc'/>
                                    <Text style={{...FONTS.font,top:-1,color:colors.title}}>Sort By</Text>
                                    <FeatherIcon style={{marginLeft:2,marginRight:-6}} color={colors.title} size={18} name='chevron-down'/>
                                </Ripple>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Filter')}
                                    style={[styles.badge,{backgroundColor:colors.background,borderColor:colors.borderColor}]}
                                >
                                    <FeatherIcon style={{marginRight:8}} color={colors.textLight} size={15} name='filter' />
                                    <Text style={{...FONTS.font,top:-1,color:colors.title}}>Filter</Text>
                                </TouchableOpacity>
                                <Ripple
                                    onPress={() => {setSheetType('brand');setFilterData(brandFilter);sheetRef.current.open()}}
                                    style={[styles.badge,{backgroundColor:colors.background,borderColor:colors.borderColor}]}
                                >
                                    <Text style={{...FONTS.font,top:-1,color:colors.title}}>Brand</Text>
                                    <FeatherIcon style={{marginLeft:2,marginRight:-6}} color={colors.title} size={18} name='chevron-down'/>
                                </Ripple>
                                <Ripple
                                    onPress={() => {setSheetType('discount');setFilterData(discountFilter);sheetRef.current.open()}}
                                    style={[styles.badge,{backgroundColor:colors.background,borderColor:colors.borderColor}]}
                                >
                                    <Text style={{...FONTS.font,top:-1,color:colors.title}}>discount</Text>
                                    <FeatherIcon style={{marginLeft:2,marginRight:-6}} color={colors.title} size={18} name='chevron-down'/>
                                </Ripple>
                            </View>
                        </ScrollView>
                    </View>
                    <ScrollView>
                        <View
                            style={{
                                paddingTop:15,
                                paddingBottom:15,
                            }}
                        >
                            <View style={{
                                flexDirection:'row',
                                flexWrap:'wrap',
                                paddingHorizontal:5,
                            }}>
                                {datas.map((data,index) => (
                                    <View
                                        key={index}
                                        style={{width:'50%',paddingHorizontal:5}}
                                    >
                                        <ProductItem
                                            onPress={() => navigation.navigate('ProductDetail',{data})}
                                            id={data.id}
                                            image={data?.product_images[0]}
                                            category={data?.category?data?.category:""}
                                            title={data.title}
                                            price={data.sale_price.cents/100}
                                            rating={data?.rating?data?.rating:Math.floor(Math.random() * (5 - 3 + 3)) + 2}
                                            review={data?.review?data?.review:Math.floor(Math.random() * (500 - 300+ 300)) + 1}
                                            isLike={data?.isLike?false:false}
                                            // isLike={data.isLike}
                                            handleItemLike={handleItemLike}
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                    <Snackbar
                        visible={isSnackbar}
                        duration={3000}
                        onDismiss={() => setIsSnackbar(false)}
                        action={{
                            label: 'Wishlist',
                            onPress: () => {
                                navigation.navigate('Wishlist');
                            },
                        }}
                    >
                        {snackText}
                    </Snackbar>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    badge : {
        borderWidth:1,
        paddingHorizontal:15,
        paddingVertical:6,
        marginRight:12,
        flexDirection:'row',
        alignItems:'center',
    }
})

export default Items;