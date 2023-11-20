// flow
import React from "react";
// components
import { Text, StyleSheet, Pressable } from "react-native";
// assets
import Icon from "react-native-vector-icons/FontAwesome";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  iconName,
}) => {
  const containerStyle = type === "PRIMARY" ? styles.container_PRIMARY : {};

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        containerStyle,
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      {iconName && (
        <Icon name={iconName} size={24} color={fgColor || "black"} />
      )}

      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_TERTIARY: {
    color: "grey",
  },

  container_NAVBAR: {
    width: "30%",
    backgroundColor: "#FF5733",
  },

  text_NAVBAR: {
    color: "black",
  },
});

export default CustomButton;
