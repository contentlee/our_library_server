import { getDb } from "../libs/database";

class Comment {
  constructor(info) {
    this.info = info;
    this.db = getDb();
  }

  static checkCommentIdByUserId(comment_id, user_id) {
    const db = getDb();
    return db
      .collection("comments")
      .findOne({ _id: parseInt(comment_id) })
      .then((data) => {
        if (data.user_id !== user_id) return [403, false];
        return [200, true];
      })
      .catch(() => [500, false]);
  }

  increaseCount() {
    return this.db.collection("counter").findOneAndUpdate(
      {
        name: "comments",
      },
      {
        $inc: {
          count: 1,
        },
      }
    );
  }

  static findByBookId(book_id) {
    const db = getDb();
    return db
      .collection("comments")
      .find({ book_id: parseInt(book_id) })
      .toArray();
  }

  static findByUserId(user_id) {
    const db = getDb();
    return db.collection("comments").find({ user_id: user_id }).toArray();
  }

  createOne() {
    return this.db.collection("comments").insertOne(this.info);
  }

  editOne() {
    return this.db
      .collection("comments")
      .updateOne(
        { _id: parseInt(this.info.comment_id) },
        { $set: { comment: this.info.comment, edit_date: new Date() } }
      );
  }

  static deleteOne(comment_id) {
    const db = getDb();
    return db.collection("comments").deleteOne({ _id: parseInt(comment_id) });
  }
}

export default Comment;
