import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;

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
        if (!result) return done(null, false, { message: "존재하지 않는 아이디입니다" });
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
