// flow
import axios from "axios";
import { API_HOST_ADDRESS } from "../../../env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const searchBooks = async (searchQuery) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${API_HOST_ADDRESS}/books/search`,
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
