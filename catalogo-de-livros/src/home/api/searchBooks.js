// flow
import axios from "axios";
// @ts-ignore
import { HOST_ADDRESS } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const searchBooks = async (searchQuery) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `http://192.168.1.69:3000/books/search`,
      {
        query: searchQuery,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default searchBooks;
