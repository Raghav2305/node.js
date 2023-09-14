import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
).promise();


export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows
  }
  
  export async function getNote(id) {
    console.log("Entered the database function")
    console.log(`ID : ${id}`)
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ?
    `, [id])
    return rows[0]
  }
  
  export async function createNote(title, contents) {
    console.log("Entered create note function");
    console.log(title);
    console.log(contents);
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, contents])
    const id = result.insertId
    return getNote(id)
  }





