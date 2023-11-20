import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydb.db");

const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, created_at TEXT);",
      [],
      () => console.log("Tabela de usuários criada com sucesso"),
      (error) => console.error("Erro ao criar tabela de usuários:", error)
    );

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER, bookid INTEGER, annotations TEXT);",
      [],
      () => console.log("Tabela de favoritos criada com sucesso"),
      (error) => console.error("Erro ao criar tabela de favoritos:", error)
    );
  });
};

const insertUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?);",
        [username, email, password, new Date().toISOString()],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export { db, setupDatabase, insertUser };
