import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, FONTS } from '../constants/theme';

const ProductItem = ({
    id,
    image,
    title,
    desc,
    price,
    oldPrice,
    rating,
    reviews,
    status,
    onPress,
    isLike,
    handleItemLike
}) => {

    const {colors} = useTheme();
    const {currency} = useSelector((state)=> state.currency)

    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={onPress}
            style={{
                marginBottom:15,
                backgroundColor:colors.card,
                ...GlobalStyleSheet.shadow,
            }}
        >
            <View>
                <Image
                    style={{
                        width: '70%',
                        height:'80%',
                        height: undefined,
                        aspectRatio: 1 / 1,
                        paddingTop:5,
                    }}
                    source={{ uri: image }}
                />
                <LinearGradient
                    colors={["rgba(0,0,0,.3)","rgba(0,0,0,0)","rgba(0,0,0,0)"]}
                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    style={{
                        position:'absolute',
                        height:'100%',
                        width:'100%',
                        transform : [
                            {
                                rotateY : '180deg'
                            }
                        ]
                    }}
                > 
                </LinearGradient>
                {status &&
                    <View
                        style={{
                            position:'absolute',
                            left:0,
                            top:0,
                            backgroundColor:status == "Trending" ? COLORS.upfricaTitle : COLORS.secondary,
                            paddingHorizontal:12,
                            paddingVertical:3,
                            alignItems:'center',
                        }}
                    >
                        <Text style={{...FONTS.fontXs,color:COLORS.white}}>{status}</Text>
                    </View>
                }
                <TouchableOpacity
                    onPress={() => handleItemLike && handleItemLike(id)}
                    style={{
                        height:40,
                        width:40,
                        position:'absolute',
                        top:0,
                        right:0,
                        borderRadius:30,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    {isLike ?
                        <FontAwesome color={COLORS.primary} size={18} name='heart'/>
                        :
                        <FontAwesome color={COLORS.white} size={18} name='heart-o'/>
                    }
                </TouchableOpacity>
            </View>
            <View
                style={{
                    paddingHorizontal:12,
                    paddingVertical:12,
                }}
            >
                <Text numberOfLines={1} style={{...FONTS.font,...FONTS.fontTitle,color:colors.title,marginBottom:4}}>{title}</Text>
                <Text numberOfLines={1} style={{...FONTS.fontXs,color:colors.textLight,marginBottom:3}}>{desc}</Text>
                <View
                    style={{
                        marginTop:4,
                        flexDirection:'row',
                        marginBottom:4,
                    }}
                >
                    <Text style={{...FONTS.h6,color:COLORS.upfricaTitle}}>{currency.value}{price}</Text>
                    <Text style={{...FONTS.fontSm,textDecorationLine:'line-through',color:colors.textLight,marginLeft:8,marginTop:2}}>{oldPrice}</Text>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        marginBottom:4,
                    }}
                >
                    <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title}}>{rating}</Text>
                    <FontAwesome style={{marginLeft:3,marginRight:10}} color={'#FFA800'} size={14} name='star'/>
                    <Text style={{...FONTS.fontSm,color:colors.text}}>({reviews} Reviews)</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductItem;