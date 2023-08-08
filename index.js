const express = require('express');
const listatareas = require("./listatarea.json");
const app = express();

const port= 3000;
app.use (express.json());

app.get("/listatarea", (req, res) => {
    res.send({
        success: true,
        content: listatareas
    });
});

app.post("/listatarea", (req, res) => {
    const listatarea = req.body 
    listatareas.push(listatarea);
    res.send({
        success: true,
        content: listatareas
    })
});

app.get("/listatarea/:id", (req, res) => {
    const id = req.params.id
    const listatarea = listatareas.filter(listatarea => listatarea.id == id);
    res.send({
        success: true,
        content: listatarea
    })
});

app.put('/listatarea/:id', (req, res) => {
    const id = req.params.id;
    const {isCompleted, description} = req.body;
    const listatarea = listatareas.find((listatarea) => listatarea.id == id);

    if (listatarea){
        listatarea.isCompleted = isCompleted;
        listatarea.description = description;
        res.json(listatarea);
    } else {
        res.status(404).send('tarea no encontrada')
    }
});

app.delete('/listatarea/:id', (res, req) => {
    const id = req.params.id;
    const index = listatareas.findIndex((listatarea) => listatarea.id == id);

    if (index !== -1) {
        listatareas.splice(index, 1);
        res.send({
            success: true,
            content: listatareas
        })
    } else {
        res.status(404).send('tarea no encontrada');
    }

});

app.listen(port, () => {
console.log('servidor encendido')
})

