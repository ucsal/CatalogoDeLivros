// flow
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { HOST_ADDRESS } from "@env";
// components
import { TouchableOpacity, StyleSheet } from "react-native";
//assets
import { Theme } from "../../../assets/index";
import Icon from "react-native-vector-icons/FontAwesome";

export const addBookToFavorite = async (item, setIsFavorite) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `http://192.168.1.69:3000/books/addBook/${item.id}/ToFavorites`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201) {
      setIsFavorite(true);
      console.warn(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFromFavorites = async (item, setIsFavorite) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(
      `http://192.168.1.69:3000/books/removeBook/${item.id}/FromFavorites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 204) {
      setIsFavorite(false);
      console.warn("Book Successfully Removed From Your Favorites");
    }
  } catch (error) {
    console.log(error);
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
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `http://192.168.1.69:3000/favorites/addAnnotationToBook`,
      {
        annotation: annotation,
        bookId: bookId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 204) {
      console.warn("Annotation Successfully Add To Book");
    }
  } catch (error) {
    console.log(error);
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
