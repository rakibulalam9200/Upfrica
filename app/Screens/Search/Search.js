import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FONTS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

const SearchData = [
    {
        title : "boat earbuds",
    },
    {
        title : "mobile phones",
    },
    {
        title : "realme earphones",
    },
    {
        title : "vivo t1 5g",
    },
    {
        title : "washing machine",
    },
    {
        title : "Air conditioner",
    },
    {
        title : "refrigerator",
    },
    {
        title : "neckbands wireless",
    },
    {
        title : "home theatre",
    },
    {
        title : "boat earbuds",
    },
]

const Search = ({navigation}) => {

    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.card,
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    borderBottomWidth:1,
                    borderBottomColor:colors.borderColor,
                }}
            >
                <IconButton
                    onPress={() => {}}
                    size={24}
                    icon={() => <FeatherIcon color={colors.text} name='search' size={22}/>}
                />
                <TextInput
                    style={{
                        ...FONTS.font,
                        flex:1,
                        color:colors.title,
                    }}
                    autoFocus={true}
                    placeholder='Search here...'
                    placeholderTextColor={colors.textLight}
                />
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingVertical:10
                }}
            >
                {SearchData.map((data,index) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Items')}
                        key={index}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:15,
                            paddingVertical:12,
                        }}
                    >
                        <MaterialIcons
                            size={22}
                            color={colors.text}
                            style={{
                                marginRight:12,
                            }}
                            name={'history'}
                        />
                        <Text numberOfLines={2} style={{...FONTS.font,...FONTS.fontTitle,color:colors.title,flex:1}}>{data.title}</Text>
                        <FeatherIcon style={{opacity:.6}} color={colors.text} size={20} name='arrow-up-left'/>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Search;