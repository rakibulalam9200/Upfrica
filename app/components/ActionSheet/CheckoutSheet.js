import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomButton from '../CustomButton';
import ProductCard from '../ProductCard';


const productsData = [
    {
        id : "1",
        image : IMAGES.popularProduct1,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "T-Shirt",
        price : "$25.15",
        oldPrice : "$30.15",
        offer : "32% off",
        isLike : false,
    },
    {
        id : "2",
        image : IMAGES.popularProduct2,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "Jackets",
        price : "$18.50",
        oldPrice : "$25.18",
        offer : "sale",
        isLike : false,
    },
    {
        id : "3",
        image : IMAGES.popularProduct3,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "Jackets",
        price : "$32.12",
        oldPrice : "$48.00",
        offer : "32% off",
        isLike : false,
    },
]

const CheckoutSheet = ({sheetRef}) => {

    const {colors} = useTheme();
    const navigation = useNavigation();

    const [porpularProducts, setPopularProducts] = useState(productsData);
    const handleLike = (id) => {
        let temp = porpularProducts.map((data,index) => {
            if (id === data.id) {
                return { ...data, isLike: !data.isLike};
            }
            return data;
        });
        setPopularProducts(temp);
    };

    return (
        <>
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:15,
                    paddingVertical:10, 
                    marginBottom:10,
                }}
            >
                <Text style={{flex:1,...FONTS.h6,color:colors.title}}>Your Cart</Text>
                <TouchableOpacity
                    onPress={() => sheetRef.current.close()}
                    style={{
                        height:32,
                        width:32,
                        borderRadius:32,
                        backgroundColor:colors.background,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <FeatherIcon size={20} color={colors.title} name="x"/>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft:15,
                    }}
                >   
                    {porpularProducts.map((data,index) => {
                        return(
                            <View
                                key={index}
                                style={{
                                    width:160,
                                    marginRight:10,
                                }}
                            >
                                <ProductCard
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
                                />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View
                style={GlobalStyleSheet.container}
            >
                <CustomButton
                    color={COLORS.secondary}
                    title="Checkout ($45.50)"
                />
            </View>
        </>
    );
};


export default CheckoutSheet;