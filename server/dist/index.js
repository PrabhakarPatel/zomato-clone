"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _connection = _interopRequireDefault(require("./database/connection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//database connection

_dotenv.default.config();
const zomato = (0, _express.default)();
zomato.use(_express.default.json());
const PORT = 4001;
zomato.get("/", (req, res) => {
  res.json({
    message: "server is running"
  });
});
zomato.listen(PORT, () => {
  (0, _connection.default)().then(() => {
    console.log("server is running");
  }).catch(error => {
    console.log("server is running ,but the database connection failed");
    console.log(error);
  });
  // console.log("server is running")
});