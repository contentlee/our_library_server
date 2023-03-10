import express from "express";
import session from "express-session";

import passport from "passport";

import methodOverride from "method-override";

import { connectDb } from "./utils/database";
import LibraryRouter from "./routes/library";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// app.use(passport.initialize());
// app.use(session({ secret: "비밀코드", resave: true, saveUninitialized: false }));
// app.use(passport.session());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(LibraryRouter);

connectDb(() => {
  app.listen(8080);
});
