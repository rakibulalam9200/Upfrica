import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeaturedCard from '../../components/FeaturedCard';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import pic1 from '../../assets/images/featured/pic1.png';
import pic2 from '../../assets/images/featured/pic2.png';
import pic3 from '../../assets/images/featured/pic3.png';
import pic4 from '../../assets/images/featured/pic4.png';

const FeaturedData = [
    {
        image : pic1,
        title : "Cassual",
    },
    {
        image : pic2,
        title : "Boyfriend",
    },
    {
        image : pic3,
        title : "Trendy",
    },
    {
        image : pic4,
        title : "Stylish",
    },
]

const Featured = () => {

    const {colors} = useTheme();

    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
            <View
                style={{
                    flex:1,
                    backgroundColor:colors.background,
                }}
            >
                <Header
                    leftIcon={'back'}
                    title={'Featured'}
                    rightIcon={'more'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        {FeaturedData.map((data,index) => {
                            return(
                                <FeaturedCard
                                    key={index}
                                    image={data.image}
                                    title={data.title}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Featured;