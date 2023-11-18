import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";
import themeContext from "../constants/themeContext";
import StackNavigator from "./StackNavigator";


const Routes = () => {
  
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const authContext = React.useMemo(() => ({
    setDarkTheme: () => {
      setIsDarkTheme(true);
    },
    setLightTheme: () => {
      setIsDarkTheme(false);
    }
  }), []);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: COLORS.background,
      title : COLORS.title,
      card : COLORS.card,
      text : COLORS.text,
      textLight : COLORS.textLight,
      input : COLORS.input,
      borderColor : COLORS.borderColor,
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
      background: COLORS.darkBackground,
      title : COLORS.darkTitle,
      card : COLORS.darkCard,
      text : COLORS.darkText,
      textLight : COLORS.darkTextLight,
      input : COLORS.darkInput,
      borderColor : COLORS.darkBorder,
    }
  }
  
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme; 

  return (
    // "sk_test_51KLWdxFph9d8jVgTUo1OE7m1kOJPa07z6R9Y9FyKVtw2omRLajIUy42oHpfTIWeFsKUWgmT2zf0LBpEJ7m2wEp4B009EgAiyaY"
    <SafeAreaProvider>
      <themeContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <StackNavigator/>
        </NavigationContainer>
      </themeContext.Provider>
    </SafeAreaProvider>
  );
  
};
export default Routes;
