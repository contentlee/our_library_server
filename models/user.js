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

  findById() {
    const db = getDb();
    return db.collection("user").findOne({ user_id: this.user_info.user_id });
  }

  async createOne() {
    this.user_info.authority = "general";
    this.user_info.pwd = encrypt(this.user_info.pwd);
    return this.db.collection("user").insertOne(this.user_info);
  }

  static changeName(user_id, new_name) {
    const db = getDb();
    return db.collection("user").updateOne({ user_id: user_id }, { $set: { user_name: new_name } });
  }

  changePwd(new_pwd) {
    return this.db
      .collection("user")
      .updateOne({ user_id: this.user_info.user_id }, { $set: { pwd: this.user_info.new_pwd } });
  }
}

export default User;
