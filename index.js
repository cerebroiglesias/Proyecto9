const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

let visitas = 0;

app.get('/articulos', (req, res) => {
    res.sendFile(__dirname + '/articulos.json');
})

app.get('/articulos/:id', (req, res) => {
    fs.readFile('./articulos.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            let articulos = JSON.parse(data);
            let articuloCliente = articulos.filter((articulo) => articulo.id == req.params.id);
            res.send(articuloCliente && articuloCliente.length ? articuloCliente[0] : 'Articulo no encontrado');
        }
    })
})

const server = app.listen(PORT, () => {
    console.log(`Server trabajando en http://localhost:${PORT}`);
})