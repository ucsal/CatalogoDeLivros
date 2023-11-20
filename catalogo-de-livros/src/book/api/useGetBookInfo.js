// flow
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
// @ts-ignore
import { API_HOST_ADDRESS } from "../../../env";

const useGetBooksList = (bookId) => {
  const [bookData, setBookData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${API_HOST_ADDRESS}/books/book/${bookId}`,
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
  }, [bookId]);

  return bookData;
};

export default useGetBooksList;
