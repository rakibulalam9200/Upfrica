import React from 'react';
import { SafeAreaView, View, useWindowDimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import AllCart from './AllCart';
import Canceled from './Canceled';
import Completed from './Completed';
import OnDelivery from './OnDelivery';


const renderScene = SceneMap({
    All: AllCart,
    OnDelivery: OnDelivery,
    Completed: Completed,
    Canceled: Canceled,
});


const Orders = () => {

    const {colors} = useTheme();

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'All', title: 'All' },
        { key: 'OnDelivery', title: 'On Delivery' },
        { key: 'Completed', title: 'Completed' },
        { key: 'Canceled', title: 'Canceled' },
    ]);

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
                    title={'Orders'}
                    rightIcon={'more'}
                    rightIcon2={'search'}
                />
                <TabView
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            activeColor={colors.title}
                            inactiveColor={colors.textLight}
                            indicatorStyle={{ backgroundColor: COLORS.primary}}
                            labelStyle={{...FONTS.h6,...FONTS.fontTitle,textTransform:'capitalize'}}
                            scrollEnabled={true}
                            tabStyle={{width:120}}
                            style={{ 
                                backgroundColor: colors.card, 
                                elevation : 0 ,
                                borderBottomWidth: 1,
                                shadowOpacity:0,
                                borderBottomColor: colors.borderColor
                            }}
                        />
                    )}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </SafeAreaView>
    );
};


export default Orders;