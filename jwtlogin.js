const express = require("express");
const router = express.Router();
const jwt = require ("jsonwebtoken");
const cors = require ("cors");
require("dotenv").config();

router.use(express.json());
router.use(cors());

const users = [
    {user: "example1", email: "example1@ejemplo.com", password: "159asd"},
    {user: "example2", email: "example2@ejemplo.com", password: "951mnb"},
    {user: "example3", email: "example3@ejemplo.com", password: "789uyt"},
    {user: "example4", email: "example4@ejemplo.com", password: "357bhu"},
];

router.post("/login", (req, res) => {
    const email = req.body.email;
    const user = users.find((someUser) => someUser.email === email);
    if (!user) {
        res.status(401).send("Usuario no reconocido");
    } else {
        const payload = { user: user.user, email: user.email};
        const token = jwt.sign(payload, process.env.CLAVESECRETA);
        res.status(200).send({
            mensaje: "welcome", 
            token,
        });
    }
});

function checkToken (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.send("Token no es valido");
    } else {
        const verifyToken = jwt.verify(token, process.env.CLAVESECRETA);
        next();
    }
}

router.get("/user", checkToken, (req, res) => {
    res.status(200).send("registro exitoso");
});

module.exports = router;