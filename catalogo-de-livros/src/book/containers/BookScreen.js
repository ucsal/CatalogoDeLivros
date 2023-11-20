// flow
import React from "react";
// components
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { BookDetails } from "../../common";
import { CustomNavbar } from "../../common";
// api
import useGetBookInfo from "../api/useGetBookInfo";
// assets
import { Theme } from "../../../assets";

export default function BookScreen({ route }) {
  const { itemId } = route.params;
  const bookData = useGetBookInfo(itemId);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.BookDetails_container}>
          {bookData !== undefined && <BookDetails bookData={bookData} />}
        </View>
      </ScrollView>
      <CustomNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  BookDetails_container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignSelf: "center",
    width: "100%",
  },
});
