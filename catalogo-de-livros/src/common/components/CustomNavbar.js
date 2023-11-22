// flow
import React from "react";
import { useNavigation } from "@react-navigation/native";
// components
import { View, StyleSheet } from "react-native";
// @ts-ignore
import CustomButton from "./CustomButton";

const CustomNavbar = () => {
  const navigation = useNavigation();

  const buttons = [
    {
      text: "Inicio",
      iconName: "home",
      onPress: () => navigation.navigate("HomePage"),
    },
    {
      text: "Configurações",
      iconName: "cog",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      text: "Favoritos",
      iconName: "user",
      onPress: () => navigation.navigate("Favorites"),
    },
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <CustomButton
          key={index}
          onPress={button.onPress}
          text={button.text}
          type="NAVBAR"
          iconName={button.iconName}
          bgColor={undefined}
          fgColor={undefined}
          style={styles.button}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "37%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 0,
    borderRadius: 35,
  },
});

export default CustomNavbar;
