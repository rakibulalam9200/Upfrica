import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { IconButton } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS, FONTS } from '../constants/theme';

const Header = (props) => {

    const navigation = useNavigation();
    const {colors} = useTheme();

    return (
        <DropShadow
            style={[{
                shadowColor: COLORS.secondary,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: .1,
                shadowRadius: 5,
                zIndex:2,
            },Platform.OS === 'ios' && {
                backgroundColor:colors.card,
            }]}
        >
            <View
                style={[{
                    height: props.productId ? 60 : 50,
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:10,
                    backgroundColor:colors.card,
                },props.transparent && {
                    position:'absolute',
                    left:0,
                    right:0,
                    borderBottomWidth:0,
                }]}    
            >
                {props.leftIcon == "back" &&
                    <IconButton
                        onPress={() => props.backAction ? props.backAction() : navigation.goBack()}
                        icon={props => <MaterialIcons name="arrow-back-ios" {...props}/>}
                        iconColor={colors.title}
                        size={20}
                    />
                }
                <View style={{flex:1}}>
                    <Text style={{...FONTS.h6,color:colors.title,textAlign:props.titleLeft ? 'left' : 'center'}}>{props.title}</Text>
                    {props.productId &&
                        <Text style={{...FONTS.fontSm,color:colors.text,textAlign:'center',marginTop:2}}>{props.productId}</Text>
                    }
                </View>
                {props.rightIcon2 == "search" &&
                    <IconButton
                        onPress={() => navigation.navigate('Search')}
                        size={20}
                        iconColor={colors.title} 
                        icon={props => <FeatherIcon name="search" {...props} />} 
                    />
                }
                {props.rightIcon == "more" &&
                    <IconButton 
                        iconColor={props.transparent ? "#fff" : colors.title} 
                        icon={props => <MaterialIcons name="more-vert" {...props} />} 
                    />
                }
                {props.rightIcon == "plus" &&
                    <IconButton
                        onPress={() => navigation.navigate('ProductAdd')} 
                        iconColor={props.transparent ? "#fff" : colors.title} 
                        icon={props => <AntDesign name="pluscircle" {...props} />} 
                    />
                }
                {props.rightIcon == "wishlist" &&
                    <IconButton 
                        onPress={() => props.handleLike()}
                        size={20}
                        iconColor={props.isLike ? "#F9427B" : colors.title} 
                        icon={val => <FontAwesome name={props.isLike ? "heart" : "heart-o"} {...val} />} 
                    />
                }
                
            </View>
        </DropShadow>
    );
};



export default Header;