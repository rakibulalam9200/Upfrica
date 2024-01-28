import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS } from '../../constants/theme';
import Header from '../../layout/Header';
import { useTheme } from '@react-navigation/native';
import { useSelector } from "react-redux";


const EditProfile = ({ navigation }) => {
    const { token, user } = useSelector((state) => state.user);


    const {colors} = useTheme();

    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [isFocused3 , setisFocused3] = useState(false);
    const [isFocused4 , setisFocused4] = useState(false);

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
                    title={'Edit Profile'}
                />
                <KeyboardAvoidingView
                    style={{flex:1}}
                    behavior={Platform.OS === "ios" ? "padding" : ""}
                >
                    <View style={{flex:1}}>
                        <ScrollView>
                            <View style={GlobalStyleSheet.container}>
                                <View style={GlobalStyleSheet.inputGroup}>
                                    <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Mobile Number</Text>
                                    <TextInput
                                        style={[GlobalStyleSheet.formControl,
                                            {
                                                backgroundColor:colors.input,
                                                color:colors.title,
                                                borderColor:colors.borderColor,
                                            },
                                            isFocused && GlobalStyleSheet.activeInput
                                        ]}
                                        defaultValue={user.phone_number}
                                        onFocus={() => setisFocused(true)}
                                        onBlur={() => setisFocused(false)}
                                        placeholder='Type Mobile number'
                                        placeholderTextColor={colors.textLight}
                                    />
                                </View>
                                <View style={GlobalStyleSheet.inputGroup}>
                                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                        <View style={{flex:1, marginRight:10}}>
                                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>First Name</Text>
                                            <TextInput
                                                style={[GlobalStyleSheet.formControl,
                                                    {
                                                        backgroundColor:colors.input,
                                                        color:colors.title,
                                                        borderColor:colors.borderColor,
                                                        
                                                    },
                                                    isFocused2 && GlobalStyleSheet.activeInput
                                                ]}
                                                defaultValue={user.first_name}
                                                onFocus={() => setisFocused2(true)}
                                                onBlur={() => setisFocused2(false)}
                                                placeholder='Type your name'
                                                placeholderTextColor={colors.textLight}
                                            />
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Last Name</Text>
                                            <TextInput
                                                style={[GlobalStyleSheet.formControl,
                                                    {
                                                        backgroundColor:colors.input,
                                                        color:colors.title,
                                                        borderColor:colors.borderColor,
                                                        
                                                    },
                                                    isFocused2 && GlobalStyleSheet.activeInput
                                                ]}
                                                defaultValue={user.last_name}
                                                onFocus={() => setisFocused2(true)}
                                                onBlur={() => setisFocused2(false)}
                                                placeholder='Type your name'
                                                placeholderTextColor={colors.textLight}
                                            />
                                        </View>
                                  
                                    </View>
                                </View>
                                <View style={GlobalStyleSheet.inputGroup}>
                                    <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Email</Text>
                                    <TextInput
                                        style={[GlobalStyleSheet.formControl,
                                            {
                                                backgroundColor:colors.input,
                                                color:colors.title,
                                                borderColor:colors.borderColor,
                                            },
                                            isFocused3 && GlobalStyleSheet.activeInput
                                        ]}
                                        defaultValue={user.email}
                                        onFocus={() => setisFocused3(true)}
                                        onBlur={() => setisFocused3(false)}
                                        placeholder='Type your email'
                                        placeholderTextColor={colors.textLight}
                                    />
                                </View>
                                <View style={GlobalStyleSheet.inputGroup}>
                                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                        <View style={{flex:1, marginRight:10}}>
                                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Town/City</Text>
                                            <TextInput
                                                style={[GlobalStyleSheet.formControl,
                                                    {
                                                        backgroundColor:colors.input,
                                                        color:colors.title,
                                                        borderColor:colors.borderColor,
                                                        
                                                    },
                                                    isFocused2 && GlobalStyleSheet.activeInput
                                                ]}
                                                defaultValue={user.town}
                                                onFocus={() => setisFocused2(true)}
                                                onBlur={() => setisFocused2(false)}
                                                placeholder='Type your name'
                                                placeholderTextColor={colors.textLight}
                                            />
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Country</Text>
                                            <TextInput
                                                style={[GlobalStyleSheet.formControl,
                                                    {
                                                        backgroundColor:colors.input,
                                                        color:colors.title,
                                                        borderColor:colors.borderColor,
                                                        
                                                    },
                                                    isFocused2 && GlobalStyleSheet.activeInput
                                                ]}
                                                defaultValue={user.country}
                                                onFocus={() => setisFocused2(true)}
                                                onBlur={() => setisFocused2(false)}
                                                placeholder='Country'
                                                placeholderTextColor={colors.textLight}
                                            />
                                        </View>
                                  
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <Pressable onPress={() => navigation.back()}>
                    <View styl e={GlobalStyleSheet.container}>
                        <CustomButton color={COLORS.upfricaTitle} title={'Save Details'} 
                        />
                    </View>
                    </Pressable>
                    
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default EditProfile;