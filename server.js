const express = require("express");
const app = express();

const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.set("viewengine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.session());

const MongoClient = require("mongodb").MongoClient;

var db;
MongoClient.connect(
  "mongodb+srv://musicology:musicology@cluster0.asaci.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  function (error, client) {
    if (error) return console.log(error);

    db = client.db("musicology");

    app.use("/public", express.static("public"));

    app.get("/", function (req, res) {
      res.sendFile(__dirname + "./view/index.ejs");
    });

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

app.get("/", function (req, res) {
  db.collection("books")
    .find()
    .toArray(function (error, result) {
      res.render("index.ejs", { books: result, path: "main" });
    });
});

app.get("/library", function (req, res) {
  db.collection("books")
    .find()
    .toArray(function (error, result) {
      res.render("index.ejs", {
        books: result,
        path: "library",
      });
    });
});

app.get("/detail/:id", function (req, res) {
  db.collection("books").findOne(
    {
      _id: parseInt(req.params.id),
    },
    function (error, result) {
      res.render("index.ejs", {
        book: result,
        path: "detail",
      });
    }
  );
});

app.get("/library/GENERAL", function (req, res) {
  db.collection("books")
    .find({ 분류: "GENERAL MUSICOLOGY" })
    .toArray(function (error, result) {
      res.render("index.ejs", { books: result, path: "library" });
    });
});
app.get("/library/HISTORY", function (req, res) {
  db.collection("books")
    .find({ 분류: "HISTORY AND BIOGRAPHY" })
    .toArray(function (error, result) {
      res.render("index.ejs", { books: result, path: "library" });
    });
});
app.get("/library/CULTURE", function (req, res) {
  db.collection("books")
    .find({ 분류: "MUSIC AND CULTURE" })
    .toArray(function (error, result) {
      res.render("index.ejs", { books: result, path: "library" });
    });
});
app.get("/library/THEORY", function (req, res) {
  db.collection("books")
    .find({ 분류: "MUSIC THEORY" })
    .toArray(function (error, result) {
      res.render("index.ejs", { books: result, path: "library" });
    });
});
app.get("/library/ESSENTIAL", function (req, res) {
  db.collection("books")
    .find({ 분류: "ESSENTIAL REFERENCES" })
    .toArray(function (error, result) {
      res.render("index.ejs", { books: result, path: "library" });
    });
});

app.post("/add", function (req, res) {
  db.collection("counter").findOne(
    {
      name: "게시물개수",
    },
    function (error, result) {
      var 게시물개수 = result.totalPost;
      db.collection("books").insertOne(
        {
          _id: 게시물개수 + 1,
          제목: req.body.title,
          부제목: req.body.subtitle,
          작가: req.body.author,
          연도: req.body.date,
          출판사: req.body.publish,
          분류: req.body.category,
          이미지: req.body.img,
          상세정보: req.body.about,
          구매처: req.body.purchase,
          좋아요: req.body.like,
        },
        function (error, result) {
          console.log("save complete");
          db.collection("counter").updateOne(
            {
              name: "게시물개수",
            },
            {
              $inc: {
                totalPost: 1,
              },
            },
            function (error, result) {
              if (error) {
                return console.log(error);
              }
              res.redirect("/library");
            }
          );
        }
      );
    }
  );
});

app.delete("/delete", function (req, res) {
  req.body._id = parseInt(req.body._id);
  db.collection("books").deleteOne(req.body, function (error, result) {
    console.log("del complete");
    res.status(200).send({
      message: "del success",
    });
  });
});

app.get("/edit/:id", function (req, res) {
  db.collection("books").findOne(
    {
      _id: parseInt(req.params.id),
    },
    function (error, result) {
      res.render("index.ejs", {
        books: result,
        path: "edit",
      });
    }
  );
});

app.put("/edit", function (req, res) {
  db.collection("books").updateOne(
    {
      _id: parseInt(req.body.id),
    },
    {
      $set: {
        제목: req.body.title,
        부제목: req.body.subtitle,
        작가: req.body.author,
        연도: req.body.date,
        출판사: req.body.publish,
        분류: req.body.category,
        이미지: req.body.img,
        상세정보: req.body.about,
        구매처: req.body.purchase,
      },
    },
    function (error, result) {
      console.log("edit complete");
      res.redirect("/library");
    }
  );
});

app.get("/search", function (req, res) {
  var 검색조건 = [
    {
      $search: {
        index: "bookSearch",
        text: {
          query: req.query.value,
          path: ["제목", "부제목", "작가", "출판사"],
        },
      },
    },
  ];
  db.collection("books")
    .aggregate(검색조건)
    .toArray(function (error, result) {
      res.render("index.ejs", {
        books: result,
        path: "library",
        error: error,
      });
    });
});

app.get("/login", function (req, res) {
  res.render("index.ejs", {
    path: "login",
  });
});

app.post("/join", function (req, res) {
  db.collection("login").insertOne(
    {
      id: req.body.id,
      pw: req.body.pw,
    },
    function (error, result) {
      console.log("save complete");
      res.redirect("/login");
    }
  );
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (putID, putPW, done) {
      db.collection("login").findOne({ id: putID }, function (error, result) {
        if (error) return done(error);
        if (!result)
          return done(null, false, { message: "존재하지 않는 아이디입니다" });
        if (putPW == result.pw) {
          return done(null, result);
        } else {
          return done(null, false, {
            message: "비밀번호 입력이 잘못되었습니다",
          });
        }
      });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (idname, done) {
  db.collection("login").findOne({ id: idname }, function (error, result) {
    done(null, result);
  });
});

function verifyID(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/mypage", verifyID, function (req, res) {
  res.render("index.ejs", { path: "favorite" });
});
