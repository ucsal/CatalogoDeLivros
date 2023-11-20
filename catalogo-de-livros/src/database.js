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
          const userId = result.insertId;
          resolve(userId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const addBookToFavorites = (userId, bookId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO favorites (userid, bookid) VALUES (?, ?);",
        [userId, bookId],
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

const removeBookFromFavorites = (userId, bookId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM favorites WHERE userid = ? AND bookid = ?;",
        [userId, bookId],
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

const addAnnotationToBook = (annotation, userId, bookId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE favorites SET annotations = ? WHERE userid = ? AND bookid = ?;",
        [annotation, userId, bookId],
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

const getUserFavorites = (userId) => {
  console.log("database " + userId);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM favorites WHERE userid = ?;",
        [userId],
        (_, result) => {
          const userFavorites = [];
          const len = result.rows.length;
          for (let i = 0; i < len; i++) {
            userFavorites.push(result.rows.item(i));
          }
          resolve(userFavorites);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const getUserByUsernameAndPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id FROM users WHERE username = ? AND password = ?;",
        [username, password],
        (_, result) => {
          if (result.rows.length > 0) {
            const userId = result.rows.item(0).id;
            resolve(userId);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const consultarUsuarios = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users;",
      [],
      (_, result) => {
        const users = result.rows.raw();
        console.log("Usuários:", users);
      },
      (_, error) => {
        console.error("Erro ao selecionar usuários:", error);
      }
    );
  });
};

const consultarFavoritos = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM favorites;",
      [],
      (_, result) => {
        const favorites = result.rows.raw();
        console.log("Favoritos:", favorites);
      },
      (_, error) => {
        console.error("Erro ao selecionar favoritos:", error);
      }
    );
  });
};

export {
  db,
  setupDatabase,
  insertUser,
  addBookToFavorites,
  removeBookFromFavorites,
  addAnnotationToBook,
  getUserFavorites,
  getUserByUsernameAndPassword,
  consultarUsuarios,
  consultarFavoritos,
};
