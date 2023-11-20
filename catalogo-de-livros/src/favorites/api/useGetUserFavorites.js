// flow
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_HOST_ADDRESS } from "../../../env";
import { getUserFavorites } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

const useGetUserFavorites = () => {
  const [books, setBooks] = useState([]);

  const fetchUserFavorites = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
      const userFavorites = await getUserFavorites(userId);
      const favoritesToSend = userFavorites.map((favorite) => favorite.bookid);
      const response = await axios.post(
        `${API_HOST_ADDRESS}/books/getUserFavoriteBooks`,
        { favorites: favoritesToSend },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Erro ao obter favoritos do usuário:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserFavorites();
    }, [])
  );

  return books;
};

export default useGetUserFavorites;
