// flow
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_HOST_ADDRESS } from "../../../env";
import { getUserFavorites } from "../../database";

const useGetUserFavorites = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getUserFavoritesData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        const userFavorites = await getUserFavorites(userId);
        const favoritesToSend = userFavorites.map(
          (favorite) => favorite.bookid
        );
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

    getUserFavoritesData();
  }, []);

  return books;
};

export default useGetUserFavorites;
