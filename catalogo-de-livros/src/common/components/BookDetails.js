// flow
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_HOST_ADDRESS } from "../../../env";
// components
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  FavoriteButton,
  addAnnotation,
  addBookToFavorite,
  removeFromFavorites,
} from "./handleFavoritesActions";
import CustomModal from "./Modal";
import CommentForm from "./CommentForm";
import { Annotations } from "../../book";
import { getUserFavorites } from "../../database";

const BookDetails = ({ bookData }) => {
  const [isFavorite, setIsFavorite] = useState(bookData.isFavorite);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isWarningModalVisible, setWarningModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isAnnotationFormVisible, setAnnotationFormVisible] = useState(false);

  const showWarningModal = (message) => {
    setWarningModalVisible(true);
    setModalMessage(message);
  };

  const hideWarningModal = () => {
    setWarningModalVisible(false);
  };

  function removeHtmlFromString(str) {
    if (str && str.trim() !== "") {
      return str.replace(/<\/?[^>]+(>|$)/g, "");
    }
    return "";
  }

  useFocusEffect(
    useCallback(() => {
      setIsFavorite(bookData.isFavorite);
    }, [bookData.isFavorite])
  );

  const handleAddToFavorite = async () => {
    await addBookToFavorite(bookData, setIsFavorite);
  };

  const handleRemoveFromFavorites = async () => {
    await removeFromFavorites(bookData, setIsFavorite);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleOpenAnnotationForm = async (bookId) => {
    try {
      if (isFavorite) {
        setAnnotationFormVisible(true);
      } else {
        showWarningModal(
          "Você precisa ter esse livro nos seus favoritos para adicionar alguma anotação"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseAnnotationForm = () => {
    setAnnotationFormVisible(false);
  };

  const handleSendAnnotation = async (annotationText, bookId) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const userFavorites = await getUserFavorites(userId);
      const prevAnnotations = userFavorites
        .filter((favorite) => favorite.bookid === bookId)
        .map((favorite) => favorite.annotations);
      const newAnnotations = prevAnnotations + ", " + annotationText;
      console.log(newAnnotations);
      await addAnnotation(newAnnotations, bookId);
      setAnnotationFormVisible(!isAnnotationFormVisible);
      console.log("Comentário enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o comentário:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.BookDetailView}>
        <FavoriteButton
          isFavorite={isFavorite}
          onPress={isFavorite ? handleRemoveFromFavorites : handleAddToFavorite}
          style={styles.BookDetailHeaderButtons}
          isShowing={true}
        />
        {bookData.volumeInfo.imageLinks &&
        bookData.volumeInfo.imageLinks.smallThumbnail ? (
          <Image
            source={{
              uri: bookData.volumeInfo.imageLinks.smallThumbnail,
            }}
            style={styles.image}
            onError={(e) =>
              console.log("Erro ao carregar imagem", e.nativeEvent.error)
            }
          />
        ) : (
          <Text>Imagem Indisponível</Text>
        )}
        <Text style={styles.bookTitle}>{bookData.volumeInfo.title}</Text>
        <Text>
          {bookData.volumeInfo.authors
            ? bookData.volumeInfo.authors.join(", ")
            : "Nenhum autor disponível"}
        </Text>
        <CustomModal
          isVisible={isWarningModalVisible}
          message={modalMessage}
          onClose={hideWarningModal}
        />
        <View style={styles.bookSinopses}>
          <Text style={styles.bookSinopsesTitle}>Sinopse</Text>
          <Text style={styles.bookSinopsesText}>
            {showFullDescription
              ? removeHtmlFromString(bookData.volumeInfo.description)
              : `${removeHtmlFromString(bookData.volumeInfo.description).slice(
                  0,
                  200
                )}...`}
          </Text>

          <TouchableOpacity onPress={toggleDescription}>
            {!showFullDescription ? (
              <Text style={styles.showMoreText}>Mostrar Mais</Text>
            ) : (
              <Text style={styles.showMoreText}>Mostrar Menos</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleOpenAnnotationForm(bookData.id)}>
          <Text style={styles.showMoreText}>Adicionar Anotação</Text>
        </TouchableOpacity>
        <CommentForm
          isVisible={isAnnotationFormVisible}
          onClose={handleCloseAnnotationForm}
          onSendAnnotation={(annotationText) =>
            handleSendAnnotation(annotationText, bookData.id)
          }
        />
      </View>
      <Annotations annotationsArray={bookData.annotations} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
  },
  BookDetailHeaderButtons: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  BookDetailView: {
    alignItems: "center",
    paddingTop: 40,
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 15,
  },
  bookTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  bookSinopses: {
    marginTop: 25,
    alignSelf: "flex-start",
  },
  bookSinopsesTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  bookSinopsesText: {
    opacity: 0.7,
    textAlign: "justify",
  },
  showMoreText: {
    marginTop: 5,
  },
});

export default BookDetails;
