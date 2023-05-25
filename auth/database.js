const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getUserDetails() {
    const rows = await pool.query("SELECT * FROM USERS");
    return rows[0]
}

new Promise(async function(resolve, reject) {
    const rows = await pool.query("SELECT * FROM USERS");
    if(rows) {
        resolve(rows[0]);
    } else {
        reject("Unable to fetch from database.")
    }
}).then(
    (users) => console.log(users)
).catch(
    console.log
)

