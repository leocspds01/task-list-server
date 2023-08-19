const express = require('express');
const listviewrouter = require("./list-view-router");
const listeditrouter = require ("./list-edit-router");
const listatareaView = require("./listatarea-view-router");
const jwtlogin = require("./jwtlogin");
const app = express();
const port= 3000;

function methods(req, res, next) {
    const method = req.method;
    if(
        method === "GET" ||
        method === "POST" ||
        method === "PUT" ||
        method === "DELETE"
    ) {
        next();
    } else {
        res.status(400).send("metodo http invalido");
    }
}

app.use(methods);
app.use("/listview", listviewrouter);
app.use("/listedit", listeditrouter);
app.use("/listatareaView", listatareaView);
app.use("/jwtlogin", jwtlogin);

app.listen(port, () => {
    console.log("servidor encendido");
})


