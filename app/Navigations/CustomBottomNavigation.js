import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { COLORS, FONTS } from '../constants/theme';

const home = require('../assets/images/icons/home3.png');
const category = require('../assets/images/icons/category.png');
// const wishlist = require('../assets/images/icons/heart.png');
const user = require('../assets/images/icons/user3.png');
const polygon = require('../assets/images/icons/polygon.png');
const bag = require('../assets/images/icons/bag.png');

const CustomBottomNavigation = ({ state, descriptors, navigation }) => {

    const theme = useTheme();
    const {colors} = theme;

    return (
        <DropShadow
            style={[{
                shadowColor: COLORS.secondary,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: .2,
                shadowRadius: 5,
            },Platform.OS === 'ios' && {
                backgroundColor:colors.card,
            }]}
        >
            <View
                style={{
                    height:60,
                    backgroundColor:colors.card,
                    flexDirection:'row',
                }}
            >
                {state.routes.map((route, index) => {

                    const { options } = descriptors[route.key];
                    const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                    const isFocused = state.index === index;
                    
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    }
                    if(label === 'Cart2'){
                        return(
                            <View
                                key={index}
                                style={{
                                    width:'25%',
                                    alignItems:'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Cart')}
                                    activeOpacity={.8}
                                    style={{
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:20,
                                       
                                    }}
                                >
                                  <View></View>
                                    <Image
                                        style={{
                                            position:'absolute',
                                            height:28,
                                            width:28,
                                            resizeMode:'contain',
                                            tintColor:'gray',
                                        }}
                                        source={bag}
                                    />
                                   
                                </TouchableOpacity>
                                <Text style={{marginTop:12,}}>Cart</Text>
                            </View>
                        )
                    }else{
                        return(
                            <View
                                key={index}
                                style={{
                                    flex:1,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={onPress}
                                    style={{
                                        alignItems:'center',
                                        paddingVertical:9,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:20,
                                            width:20,
                                            tintColor:isFocused ? COLORS.upfricaTitle : colors.title,
                                            opacity:isFocused ? 1 : .5,
                                            marginBottom:3,
                                            marginTop:1,
                                        }}
                                        source={
                                            label === 'Home' ? home :
                                            label === 'Categories' ? category :
                                            label === 'Cart' ? bag :
                                            label === 'Account' ? user : home
                                        }
                                    />
                                    <Text style={{...FONTS.fontSm,color:isFocused ?COLORS.upfricaTitle :colors.title,opacity:isFocused ? 1 : .6}}>{label}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })}
            </View>
        </DropShadow>
    );
};

export default CustomBottomNavigation;