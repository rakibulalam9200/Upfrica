import React from 'react';
import { Image, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../constants/StyleSheet';


const CartItem = ({productId,image,title,price,quantity,size,status,desc}) => {

    const {colors} = useTheme();

    return (
        <View
            style={{
                paddingHorizontal:15,
                paddingVertical:20,
                backgroundColor:colors.card,
                marginBottom:10,
                ...GlobalStyleSheet.shadow,
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                }}
            >
                <View style={{flex:1,paddingRight:15}}>
                    <Text style={{...FONTS.font,color:COLORS.primary,marginBottom:6}}>{productId}</Text>
                    <Text style={{...FONTS.font,...FONTS.fontTitle,color:colors.title}}>{title}</Text>
                </View>
                <Image
                    style={{
                        height:65,
                        width:65,
                        marginBottom:10,
                    }}
                    source={image}
                />
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                <Text style={{...FONTS.font,color:colors.textLight,flex:1}}>{size}</Text>
                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>{quantity}</Text>
                <Text style={{...FONTS.h4,color:COLORS.primary,width:100,textAlign:'right'}}>{price}</Text>
            </View>
            <View
                style={{flexDirection:'row',alignItems:'flex-start',alignItems:'center'}}
            >
                <View>
                    <View
                        style={{
                            position:'absolute',
                            height:33,
                            width:'100%',
                            bottom:-1,
                            backgroundColor:status == "completed" ? COLORS.success : 
                            status == "canceled" ? COLORS.danger : 
                            status == "on delivery" ? COLORS.info : COLORS.primary,
                            opacity:.1
                        }}
                    />
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:12,
                            paddingVertical:6,
                        }}
                    >
                        {/* <View
                            style={{
                                height:6,
                                width:6,
                                borderRadius:6,
                                marginRight:12,
                                backgroundColor:status == "completed" ? COLORS.success : 
                                status == "canceled" ? COLORS.danger : 
                                status == "on delivery" ? COLORS.info : COLORS.primary,
                            }}
                        /> */}
                        <Text style={{
                            ...FONTS.font,
                            ...FONTS.fontTitle,
                            color:  status == "completed" ? COLORS.success : 
                                    status == "canceled" ? COLORS.danger : 
                                    status == "on delivery" ? COLORS.info : COLORS.primary,
                            textTransform:'capitalize',
                        }}>{status}</Text>
                    </View>
                </View>
                <Text style={{...FONTS.font,color:colors.textLight,flex:1,marginLeft:30}}>{desc}</Text>
            </View>
        </View>
    );
};


export default CartItem;