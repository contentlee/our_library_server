import crypto from "crypto";

export const encrypt = (pwd) => {
  const encrypted = crypto.pbkdf2Sync(pwd, process.env.CRYPTO_SALT, 10000, 64, "sha512");
  return encrypted.toString("base64");
};
