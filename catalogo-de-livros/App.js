import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { db, setupDatabase } from "./src/database";
import { MainContainer } from "./src/MainContainer";

export default function App() {
  const [isDatabaseInitialized, setIsDatabaseInitialized] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await setupDatabase();
        setIsDatabaseInitialized(true);
      } catch (error) {
        console.error("Failed to initialize database:", error);
      }
    };

    if (!isDatabaseInitialized) {
      initializeDatabase();
    }
  }, [isDatabaseInitialized]);

  if (!isDatabaseInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <MainContainer />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
