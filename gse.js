const express = require('express');
const app = express();

// const mongoClient = require('mongodb').MongoClient

// const url = "mongodb://localhost:27017"

var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qwert12345",
  database: "gse"
});

app.use(express.json());

// mongoClient.connect(url, (err, db) => {


// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE gse", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// //drop table megrendelesek
// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "DROP TABLE megrendelesek";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table deleted");
//   });
// });

// //drop table raktar
// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "DROP TABLE raktar";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table deleted");
//   });
// });

// //drop table termekrendeles
// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "DROP TABLE termekrendeles";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table deleted");
//   });
// });

// //create table raktar
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE raktar (serialnumber int not null auto_increment, megnevezes varchar(50), darabszam int, ar int, elhelyezkedes varchar(50), primary key (serialnumber))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

//create table megrendelesek
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE megrendelesek (id int not null auto_increment, megrendelo varchar(50), datum varchar(50) , osszeg int, primary key (id), statusz varchar(50))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

// //create termekrendeles
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE termekrendeles (id int not null auto_increment, megrendelo varchar(50), termek varchar(50) , darabszam int, primary key (id))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });


con.connect(function(err) {


  app.post('/addraktar', (req, res) => {

    const newUser = {
      serialnumber: parseInt(req.body.serialnumber),
      megnevezes: req.body.megnevezes,
      darabszam: parseInt(req.body.darabszam),
      ar: parseInt(req.body.ar),
      elhelyezkedes: req.body.elhelyezkedes
    }
  
    if (err) throw err;

    var sql = "INSERT INTO raktar (megnevezes, darabszam, ar, elhelyezkedes) VALUES ('"+newUser.megnevezes+"', '"+newUser.darabszam+"', '"+newUser.ar+"', '"+newUser.elhelyezkedes+"')";

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });

    if (err) throw err;
    con.query("SELECT * FROM raktar", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

  });

  app.post('/addmegrendelesek', (req, res) => {

    const newUser = {
      
      megrendelo: req.body.megrendelo,
      datum: req.body.datum,
      arak: parseInt(req.body.arak),
      statusz: req.body.statusz
    }

    //var s = "rogzitve";
    var n = 4;
  
    if (err) throw err;

    var sql = "INSERT INTO megrendelesek (megrendelo, datum, osszeg, statusz) VALUES ('"+newUser.megrendelo+"', '"+newUser.datum+"', '"+newUser.arak+"', '"+newUser.statusz+"')";

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });

    if (err) throw err;
    con.query("SELECT * FROM megrendelesek", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

  });

  app.post('/addtermekrendeles', (req, res) => {

    const newUser = {
      //id: parseInt(req.body.i),
      megrendelo: req.body.megrendelo,
      termek: req.body.termek,
      darabszam: parseInt(req.body.darabszam),
      //elhelyezkedes: req.body.elhelyezkedes
    }
  
    if (err) throw err;

    var sql = "INSERT INTO termekrendeles (megrendelo, termek, darabszam) VALUES ('"+newUser.megrendelo+"', '"+newUser.termek+"', '"+newUser.darabszam+"')";

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });

    if (err) throw err;
    con.query("SELECT * FROM termekrendeles", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

  });


  app.post('/deleteraktardata', (req, res) => {

    const newObject = {
      
      serialnumber: req.body.serialnumber
      
    }
  
    if (err) throw err;

    var sql = "DELETE FROM raktar WHERE serialnumber = '"+newObject.serialnumber+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record deleted, ID: " + result.insertId);
    });

    if (err) throw err;
    con.query("SELECT * FROM raktar", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });  

  });

  app.post('/deletemegrendelesekdata', (req, res) => {

    const newObject = {
      
      id: req.body.id
      
    }
  
    if (err) throw err;

    var sql = "DELETE FROM megrendelesek WHERE serialnumber = '"+newObject.id+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record deleted, ID: " + result.insertId);
    });

    if (err) throw err;
    con.query("SELECT * FROM megrendelesek", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

    

  });

  app.post('/updatefolyamatba', (req, res) => {

    const newObject = {
      
      id: parseInt(req.body.id),
      statusz: req.body.statusz
      
    }
  
    if (err) throw err;

    var sql = "UPDATE megrendelesek SET statusz = '"+newObject.statusz+"' WHERE id = '"+newObject.id+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record updated, ID: " + result.insertId);
    });

    if (err) throw err;
    con.query("SELECT * FROM megrendelesek", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

  });

  app.post('/updatelezarva', (req, res) => {

    const newObject = {
      
      id: parseInt(req.body.id),
      //statusz: req.body.statusz

    }

    //id = 1;
  
    if (err) throw err;

    var sql = "UPDATE megrendelesek SET statusz = 'lezarva' WHERE id = '"+newObject.id+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record updated, ID: " + result.insertId);
    });

    if (err) throw err;
    con.query("SELECT * FROM megrendelesek", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

  });

  app.post('/updateprice', (req, res) => {

    const newObject = {
      
      id: req.body.id,
      ar: req.body.ar
      
    }
  
    if (err) throw err;

    var sql = "UPDATE raktar SET ar = '"+newObject.ar+"' WHERE serialnumber = '"+newObject.id+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record updated, ID: " + result.insertId);
    });

    if (err) throw err;
    con.query("SELECT * FROM raktar", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

  });

});

app.listen(3000, () => {
    console.log("Listening on port 3000...");
})



  

