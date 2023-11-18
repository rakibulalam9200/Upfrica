import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS } from '../../constants/theme';
import Header from '../../layout/Header';
import { useTheme } from '@react-navigation/native';

const EditProfile = ({ navigation }) => {

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
                                        defaultValue={'+8801627789564'}
                                        onFocus={() => setisFocused(true)}
                                        onBlur={() => setisFocused(false)}
                                        placeholder='Type Mobile number'
                                        placeholderTextColor={colors.textLight}
                                    />
                                </View>
                                <View style={GlobalStyleSheet.inputGroup}>
                                    <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Full Name</Text>
                                    <TextInput
                                        style={[GlobalStyleSheet.formControl,
                                            {
                                                backgroundColor:colors.input,
                                                color:colors.title,
                                                borderColor:colors.borderColor,
                                            },
                                            isFocused2 && GlobalStyleSheet.activeInput
                                        ]}
                                        defaultValue={'Srikanto Rajbongshi'}
                                        onFocus={() => setisFocused2(true)}
                                        onBlur={() => setisFocused2(false)}
                                        placeholder='Type your name'
                                        placeholderTextColor={colors.textLight}
                                    />
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
                                        defaultValue={'srikantoraj123@gmail.com'}
                                        onFocus={() => setisFocused3(true)}
                                        onBlur={() => setisFocused3(false)}
                                        placeholder='Type your email'
                                        placeholderTextColor={colors.textLight}
                                    />
                                </View>
                                <View style={GlobalStyleSheet.inputGroup}>
                                    <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Location</Text>
                                    <TextInput
                                        style={[GlobalStyleSheet.formControl,
                                            {
                                                backgroundColor:colors.input,
                                                color:colors.title,
                                                borderColor:colors.borderColor,
                                            },
                                            isFocused4 && GlobalStyleSheet.activeInput
                                        ]}
                                        onFocus={() => setisFocused4(true)}
                                        onBlur={() => setisFocused4(false)}
                                        placeholder='Type your location'
                                        placeholderTextColor={colors.textLight}
                                        defaultValue={'Dhaka-1213, Bangladesh'}
                                    />
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