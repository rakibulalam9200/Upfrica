import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { COLORS, FONTS } from '../constants/theme';

const ProductBox = ({onPress,id,image,title,price,rating,review,isLike,handleLike}) => {
    const currency = useSelector(((state)=> state.currency.currency))
    const {colors} = useTheme();

  return (
    <TouchableOpacity
        activeOpacity={.8}
        onPress={() => onPress && onPress()}
    >
        <View style={{marginBottom:10}}>
            <Image
                style={{
                    // width:'100%',
                    // height:undefined,
                    // aspectRatio:1/1,
                    width: 120, 
                    height: 120,
                }}
                source={{ uri: image }}
            />
            <TouchableOpacity
                onPress={() => handleLike(id)}
                style={{
                    position:'absolute',
                    top:0,
                    right:0,
                    padding:6,
                }}
            >
                <FontAwesome 
                    size={16}
                    color={isLike ? "#F9427B" : COLORS.text}
                    name={isLike ? "heart" : "heart-o"}
                />
            </TouchableOpacity>

            <View
                style={{
                    position:'absolute',
                    bottom:0,
                    left:0,
                    backgroundColor:"rgba(0,0,0,.75)",
                    paddingHorizontal:8,
                    paddingVertical:1,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                    <FontAwesome color={'#DA8D46'} size={10} name="star"/>
                    <Text style={{...FONTS.fontSm,color:COLORS.white,...FONTS.fontTitle,marginLeft:3}}>{rating}</Text>
                    <Text style={{...FONTS.fontXs,color:COLORS.white,opacity:.7,marginLeft:5}}>| {review}</Text>
                </View>
            </View>

        </View>
        <Text
            numberOfLines={2}
            style={{
                ...FONTS.font,
                ...FONTS.fontTitle,
                color:colors.title,
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
            }}>{currency.value}{price +5}</Text>
        </View>
    </TouchableOpacity>
  )
}


export default ProductBox
