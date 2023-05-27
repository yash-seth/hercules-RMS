const express = require("express")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
var CryptoJS = require("crypto-js");
const mysql = require('mysql2')

dotenv.config();

// database part
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

const app = express();

const PORT = process.env.PORT

// starting server
app.listen(PORT, (req, res) => {
    console.log("Auth server is running on port 5000!");    
})

// cors settings
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// default endpoint  
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Welcome to the Hercules Restaurant!");
})

// login endpoint

app.post("/user/login", async (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let data = {
        username: req.body.username,
        pwd: req.body.pwd
    }

    let username = req.body.username;
    let pwd = CryptoJS.SHA3(process.env.SALT + req.body.pwd + process.env.SALT).toString()
    const token = jwt.sign(data, jwtSecretKey)

    // adding user to db
    const rows = await pool.query("SELECT pwd FROM USERS where username = '" + username + "'");
    if(rows[0].length != 0) {
        if(rows[0][0].pwd == pwd) {
            try {
                res.send({token:token, login: true})
                await pool.query("UPDATE USERS SET jwt_token ='" + token + "' where username = '" + username + "'");
            } catch (error) {
                console.log("I was here");
                res.send({msg: error, login: false})
            }
        }
        else res.send({msg: "Password is incorrect", login: false})
    } else {
        res.send({msg: "Kindly register before trying to login.", login: false})
    }
});

// register endpoint

app.post("/user/register", async (req, res) => {
    let username = req.body.username;
    let pwd = CryptoJS.SHA3(process.env.SALT + req.body.pwd + process.env.SALT).toString()
    let token = ""

    // checking if user is already in the db
    try {
        const rows = await pool.query("SELECT pwd FROM USERS where username = '" + username + "'");
        if(rows[0].length != 0) {
            res.send({msg: "User is already registered! Login to continue."})
        }
        else {
            let t = await pool.query("INSERT into USERS(username, pwd, jwt_token) values('" + username + "','" + pwd + "', '" + token + "')");
            if(t) res.send({msg: "User Registered, You may now login to continue"})
            else res.send({msg: "Error registering user! Please try again"})
        }
        } catch (error) {
            res.send({msg: "Error: " + error})
        }
});

// validate jwt token endpoint

app.get("/user/validateToken", (req, res) => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
    const JWT_HEADER_KEY = process.env.JWT_HEADER_KEY
    try {
        const token = req.header(JWT_HEADER_KEY)
        const verified = jwt.verify(token, JWT_SECRET_KEY)
        if(verified) {
            console.log("User is verified")
            res.send("Successfully Verified").status(200)
        } else {
            console.log("User is not verified")
            res.status(401).send(error)
        }
    } catch(error) {
        // console.log("Error", error)
        res.status(401).send(error)
    }
});

// logout endpoint

app.post("/user/logout", async (req, res) => {
    const username = req.body.username;
    try {
        const res = await pool.query("UPDATE USERS SET jwt_token = '' where username = '" + String(username) + "'");
    } catch(err) {
        res.send({msg: err, logout: false});
    }

    res.send({logout: true})
});