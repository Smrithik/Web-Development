const router = require("express").Router();
const verify = require("./verifyToken");

// router.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

router.get("/", verify, (req, res) => {
  res.json({ message: "You are logged in to access" });
});

const Post = require("../model/Post");

router.post("/addPost", function (req, res) {
  var mod = new Post(req.body);
  console.log(req.body);
  if (req.body.mode == "Save") {
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({ data: "Post has been added to the forum" });
      }
    });
  } else {
    Post.findByIdAndUpdate(
      req.body.id,
      { username: req.body.username, userpost: req.body.userpost },
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send({ data: "Post has been updated" });
        }
      }
    );
  }
});

router.get("/getPosts", function (req, res) {
  Post.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/deletePost", function (req, res) {
  Post.findByIdAndDelete({ _id: req.body.id }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Post has been deleted" });
    }
  });
});

module.exports = router;
