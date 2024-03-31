import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import { COLORS } from '../../constants/theme';
import ListStyle1 from '../../components/list/ListStyle1';


const Snackbars = () => {

    const {colors} = useTheme();

    const ShowSnackbarSuccess = () => {
        Snackbar.show({
            text: 'Confirmed',
            backgroundColor: COLORS.success,
            duration: Snackbar.LENGTH_SHORT,
        });
    }
    const ShowSnackbarWarning = () => {
        Snackbar.show({
            text: "Something's wrong!",
            backgroundColor: COLORS.warning,
            duration: Snackbar.LENGTH_SHORT,
        });
    }
    const ShowSnackbarInfo = () => {
        Snackbar.show({
            text: "We're on it",
            backgroundColor: COLORS.info,
            duration: Snackbar.LENGTH_SHORT,
        });
    }
    const ShowSnackbarError = () => {
        Snackbar.show({
            text: 'Error Occured',
            backgroundColor: COLORS.danger,
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
            <View style={{flex:1,backgroundColor:colors.background}}>
                <Header title={'Snackbars'} titleLeft leftIcon={'back'}/>
                <ScrollView>
                    <View style={{...GlobalStyleSheet.container}}>
                        <View style={[GlobalStyleSheet.card,GlobalStyleSheet.shadow,{backgroundColor:colors.card}]}>
                            <View style={GlobalStyleSheet.cardBody}>
                                <ListStyle1
                                    onPress={() => ShowSnackbarSuccess()}
                                    arrowRight
                                    icon={<FontAwesome size={14} color={COLORS.white} name={'check'}/>}
                                    title={'Confirmation Snackbar'}
                                    />
                                <ListStyle1
                                    onPress={() => ShowSnackbarWarning()}
                                    arrowRight
                                    icon={<FontAwesome size={14} color={COLORS.white} name={'warning'}/>}
                                    title={'Warning Snackbar'}
                                    />
                                <ListStyle1
                                    onPress={() => ShowSnackbarInfo()}
                                    arrowRight
                                    icon={<FontAwesome size={14} color={COLORS.white} name={'refresh'}/>}
                                    title={'Loading Snackbar'}
                                    />
                                <ListStyle1
                                    onPress={() => ShowSnackbarError()}
                                    arrowRight
                                    icon={<FontAwesome size={14} color={COLORS.white} name={'close'}/>}
                                    title={'Error Snackbar'}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


export default Snackbars;