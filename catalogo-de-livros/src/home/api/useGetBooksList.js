// flow
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
// @ts-ignore
import { HOST_ADDRESS } from "@env";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const useGetBooksList = () => {
  const [data, setData] = useState([]);

  const fetchBooksList = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `http://192.168.1.69:3000/books/loadBooks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBooksList();
    }, [])
  );
  return { data, fetchBooksList };
};

export default useGetBooksList;
