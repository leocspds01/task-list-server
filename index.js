const express = require('express');
const listviewrouter = require("./list-view-router");
const listeditrouter = require ("./list-edit-router");
const app = express();
const port= 3000;

app.use("/listview", listviewrouter);
app.use("/listedit", listeditrouter);

app.listen(port, () => {
    console.log("servidor encendido");
})


