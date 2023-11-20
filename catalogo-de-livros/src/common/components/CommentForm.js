// flow
import React, { useState } from "react";
// componets
import { Modal, TextInput, Button, View, Text, StyleSheet } from "react-native";

const CommentForm = ({ isVisible, onClose, onSendAnnotation }) => {
  const [annotationText, setAnnotationText] = useState("");

  const handleSendAnnotation = () => {
    onSendAnnotation(annotationText);
    setAnnotationText("");
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Adicionar Anotação</Text>
          <TextInput
            multiline
            placeholder="Digite sua anotação..."
            style={styles.annotationInput}
            value={annotationText}
            onChangeText={(text) => setAnnotationText(text)}
          />
          <Button title="Enviar" onPress={handleSendAnnotation} />
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  annotationInput: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default CommentForm;
