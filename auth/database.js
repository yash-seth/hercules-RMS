const mysql = require('mysql2')
const dotenv = require('dotenv')
const express = require('express')

const db = express();


dotenv.config()

db.listen(process.env.DB_PORT, (req, res) => {
    console.log("DB Server running on 7777");
})

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


// fetch users from db

// new Promise(async function(resolve, reject) {
//     const rows = await pool.query("SELECT * FROM USERS");
//     if(rows) {
//         resolve(rows[0]);
//     } else {
//         reject("Unable to fetch from database.")
//     }
// }).then(
//     (users) => console.log(users)
// ).catch(
//     console.log
// )


// delete user from db

// new Promise(async function(resolve, reject) {
//     const res = await pool.query("DELETE from USERS where username = 'harsh-seth'");
//     console.log(res);
//     }).then(
//         (result) => console.log("Number of records deleted: " + result.affectedRows)
//     ).catch(
//         console.log
//     )


// lookup user

new Promise(async function(resolve, reject) {
    const rows = await pool.query("SELECT * FROM USERS where username = '123'");
    if(rows) {
        resolve(rows);
    } else {
        reject("Unable to fetch from database.")
    }
}).then(
    (users) => console.log(users)
).catch(
    console.log
)