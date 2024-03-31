import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import { useTheme } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const Address = ({navigation}) => {

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
                    flex:1,
                    backgroundColor:colors.background,
                }}
            >
                <Header
                    titleLeft
                    leftIcon={'back'}
                    title={'Address'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <CustomButton
                            onPress={() => navigation.navigate('AddDeliveryAddress')}
                            outline 
                            color={COLORS.secondary}
                            title="+Add New Address"
                        />
                        <Text style={[FONTS.font,FONTS.fontTitle,{color:colors.title,marginBottom:10,marginTop:18}]}>Default Address</Text>

                        <View
                            style={{
                                padding:12,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View
                                style={{
                                    marginBottom:8,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title}}>Yatin</Text>
                                <View
                                    style={{
                                        backgroundColor:colors.background,
                                        paddingHorizontal:10,
                                        paddingTop:6,
                                        paddingBottom:4,
                                        borderRadius:15,
                                    }}
                                >
                                    <Text style={{...FONTS.fontXs,...FONTS.fontBold,color:colors.text}}>OFFICE</Text>
                                </View>
                            </View>
                            <Text style={[FONTS.font,{color:colors.text}]}>Mokshita dairy near bsnl circle {`\n`}Rk puram{`\n`}Kota -324009{`\n`}Rajasthan{`\n`}{`\n`}Mobile: 0123 4567 891</Text>
                            <View
                                style={{
                                    borderTopWidth:1,
                                    borderColor:colors.borderColor,
                                    marginTop:12,
                                    flexDirection:'row',
                                    marginHorizontal:-12,
                                    marginBottom:-12,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flex:1,
                                        padding:12,
                                        alignItems:'center',
                                        borderRightWidth:1,
                                        borderColor:colors.borderColor,
                                    }}
                                >
                                    <Text style={{...FONTS.h6,color:colors.title}}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex:1,
                                        padding:12,
                                        alignItems:'center',
                                    }}
                                >
                                    <Text style={{...FONTS.h6,color: colors.title}}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Address;