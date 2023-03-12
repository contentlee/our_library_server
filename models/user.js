import { getDb } from "../libs/database";
import { encrypt } from "../utils/encrypt";

class User {
  constructor(user_info) {
    this.user_info = user_info;
    this.db = getDb();
  }

  checkDuplication(cond) {
    return this.db
      .collection("user")
      .findOne(cond)
      .then((res) => {
        if (res) return false;
        else return true;
      })
      .catch(() => false);
  }

  findOne() {
    return this.db.collection("user").findOne({ user_id: this.user_info.user_id });
  }

  async createOne() {
    this.user.authority = "general";
    this.user.pwd = encrypt(this.user.pwd);
    return this.db.collection("user").insertOne(this.user);
  }

  static changeName(user_id, new_name) {
    const db = getDb();
    return db.collection("user").updateOne({ user_id: user_id }, { $set: { user_name: new_name } });
  }

  changePwd() {
    return this.db
      .collection("user")
      .updateOne({ user_id: this.user_info.user_id }, { $set: { pwd: this.user_info.pwd } });
  }
}

export default User;
