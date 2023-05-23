const express = require("express")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")

dotenv.config();

const app = express();

const PORT = process.env.PORT
app.listen(PORT, (req, res) => {
    console.log("Auth server is running on port 5000!");    
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())
app.get("/", (req, res) => {
    res.send("Welcome to the Hercules Restaurant!");
})

app.post("/user/generateToken", (req, res) => {
    console.log("I was here")
    console.log(req.body)
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    let data = {
        username: req.body.username,
        pwd: req.body.pwd
    }
    // // let data = {
    // //     userID: 69
    // // }
    const token = jwt.sign(data, jwtSecretKey)
    res.send({token:token})
});

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