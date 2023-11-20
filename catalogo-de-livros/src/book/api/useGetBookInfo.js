// flow
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
// @ts-ignore
import { API_HOST_ADDRESS } from "../../../env";
import { getUserFavorites } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

const useGetBooksList = (bookId) => {
  const [bookData, setBookData] = useState();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const userId = await AsyncStorage.getItem("userId");
          const userFavorites = await getUserFavorites(userId);
          const favoritesToSend = userFavorites.map(
            (favorite) => favorite.bookid
          );
          const response = await axios.post(
            `${API_HOST_ADDRESS}/books/book/${bookId}`,
            {
              favorites: favoritesToSend,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data != undefined) {
            setBookData(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [bookId])
  );

  return bookData;
};

export default useGetBooksList;
