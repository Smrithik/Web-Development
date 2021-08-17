const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");

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

router.post("/register", async (req, res) => {
  //   const validation = schema.validate(req.body);
  const validation = registerValidation(req.body);
  if (!validation.error) {
  } else {
    return res.status(400).send(validation.error.details[0].message);
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Check if user exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const validation = loginValidation(req.body);
  if (!validation.error) {
  } else {
    return res.status(400).send(validation.error.details[0].message);
  }

  //Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("User does not exist");
  }

  //Check Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    res.status(400).send("Invalid Password");
  }

  //Create Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  // res.header("auth-token", token).send(token);
  // res.send("Logged In");
  res.send({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token: token,
  });
});

router.get("/users", async (req, res) => {
  const user = User.collection();

  user.find({}).toArray(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = router;
