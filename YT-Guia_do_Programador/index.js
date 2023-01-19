const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize')

// Config
    // Template Engine
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
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
        res.send('FORMULÁRIO RECEBIDO!!')
    })


app.listen(8081, function () {
    console.log("Servidor esta rodando na url http://localhost:8081");
})