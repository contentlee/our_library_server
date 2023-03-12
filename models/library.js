import { getDb } from "../libs/database";

export class Library {
  constructor(info) {
    this.info = info;
    this.db = getDb();
  }

  static checkBookIdByUserId(book_id, user_id) {
    const db = getDb();
    return db
      .collection("books")
      .findOne({ _id: parseInt(book_id) })
      .then((data) => {
        if (data.user_id !== user_id) return [403, false];
        return [200, true];
      })
      .catch(() => [500, false]);
  }

  increaseCount() {
    return this.db.collection("counter").findOneAndUpdate(
      {
        name: "book",
      },
      {
        $inc: {
          count: 1,
        },
      }
    );
  }

  static findAll() {
    const db = getDb();
    return db.collection("books").find().toArray();
  }

  static findById(id) {
    const db = getDb();
    return db.collection("books").findOne({
      _id: parseInt(id),
    });
  }

  static findByWord(word) {
    const db = getDb();
    const condition = [
      {
        $search: {
          index: "default",
          text: {
            query: word,
            path: ["title", "subtitle", "author", "publisher"],
          },
        },
      },
    ];
    return db.collection("books").aggregate(condition).toArray();
  }

  createOne() {
    return this.db.collection("books").insertOne(this.info);
  }

  editOne(id) {
    return this.db.collection("books").updateOne({ _id: parseInt(id) }, { $set: this.info });
  }

  static deleteOne(id) {
    return this.db.collection("books").deleteOne({ _id: parseInt(id) });
  }
}
