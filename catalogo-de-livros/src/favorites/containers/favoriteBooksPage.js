// components
import { SafeAreaView, View, StyleSheet, Text, FlatList } from "react-native";
import { BookItem, CustomNavbar } from "../../common";
// assets
import { Theme } from "../../../assets";
// api
// @ts-ignore
import useGetUserFavorites from "../api/useGetUserFavorites";

export default function FavoriteBooksPage() {
  const favoriteBooks = useGetUserFavorites();
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.favortes_header}>
          <Text style={styles.favorites_text}>Favoritos</Text>
        </View>
        <FlatList
          data={favoriteBooks}
          renderItem={({ item }) => <BookItem item={item} isShowing={true} />}
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
    flex: 1,
    backgroundColor: Theme.colors.primary,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  favortes_header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  favorites_text: {
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
});
