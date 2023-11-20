// flow
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// components
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { CustomButton } from "../../common";
import { CustomNavbar } from "../../common";
// assets
import { Theme } from "../../../assets";

export default function Settings() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
    navigation.navigate("SignIn");
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Text style={styles.settings_text}>Settings</Text>
          <CustomButton onPress={handleLogout} text="Logout" type="PRIMARY" />
        </View>
      </SafeAreaView>
      <CustomNavbar />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  settings_text: {
    textAlign: "left",
    fontSize: 30,
    marginVertical: 20,
  },
});
