export default {
  client: "sqlite3",
  connection: {
    filename: "./src/database/database.db"
  },

  migrations: {
    extensions: "ts",
    directory: "./src/database/migrations"
  },

  seeds: {
    extensions: "ts",
    directory: "./src/database/seeds"
  },

  useNullAsDefault: true,

  afterCreate: (connection: any, done: any) => {
    connection.run("PRAGMA foreign_keys = ON", done);
  }
  
};