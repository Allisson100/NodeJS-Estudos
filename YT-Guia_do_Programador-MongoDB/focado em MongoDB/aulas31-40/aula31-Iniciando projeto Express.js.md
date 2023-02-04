# Iniciando projeto Express.js

Criei uma pasta nova para o app do blog.

Para instalar o express digite no terminal:

    npm install --save express

Para instalar o handlebars digite no terminal:

    npm install --save express-handlebars

Para instalar o body Parser:

    npm install body-parser --save

Para instalar o mongoose:

    npm install --save mangoose

Estutura do projeto:

    //Carregando módulos
        const express = require('express');
        const handlebars = require('express-handlebars');
        const bodyParser = require('body-parser');
        const app = express();
        //const mongoose = require('mongoose');

    // Configurações
        // Body Parser
            app.use(express.urlencoded({extended:true}));
            app.use(express.json());
        // Handlebars
            app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
            app.set('view engine', 'handlebars');
        // Mongoose
            // Em breve
        //
    //Rotas

    //Outros
    const PORT = 8081;
    app.listen(PORT, () => {
        console.log("Servidor rodando!");
    });

Estrutura na página main.handlebars:

    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Blog NodeJS</title>
    </head>
    <body>
        {{{body}}}
    </body>
    </html>

