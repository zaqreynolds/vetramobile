import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
// import migrations from './migrations'
import schema from "./schema";
import { User } from "./models/User";

const adapter = new SQLiteAdapter({
  dbName: "vetra",
  schema,
  //   migrations: {
  //     migrations: [],
  //     version: 1,
  //   },
  jsi: true,
});

const database = new Database({ adapter, modelClasses: [User] });

export default database;
