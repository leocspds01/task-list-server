const express = require ('express');
const router = express.Router();
const listatareas = require ("./listatarea.json");
router.use(express.json());

function bodyValidation(req, res, next) {
    if(Object.values(req.body).length === 0) {
        res.status(400).send("body sin informacion");
    }else{
        next();
    }
}

function dataValidation(req, res, next) {
    const{ isCompleted, description} = req.body;
    if (!isCompleted || !description) {
        res.status(400).send("No hay informacion suficiente para crear la tarea");
    } else {
        next();
    }
}

router.post("/listatarea", (req, res) => {
    const {isCompleted, description} = req.body;
    const id = listatareas.length + 1;
    listatareas.push({ id: id, isCompleted: isCompleted, description: description});
    res.send({
        success: true,
        content: listatareas,
    });
});

router.put("/listatarea/:id", (req, res) => {
    const id = req.params.id;
    const {isCompleted, description} = req.body;
    const listatarea = listatareas.find((listatarea) => listatarea.id == id);
    if(listatarea) {
        listatarea.isCompleted = isCompleted;
        listatarea.description = description;
        res.json(listatarea);
    } else {
        res.status(404).send("tarea no encontrada");
    }
});

router.delete("/listatarea/:id", (req, res) => {
    const id = req.params.id;
    const index = listatareas.findIndex((listatarea) => listatarea.id == id);
    if (index != -1) {
        listatareas.splice(index, 1);
        res.send({
            success: true,
            content: listatareas,
        });
    } else {
        res.status(404).send("tarea no existe");
    }
});

module.exports = router;