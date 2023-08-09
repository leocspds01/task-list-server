const express = require ('express');
const router = express.Router();
const listatareas = require ("./listatarea.json");

router.get("/tarea/:id", (req, res) => {
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

router.get("/completas", (req, res) => {
    const completadas= listatareas.filter((listatarea) => listatarea.isCompleted == true);
    if (completadas.length > 0) {
        res.status(200).send({
            success: true,
            content:completadas
        });
    }else {
        res.status(404).send("tareas no completadas");
    }
});

router.get("/incompletas", (req, res) => {
    const incompletas = listatareas.filter((listatarea) => listatarea.isCompleted == false);
    if (incompletas.length > 0) {
        res.status(200).send({
            success: true,
            content: incompletas
        });
    }else {
        res.status(404).send("no existen tareas incompletas");
    }
});

router.get("/listatarea", (req, res) => {
    res.send({
        success: true,
        content: listatareas,
    });
});

module.exports = router;