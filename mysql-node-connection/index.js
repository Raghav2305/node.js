const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqlrootpass',
    database: 'nodemysql'
})

db.connect((err) =>{
    if (err){
        throw err;
    }
    else{
        console.log('Connected!');
    }
})

app.get("/createdb", (req,res)=>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err)=>{
        if (err){
            throw err;
        }

        res.send('Database created!');
    });
});

app.get("/createemployee", (req, res) => {

    let sql =
  
      "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
  
    db.query(sql, (err) => {
  
      if (err) {
  
        throw err;
  
      }
  
      res.send("Employee table created");
  
    });
  
  });

// Insert

app.get("/employee1", (req, res) => {

    let post = {name: "Elon Musk", designation: "Tesla CEO"};
  
    let sql = "INSERT INTO employee SET ?";
  
    let query = db.query(sql, post, (err) => {
  
      if (err) {
  
        throw err;
  
      }
  
      res.send("Employee 1 added");
  
    });
  
  });


// // update

app.get("/updateemployee/:id", (req, res) => {

    let name = "Bill Gates";
  
    let sql = `UPDATE employee SET name = '${name}' WHERE id = ${req.params.id}`;
  
    let query = db.query(sql, (err) => {
  
      if (err) {
  
        throw err;
  
      }
  
      res.send("Post updated...");
  
    });
  
  });

// // delete

app.get("/deleteemployee/:id", (req, res) => {

    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
  
    let query = db.query(sql, (err) => {
  
      if (err) {
  
        throw err;
  
      }
  
      res.send("Employee deleted");
  
    });
  
  });

app.listen("3000", () => {

    console.log("Server started on port 3000");
  
  });