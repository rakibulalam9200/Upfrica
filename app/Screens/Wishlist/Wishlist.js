import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { IMAGES } from '../../constants/theme';
import Header from '../../layout/Header';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
// import ProductCard from '../../components/ProductCard';


const WishlistData = [
    {
        id : "1",
        image : "",
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "T-Shirt",
        price : "$25.15",
        oldPrice : "$30.15",
        offer : "32% off",
        isLike : true,
    },
    {
        id : "2",
        image : IMAGES.popularProduct2,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "Jackets",
        price : "$18.50",
        oldPrice : "$25.18",
        offer : "sale",
        isLike : true,
    },
    {
        id : "3",
        image : IMAGES.popularProduct3,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "Jackets",
        price : "$32.12",
        oldPrice : "$48.00",
        offer : "32% off",
        isLike : true,
    },
    {
        id : "4",
        image : IMAGES.popularProduct4,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "T-Shirt",
        price : "$28.38",
        oldPrice : "$42.00",
        offer : "32% off",
        isLike : true,
    },
    {
        id : "5",
        image : IMAGES.popularProduct1,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "T-Shirt",
        price : "$14.50",
        oldPrice : "$18.20",
        offer : "32% off",
        isLike : true,
    },
    {
        id : "6",
        image : IMAGES.popularProduct2,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "Jackets",
        price : "$17.15",
        oldPrice : "$22.42",
        offer : "sale",
        isLike : true,
    },
    {
        id : "7",
        image : IMAGES.popularProduct1,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "T-Shirt",
        price : "$25.15",
        oldPrice : "$30.15",
        offer : "32% off",
        isLike : true,
    },
    {
        id : "8",
        image : IMAGES.popularProduct2,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "Jackets",
        price : "$18.50",
        oldPrice : "$25.18",
        offer : "sale",
        isLike : true,
    },
    {
        id : "9",
        image : IMAGES.popularProduct3,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "Jackets",
        price : "$32.12",
        oldPrice : "$48.00",
        offer : "32% off",
        isLike : true,
    },
    {
        id : "10",
        image : IMAGES.popularProduct4,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "T-Shirt",
        price : "$28.38",
        oldPrice : "$42.00",
        offer : "32% off",
        isLike : true,
    },
    {
        id : "11",
        image : IMAGES.popularProduct1,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "T-Shirt",
        price : "$14.50",
        oldPrice : "$18.20",
        offer : "32% off",
        isLike : true,
    },
    {
        id : "12",
        image : IMAGES.popularProduct2,
        title : "Men Black Grey Allover Printed Round Neck T-Shirt",
        category : "Jackets",
        price : "$17.15",
        oldPrice : "$22.42",
        offer : "sale",
        isLike : true,
    },
]

const Wishlist = ({navigation}) => {
    
    const theme = useTheme();
    const {colors} = theme;

    const [productsData ,setProductsData] = useState(WishlistData);
    const [isSnackbar , setIsSnackbar] = useState(false);
    const [snackText , setSnackText] = useState("Loading...");

    const handleLike = (id) => {
        let temp = productsData.map((data,index) => {
            if (id === data.id) {
                if(data.isLike){
                    setSnackText("Item removed to Favourite.");
                }else{
                    setSnackText("Item add to Favourite.");
                }
                setIsSnackbar(true);
                return { ...data, isLike: !data.isLike};
            }
            return data;
        });
        setProductsData(temp);
    };

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.card,
            }}
        >
            <View
                style={{
                    flex:1,
                    backgroundColor:colors.background,
                }}
            >
                <Header
                    leftIcon={'back'}
                    title={'Wishlist'}
                    titleLeft
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View style={GlobalStyleSheet.row}>
                            {productsData.map((data,index) => {
                                return(
                                    <View
                                        key={index}
                                        style={[GlobalStyleSheet.col50,{marginBottom:15}]}
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
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Snackbar
                visible={isSnackbar}
                duration={3000}
                onDismiss={() => setIsSnackbar(false)}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        // do something
                    },
                }}
            >
                {snackText}
            </Snackbar>
        </SafeAreaView>
    );
};

export default Wishlist;