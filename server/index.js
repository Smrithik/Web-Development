const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
//Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const pyRoute = require("./routes/python");
dotenv.config();
//MongoDB
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

//Middleware
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/python/:title", callName);
function callName(req, res) {
  var spawn = require("child_process").spawn;

  var process = spawn("python3", ["./python/wt_project.py", req.params.title]);

  process.stdout.on("data", function (data) {
    const data1 = require("./out.json");
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data1));
  });
}

app.get("/python/getAll/getAll", callName3);
function callName3(req, res) {
  const data1 = require("./data/data.json");
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(data1));
}

app.get("/python/getOne/:title", callName1);
function callName1(req, res) {
  const data1 = require("./data/new_data.json");
  data1.forEach((element) => {
    if (element.title == req.params.title) {
      res.header("Content-Type", "application/json");
      res.send({ title: element.title, text: element.text });
    }
  });
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(data1));
}

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/python", pyRoute);

app.listen(3000, () => {
  console.log("Server Running");
});
