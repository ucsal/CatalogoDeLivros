// flow
import React from "react";
// components
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomModal = ({ isVisible, message, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            maxWidth: "75%",
            borderWidth: 2,
            borderColor: "#D45555",
          }}
        >
          <Text style={styles.text}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
            <Text style={{ color: "blue" }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});

export default CustomModal;
