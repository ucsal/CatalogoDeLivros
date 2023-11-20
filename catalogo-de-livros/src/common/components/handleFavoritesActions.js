// flow
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST_ADDRESS } from "../../../env";
// components
import { TouchableOpacity, StyleSheet } from "react-native";
//assets
import { Theme } from "../../../assets/index";
import Icon from "react-native-vector-icons/FontAwesome";
// database
import {
  addBookToFavorites,
  removeBookFromFavorites,
  addAnnotationToBook,
} from "../../database";

export const addBookToFavorite = async (item, setIsFavorite) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const result = await addBookToFavorites(userId.toString(), item.id);
    console.log(result);
    setIsFavorite(true);
    console.warn("Livro adicionado aos favoritos com sucesso.");
  } catch (error) {
    console.error("Erro ao adicionar livro aos favoritos:", error);
  }
};

export const removeFromFavorites = async (item, setIsFavorite) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    await removeBookFromFavorites(userId.toString(), item.id);
    setIsFavorite(false);
    console.warn("Livro removido dos favoritos com sucesso.");
  } catch (error) {
    console.error("Erro ao remover livro dos favoritos:", error);
  }
};

export const FavoriteButton = ({
  isFavorite,
  onPress,
  style = {},
  isShowing = false,
}) => {
  return isShowing ? (
    <TouchableOpacity onPress={onPress} style={style}>
      {isFavorite.toString() === "true" ? (
        <Icon name="heart" size={18} color="#fff" style={styles.bookItemIcon} />
      ) : (
        <Icon
          name="heart-o"
          size={18}
          color="#fff"
          style={styles.bookItemIcon}
        />
      )}
    </TouchableOpacity>
  ) : null;
};

export const addAnnotation = async (annotation, bookId) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    await addAnnotationToBook(annotation, userId, bookId);
    console.warn("Anotação adicionada ao livro com sucesso.");
  } catch (error) {
    console.error("Erro ao adicionar anotação ao livro:", error);
  }
};

const styles = StyleSheet.create({
  bookItemIcon: {
    backgroundColor: Theme.colors.primary,
    color: "black",
    textAlign: "left",
    width: 25,
    height: 25,
  },
});
