import { getDb } from "../utils/database";

export class Library {
  constructor(info) {
    this.info = info;
  }

  findCount() {
    const db = getDb();
    return db
      .collection("counter")
      .findOne({
        name: "book",
      })
      .then((res) => {
        this.info._id = res.totalPost + 1;
      })
      .catch(() => console.log("book id를 불러오는데 실패하였습니다."));
  }

  increaseCount() {
    const db = getDb();
    return db
      .collection("counter")
      .updateOne(
        {
          name: "book",
        },
        {
          $inc: {
            totalPost: 1,
          },
        }
      )
      .then((res) => res)
      .catch((err) => console.log("book id를 저장하는데 실패하였습니다."));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("books")
      .find()
      .toArray()
      .then((res) => res)
      .catch((err) => console.log("데이터를 가져오는데 실패하였습니다."));
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("books")
      .findOne({
        _id: parseInt(id),
      })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static deleteOne(id) {
    const db = getDb();
    return db
      .collection("books")
      .deleteOne({ _id: parseInt(id) })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static findByWord(word) {
    const db = getDb();
    const condition = [
      {
        $search: {
          index: "search_book",
          text: {
            query: word,
            path: ["title", "subtitle", "author", "publisher"],
          },
        },
      },
    ];
    return db
      .collection("books")
      .aggregate(condition)
      .toArray()
      .then((res) => {
        return res;
      })
      .catch(() => {
        console.log();
      });
  }

  createOne() {
    const db = getDb();
    return this.findCount()
      .then(() => {
        return db
          .collection("books")
          .insertOne(this.info)
          .then((res) => res)
          .catch((err) => console.log(err));
      })
      .then((res) => {
        this.increaseCount();
        return res;
      })
      .catch((err) => console.log(err));
  }

  editOne(id) {
    const db = getDb();
    return db
      .collection("books")
      .updateOne({ _id: parseInt(id) }, { $set: this.info })
      .then((res) => res)
      .catch((err) => {
        console.log(err, "model");
      });
  }
}
