import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import HomeScreen from "../screens/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { Screens } from "../config/constants";
import { colors } from "../../colors";
import BookDetails from "../screens/BookDetails/BookDetails";
import ManageBook from "../screens/ManageBook/ManageBook";
import Auth from "../screens/Auth/Auth";
import { useAppContextActions } from "../lib/contexts/AppContext";
import { getApiToken } from "../lib/helpers/helpers";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { setApiToken } = useAppContextActions();
  useEffect(() => {
    (async () => {
      const apiToken = await getApiToken();
      setApiToken(apiToken);
    })();
  }, [setApiToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={Screens.HOME} component={HomeScreen} />
        <Stack.Screen name={Screens.AUTH} component={Auth} />
        <Stack.Screen name={Screens.MANAGE_BOOK} component={ManageBook} />
        <Stack.Screen name={Screens.BOOK_DETAILS} component={BookDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = {
  contentStyle: {
    backgroundColor: colors.background,
  },
  headerLargeTitle: true,
  headerBackTitleVisible: false,
  headerTintColor: colors.text,
  headerTitleStyle: { color: colors.text }, 
  headerStyle: { backgroundColor: colors.background },
};
