import express from "express";

import methodOverride from "method-override";

import { connectDb } from "./libs/database";

import LibraryRouter from "./routes/library";
import UserRouter from "./routes/user";
import FavoriteRouter from "./routes/favorite";
import CommentRouter from "./routes/comment";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN_SUB_DOMAIN);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(LibraryRouter);
app.use(UserRouter);
app.use(FavoriteRouter);
app.use(CommentRouter);

connectDb(() => {
  app.listen(8080);
  console.log("connected");
});
