const router = require("express").Router();
const { spawn } = require("child_process");

router.get("/run", callName);
function callName(req, res) {
  // Use child_process.spawn method from
  // child_process module and assign it
  // to variable spawn
  var spawn = require("child_process").spawn;

  // Parameters passed in spawn -
  // 1. type_of_script
  // 2. list containing Path of the script
  //    and arguments for the script

  // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
  // so, first name = Mike and last name = Will
  var process = spawn("python3", ["../python/wt_project.py", req.query.title]);

  process.stdout.on("data", function (data) {
    console.log(data);
    res.send(data.toString());
  });
  //   process.stdout.on("data", function (data) {
  //     const data1 = require("../python/out.json");
  //     res.header("Content-Type", "application/json");
  //     res.send(JSON.stringify(data1));
  //     // res.send(data.toString());
  //   });
}
// function callName(req, res) {
//   // Use child_process.spawn method from
//   // child_process module and assign it
//   // to variable spawn
//   //   var spawn = require("child_process").spawn;

//   // Parameters passed in spawn -
//   // 1. type_of_script
//   // 2. list containing Path of the script
//   //    and arguments for the script

//   // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
//   // so, first name = Mike and last name = Will

//   var process = spawn("python", ["../python/wt_project.py", req.params.string]);

//   //   const data = require("../python/out.json");
//   //   res.header("Content-Type", "application/json");
//   //   res.send(JSON.stringify(data));

//   // Takes stdout data from script which executed
//   // with arguments and send this data to res object
//   process.stdout.on("data", function (data) {
//     console.log(data);
//     res.send(data.toString());
//   });
// }
module.exports = router;
