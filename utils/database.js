import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;

const connectDb = (callback) => {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    .then((client) => {
      db = client.db("library");
      callback();
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (db) {
    return db;
  }
  throw "No database";
};

export { getDb, connectDb };
