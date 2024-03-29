import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS } from '../constants/theme';
import { addToCart } from '../../Store/cart';
// secondary_postage:data?.secondary_postage_fee?.cents/100
// postage:data?.postage_fee?.cents/100

const ProductBox = ({onPress,id,image,title,price,rating,review,isLike,handleLike, description, postage_fee, secondary_postage_fee, type}) => {
    const currency = useSelector(((state)=> state.currency.currency))
    const {colors} = useTheme();
    const navigation = useNavigation()
    let dispatch = useDispatch()
    console.log(postage_fee, secondary_postage_fee);

  return (
    <TouchableOpacity
        activeOpacity={.8}
        onPress={() => onPress && onPress()}
        style={{backgroundColor:'white'}}
    >
        <View style={{marginBottom:10,backgroundColor:'white'}}>
            <Image
                style={{
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
                    // backgroundColor:'white',
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
                justifyContent:'space-between',
                // marginTop:8,
                marginBottom:5,
            }}
        >
            <Text style={{...FONTS.h5,color:COLORS.upfricaTitle}}>{currency.value}{price}</Text>
           
            <TouchableOpacity
                onPress={() =>{
                    
                    let tempData =  {id:id,image:image,title:title,quantity:1, price:price,type:description?.body,postage:postage_fee?.cents/100,secondary_postage:secondary_postage_fee?.cents/100, type:type} 
                    dispatch(addToCart(tempData));
                  navigation.navigate('DirectBuy', {id : id,image:image,title:title,price:price,isLike:isLike, type:description?.body,postage:postage_fee?.cents/100,secondary_postage:secondary_postage_fee?.cents/100})
                }
                   
                }
                style={{
                  backgroundColor: COLORS.upfricaTitle,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                //   marginTop: 15,
                    marginHorizontal:20,
                    marginRight:0,
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontXs,
                    color: COLORS.white,
                  }}
                >
                  Shop Now
                </Text>
              </TouchableOpacity>
        </View>
    </TouchableOpacity>
  )
}


export default ProductBox
