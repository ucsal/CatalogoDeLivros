// flow
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// components
import { createStackNavigator } from "@react-navigation/stack";
import { SignupPage, SignInPage } from "./user";
import { HomePage } from "./home";
import { Settings } from "./settings";
import { BookScreen } from "./book";
import { FavoriteBooksPage } from "./favorites";

const Stack = createStackNavigator();

export function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookScreen"
            component={BookScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoriteBooksPage}
            options={{ headerShown: false }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
