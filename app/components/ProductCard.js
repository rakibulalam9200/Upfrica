import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { COLORS, FONTS } from '../constants/theme';

const ProductCard = ({ onPress,id,image,category,title,price,oldPrice,isLike,offer,handleLike}) => {
    const currency = useSelector(((state)=> state.currency.currency))
    const product ={}
    const {colors} = useTheme();

    useEffect(()=>{

    },[currency])
   
    
    return(
        <TouchableOpacity

            activeOpacity={.8}
            onPress={() => onPress && onPress()}
            
            style={[
                styles.productCard,
                {
                    backgroundColor:colors.card,
                }
            ]}
        >
            <View>
                <Image
                    source={{ uri: image }}
                    style={{
                        
                        width: 120, 
                        height: 120,
                        
                    }}
                />
                <View
                    style={[{
                        position:'absolute',
                        top:0,
                        left:0,
                        paddingHorizontal:8,
                        paddingVertical:2,
                        backgroundColor:COLORS.secondary,
                    },offer === 'sale' && {
                        backgroundColor:COLORS.primary,
                    }]}
                >
                    <Text style={[{...FONTS.fontXs,color:COLORS.white},offer === 'sale' && {textTransform:'uppercase'}]}>{offer}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => handleLike(id)}
                    style={{
                        position:'absolute',
                        top:0,
                        right:0,
                        padding:5,
                    }}
                >
                    <FontAwesome 
                        size={16}
                        color={isLike ? "#F9427B" : COLORS.text}
                        name={isLike ? "heart" : "heart-o"}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    paddingHorizontal:10,
                    paddingVertical:10,
                }}
            >
                <Text
                    style={{
                        ...FONTS.fontSm,
                        color:colors.text,
                        marginBottom:5,
                    }}
                >{category}</Text>
                <Text
                    numberOfLines={2}
                    style={{
                        ...FONTS.h6,
                        ...FONTS.fontTitle,
                        color:colors.title,
                        fontSize:14,
                    }}
                >{title}</Text>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        marginTop:8,
                        marginBottom:2,
                    }}
                >
                    <Text style={{...FONTS.h5,color:COLORS.upfricaTitle}}>{currency.value}{price}</Text>
                    <Text style={{
                        ...FONTS.font,
                        color:colors.textLight,
                        textDecorationLine:'line-through',
                        marginLeft:6,
                        opacity:.7,
                    }}>{currency.value}{oldPrice}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    productCard : {
        shadowColor: "rgba(0,0,0,.2)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default ProductCard;