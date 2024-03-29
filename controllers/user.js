import Favorite from "../models/favorite";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { encrypt } from "../utils/encrypt";

export const getName = (req, res) => {
  return res.status(200).json({ user_name: req.user_name });
};

export const signIn = (req, res) => {
  if (req.body.user_id.length < 3 || req.body.user_id.length > 10)
    return res.status(400).json({ message: "아이디의 글자수를 확인해주세요.(3~10자)" });

  const user = new User(req.body);
  user
    .findById()
    .then(async (data) => {
      if (!data) return res.status(400).json({ message: "아이디가 존재하지 않습니다." });
      if (data.pwd !== encrypt(user.user_info.pwd))
        return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
      const token = jwt.sign({ user_id: data.user_id, user_name: data.user_name }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token: token, message: "인증에 성공하였습니다." });
    })
    .catch(() => res.status(500).json({ message: "인증에 실패하였습니다." }));
};

export const signUp = async (req, res) => {
  if (req.body.user_id.length < 3 || req.body.user_id.length > 10)
    return res.status(400).json({ message: "아이디의 글자수를 확인해주세요.(3~10자)" });
  if (req.body.user_name.length < 3 || req.body.user_name.length > 10)
    return res.status(400).json({ message: "닉네임의 글자수를 확인해주세요.(3~10자)" });

  const user = new User(req.body);
  if (!(await user.checkDuplication({ user_id: user.user_info.user_id }))) {
    return res.status(400).json({ message: "중복된 아이디가 존재합니다." });
  }
  if (!(await Favorite.createField(user.user_info.user_id))) {
    return res.status(400).json({ message: "계정 생성 중 오류가 발생하였습니다." });
  }
  user
    .createOne()
    .then(() => res.status(200).json({ message: "계정 생성에 성공하였습니다." }))
    .catch(() => res.status(500).json({ message: "계정 생성에 실패하였습니다." }));
};

export const changeUserName = (req, res) => {
  User.changeName(req.user_id, req.body.new_name)
    .then(() => {
      const token = jwt.sign({ user_id: req.user_id, user_name: req.body.new_name }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.status(200).json({ token: token, message: "사용자명 변경에 성공하였습니다." });
    })
    .catch(() => res.status(500).json({ message: "사용자명 변경에 실패하였습니다." }));
};

export const changeUserPwd = (req, res) => {
  req.body.user_id = req.user_id;
  const user = new User(req.body);
  user
    .findById()
    .then((data) => {
      const cur_enc_pwd = encrypt(user.user_info.pwd);
      const new_enc_pwd = encrypt(user.user_info.new_pwd);
      if (data.pwd !== cur_enc_pwd) return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
      if (cur_enc_pwd == new_enc_pwd)
        return res.status(400).json({ message: "현재 비밀번호와 변경될 비밀번호가 같습니다." });
      user.user_info.new_pwd = new_enc_pwd;

      user
        .changePwd()
        .then(() => res.status(200).json({ message: "비밀번호 변경에 성공하였습니다." }))
        .catch(() => res.status(500).json({ message: "비밀번호 변경에 실패하였습니다." }));
    })
    .catch(() => res.status(500).json({ message: "비밀번호 변경에 실패하였습니다." }));
};
