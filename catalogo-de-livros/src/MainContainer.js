// flow
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// components
import { createStackNavigator } from "@react-navigation/stack";
import { SignupPage } from "./user";

const Stack = createStackNavigator();

export function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen
            name="Signup"
            component={SignupPage}
            options={{ headerShown: false }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
