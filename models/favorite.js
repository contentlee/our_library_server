import { getDb } from "../libs/database";

class Favorite {
  static createField(user_id) {
    const db = getDb();
    return db
      .collection("favorite")
      .insertOne({ user_id: user_id, favorite_books: [] })
      .then(() => true)
      .catch(() => false);
  }

  static findIds(user_id) {
    const db = getDb();
    return db.collection("favorite").findOne({ user_id: user_id });
  }

  static findAll(book_ids) {
    const db = getDb();
    return db
      .collection("books")
      .find({ _id: { $in: book_ids } })
      .toArray();
  }

  static addOne(user_id, book_id) {
    const db = getDb();
    return db
      .collection("favorite")
      .updateOne({ user_id: user_id }, { $addToSet: { favorite_books: parseInt(book_id) } });
  }

  static deleteOne(user_id, book_id) {
    const db = getDb();
    return db.collection("favorite").updateOne({ user_id: user_id }, { $pull: { favorite_books: parseInt(book_id) } });
  }
}

export default Favorite;
