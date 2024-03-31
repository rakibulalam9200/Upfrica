import React from 'react';
import { ScrollView, View } from 'react-native';
import ItemList from '../../components/ItemList';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const BestItems = () => {


    const popularData = [
        {
            id : '1',
            image : require('../../assets/images/product/pic1.jpg'),
            title : 'Blue Long Dress with Indian Style',
            price : '$24.56',
            oldPrice : '$30.00',
            offer : "40% OFF",
            rating : 4.2,
            review : "245",
        },
        {
            id : '2',
            image : require('../../assets/images/product/pic2.jpg'),
            title : 'Black Hat with White Suits',
            price : '$98.12',
            rating : 4,
            review : "245",
        },
        {
            id : '3',
            image : require('../../assets/images/product/pic3.jpg'),
            title : 'Brown Women Shirts by Coklat Cloth',
            price : '$24.56',
            oldPrice : '$30.00',
            offer : "40% OFF",
            rating : 3.8,
            review : "245",
        },
        {
            id : '4',
            image : require('../../assets/images/product/pic4.jpg'),
            title : 'Brown Women Shirts by Coklat Cloth',
            price : '$24.56',
            oldPrice : '$30.00',
            offer : "40% OFF",
            rating : 4.2,
            review : "245",
        },
        {
            id : '5',
            image : require('../../assets/images/product/pic5.jpg'),
            title : 'Blue Long Dress with Indian Style',
            price : '$24.56',
            oldPrice : '$30.00',
            offer : "40% OFF",
            rating : 3.9,
            review : "245",
        },
        {
            id : '6',
            image : require('../../assets/images/product/pic6.jpg'),
            title : 'Black Hat with White Suits',
            price : '$98.12',
            rating : 4.8,
            review : "245",
        },
        {
            id : '7',
            image : require('../../assets/images/product/pic7.jpg'),
            title : 'Brown Women Shirts by Coklat Cloth',
            price : '$24.56',
            oldPrice : '$30.00',
            offer : "40% OFF",
            rating : 3.6,
            review : "245",
        },
        {
            id : '8',
            image : require('../../assets/images/product/pic8.jpg'),
            title : 'Brown Women Shirts by Coklat Cloth',
            price : '$24.56',
            oldPrice : '$30.00',
            offer : "40% OFF",
            rating : 4,
            review : "245",
        },
    ]



    return (
        <View>
            <ScrollView>
                <View style={[GlobalStyleSheet.container,{paddingTop:20}]}>
                    {popularData.map((data,index) => {
                        return(
                            <ItemList
                                key={index}
                                title={data.title}
                                price={data.price}
                                oldPrice={data.oldPrice}
                                offer={data.offer}
                                rating={data.rating}
                                review={data.review}
                                image={data.image}
                            />
                        )
                    })}
                </View>
            </ScrollView>
            
        </View>
    );
};


export default BestItems;