const express = require("express");
const { use } = require("express/lib/router");
const mysql = require("mysql2");

const app = express();
let port = 1155;

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sample3",
  port: "3306",
});
db.connect((err) => {
  if (err) {
    console.log(err, "error");
  } else {
    console.log("database connected");
  }
});

app.post("/add", (req, res) => {
  let item = req.body.item;
  let price = req.body.price;
  let grade = req.body.grade;
  let qry =
    'INSERT INTO pricelist (item,price,grade) VALUES ("' +
    item +
    '","' +
    price +
    '","' +
    grade +
    '")';
  console.log(qry);

  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    if (result.affectedRows == 1) {
      res.send({ status: true, msg: "sucess", data: result });
    } else {
      res.send({ status: false, msg: "failed" });
    }
  });
});

app.put("/:id", (req, res) => {
  let id = req.params.id;
  let qry = "UPDATE pricelist SET price= 70 WHERE it_id='" + id + "'";
  console.log(qry);

  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    if (result.affectedRows == 1) {
      res.send({ status: true, msg: "sucess", data: result });
    } else {
      res.send({ status: false, msg: "failed" });
    }
  });
});

app.get("/:id", (req, res) => {
  let id = req.params.id;
  let qry = 'SELECT * FROM `pricelist` WHERE it_id="' + id + '"';

  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send({ status: true, msg: "sucess", data: result });
    } else {
      res.send({ status: false, msg: "failed" });
    }
  });
});

app.listen(port, () => {
  console.log("run it");
});
  