import React from 'react';
import { ScrollView, View } from 'react-native';
import CartItem from '../../components/CartItem';
import pic1 from '../../assets/images/popular/pic1.png';
import pic2 from '../../assets/images/popular/pic2.png';
import pic3 from '../../assets/images/popular/pic3.png';
import pic4 from '../../assets/images/popular/pic4.png';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const AllCartData = [
    {
        productId : "#125125671",
        image : pic1,
        title : "Women Sleep Suits by Femall Clothings",
        quantity : "1x",
        size: "GREY Variant",
        price : "$47.6",
        status : "completed",
        desc : "Order Received by [Louis Simatupang]",
    },
    {
        productId : "#125125671",
        image : pic2,
        title : "Brown Women Shirts by Coklat Cloth",
        quantity : "2x",
        size: "LONG Size",
        price : "$158.2",
        status : "canceled",
        desc : "Reach on payment due date",
    },
    {
        productId : "#125125671",
        image : pic3,
        title : "Red Candy Handy Bag with Random Accessories",
        quantity : "2x",
        size: "43 Size",
        price : "$158.2",
        status : "on delivery",
        desc : "On the way by Courir  [H. Stefanus]",
    },
    {
        productId : "#125125671",
        image : pic4,
        title : "Women Sleep Suits by Femall Clothings",
        quantity : "1x",
        size: "GREY Variant",
        price : "$47.6",
        status : "completed",
        desc : "Order Received by [Louis Simatupang]",
    },
]

const AllCart = () => {
    return (
        <ScrollView>
            <View style={GlobalStyleSheet.container}>
                {AllCartData.map((data,index) => (
                    <CartItem
                        key={index}
                        productId={data.productId}
                        image={data.image}
                        title={data.title}
                        price={data.price}
                        quantity={data.quantity}
                        size={data.size}
                        status={data.status}
                        desc={data.desc}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export default AllCart;