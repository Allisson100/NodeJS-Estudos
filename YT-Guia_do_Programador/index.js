const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');

// Config
    // Template Engine
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    // Body Parser
        app.use(express.urlencoded({extended:false}));
        app.use(express.json());
    // Conexão com o banco de dados MySQL
        const sequelize = new Sequelize('test', 'root', 'Alison20', {
            host: "localhost",
            dialect: 'mysql'
        });

// Rotas
    app.get('/cad', function(req, res) {
        res.render('formulario');
    })

    app.post('/add', function(req, res) {
        res.send('Texto: '+req.body.titulo+" Conteudo: "+req.body.conteudo); 
    })


app.listen(8081, function () {
    console.log("Servidor esta rodando na url http://localhost:8081");
})