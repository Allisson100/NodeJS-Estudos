# Body parser

Ele serve para receber dados de qualquer formulário dentro do express.

Para instala-lo basta digitar no terminal:

    npm install --save body-parser

E temos que chamar ele através de uma const no index.js

    const bodyParser = require('body-parser');

E precisamos configura-lo:

    // Body Parser
        app.use(express.urlencoded({extended:false}));
        app.use(express.json());

Como pegar uma rota que está vindo do formulário? Basta usar a seguinte estrutura por exemplo:

    app.post('/add', function(req, res) {
        res.send('Texto: '+req.body.titulo+" Conteudo: "+req.body.conteudo); 
    })

Ele está requisitando o campo com o name="titulo" e o campo com o name="conteudo"

*LEMBRANDO QUE O BODY PARSE MUDOU ENTÃO TIVE QUE FAZER ALGUMAS MUDANÇAS PARA O CÓDIGO FUNCIONAR*

============================
Código Final fo vídeo
============================

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






