import React from 'react';
import { SafeAreaView, useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import BestItems from './BestItems';
import PopularItems from './PopularItems';
import SaleItems from './SaleItems';
import { useTheme } from '@react-navigation/native';

const renderScene = SceneMap({
    Popular: PopularItems,
    BestProducts: BestItems,
    FlashSale: SaleItems,
});

const Products = () => {

    const {colors} = useTheme();
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Popular', title: 'Popular' },
        { key: 'BestProducts', title: 'Best Products' },
        { key: 'FlashSale', title: 'Flash Sale' },
    ]);

    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
            <View
                style={{
                    flex:1,
                    backgroundColor:colors.background,
                }}
            >
                <Header 
                    leftIcon={'back'}
                    title={'Products'}
                    rightIcon={'more'}
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


export default Products;
