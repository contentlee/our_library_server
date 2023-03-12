import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.get("Authorization").split("")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch {
    return res.status(500).json({ message: "사용자 인증에 실패하였습니다." });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "유효하지 않은 사용자입니다." });
  }

  req.user_id = decodedToken.user_id;
  next();
};
