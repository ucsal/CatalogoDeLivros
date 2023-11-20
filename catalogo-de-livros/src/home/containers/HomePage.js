// components
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { CustomNavbar } from "../../common";
import { BookItem } from "../../common";
// assets
import { Theme } from "../../../assets";
import Icon from "react-native-vector-icons/FontAwesome";
// flow
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
// api
import useGetBooksList from "../api/useGetBooksList";
import searchBooks from "../api/searchBooks";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const books = useGetBooksList();

  useFocusEffect(
    React.useCallback(() => {
      books.fetchBooksList();
    }, [])
  );

  const handleSearch = async () => {
    try {
      const result = await searchBooks(searchQuery);
      setSearchedBooks(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header_container}>
          <Text style={styles.header_text1}>Welcome!</Text>
          <Text style={styles.header_text2}>
            What do you want to read today?
          </Text>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search"
            clearButtonMode="always"
            style={styles.searchBar}
            autoCapitalize="none"
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon
              name="search"
              size={25}
              color="#fff"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={searchedBooks.length > 0 ? searchedBooks : books.data}
          renderItem={({ item }) => (
            <BookItem key={item.id.toString()} item={item} isShowing={false} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatList}
        />
      </SafeAreaView>
      <CustomNavbar />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  header_container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  header_text1: {
    fontSize: 20,
  },
  header_text2: {
    fontSize: 30,
  },
  flatList: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  searchBar: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: Theme.colors.primary,
    color: "#fff",
    borderRadius: 8,
  },
  searchIcon: {
    backgroundColor: Theme.colors.primary,
    padding: 10,
    borderRadius: 8,
    color: "black",
  },
});
