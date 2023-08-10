const express = require("express");
const router = express.Router();
const listatareas = require("./listatarea.json");

function paramValidation(req, res, next) {
    const idParam = req.params.id;
    if(!idParam) {
        res.status(400).send("debes incluir el parametro id")
    } else {
        next();
    }
}

router.get("/listatarea/:id", (req, res) => {
    const id = req.params.id;
    const listatarea = listatareas.filter((listatarea) => listatarea.id == id);
    if(listatareas.length < id){
        res.status(404).send("tarea no existe");
    } else{
        res.send({
            success: true,
            content: listatarea
        })
    }
});

module.exports = router;