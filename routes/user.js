const express = require("express");

const router = express.Router();

router.get("/login", function (req, res) {
  res.render("index.ejs", {
    path: "login",
  });
});

router.post("/join", function (req, res) {
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

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), function (req, res) {
  res.redirect("/");
});

export default router;
