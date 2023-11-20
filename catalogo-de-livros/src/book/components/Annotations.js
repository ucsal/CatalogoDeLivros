// flow
import React from "react";
// components
import { Text, View, StyleSheet } from "react-native";

const Annotations = ({ annotationsArray }) => {
  if (annotationsArray && annotationsArray.length > 0) {
    const annotations = annotationsArray[0].annotations;

    return (
      <View style={styles.annotationsContainer}>
        {annotations.map((annotation, index) => (
          <Text style={styles.annotation} key={index}>
            {annotation}
          </Text>
        ))}
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  annotationsContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
    textAlign: "center",
    alignItems: "center",
  },
  annotation: {
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
  },
});

export default Annotations;
