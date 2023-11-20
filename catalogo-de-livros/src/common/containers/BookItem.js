// flow
import React, { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// components
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  FavoriteButton,
  addBookToFavorite,
  removeFromFavorites,
} from "../components/handleFavoritesActions";
// types
import PropTypes from "prop-types";

export const RootStackParamList = {
  Home: undefined,
  BookScreen: { itemId: "" },
};

const BookItem = ({ item, isShowing }) => {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);
  const navigation = useNavigation();
  const navigateToBookScreen = () => {
    navigation.navigate("BookScreen", { itemId: item.id });
  };

  useFocusEffect(
    useCallback(() => {
      setIsFavorite(item.isFavorite);
    }, [item.isFavorite])
  );

  const handleAddToFavorite = async () => {
    await addBookToFavorite(item, setIsFavorite);
  };

  const handleRemoveFromFavorites = async () => {
    await removeFromFavorites(item, setIsFavorite);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContainer_header}>
        <FavoriteButton
          isFavorite={isFavorite}
          onPress={isFavorite ? handleRemoveFromFavorites : handleAddToFavorite}
          isShowing={isShowing}
        />
      </View>
      <TouchableOpacity onPress={navigateToBookScreen}>
        {item.volumeInfo.imageLinks &&
        item.volumeInfo.imageLinks.smallThumbnail ? (
          <Image
            source={{
              uri: item.volumeInfo.imageLinks.smallThumbnail,
            }}
            style={styles.image}
            onError={(e) =>
              console.log("Erro ao carregar imagem", e.nativeEvent.error)
            }
          />
        ) : (
          <Text>Imagem Indisponível</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.book_title}>
        {formatString(item.volumeInfo.title, 18)}
      </Text>
      <Text>
        {formatString(
          item.volumeInfo.authors
            ? item.volumeInfo.authors.join(", ")
            : "Nenhum autor disponível",
          15
        )}
      </Text>
    </View>
  );
};

const formatString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
};

BookItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  itemContainer_header: {
    padding: 0,
    margin: 0,
    alignItems: "flex-end",
    width: "100%",
    marginBottom: 10,
  },
  itemContainer: {
    alignItems: "center",
    width: "50%",
    marginBottom: 15,
  },
  image: {
    borderRadius: 8,
    width: 150,
    height: 200,
    marginBottom: 15,
  },
  book_title: {
    textAlign: "center",
    fontWeight: "700",
  },
});

export default BookItem;
