import React from 'react';
import { ScrollView, View } from 'react-native';
import CartItem from '../../components/CartItem';
import pic1 from '../../assets/images/popular/pic1.png';
import pic2 from '../../assets/images/popular/pic4.png';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const CartData = [
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
        title : "Women Sleep Suits by Femall Clothings",
        quantity : "1x",
        size: "GREY Variant",
        price : "$47.6",
        status : "completed",
        desc : "Order Received by [Louis Simatupang]",
    },
]

const Completed = () => {
    return (
        <ScrollView>
            <View
                style={GlobalStyleSheet.container}
            >
                {CartData.map((data,index) => (
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

export default Completed;