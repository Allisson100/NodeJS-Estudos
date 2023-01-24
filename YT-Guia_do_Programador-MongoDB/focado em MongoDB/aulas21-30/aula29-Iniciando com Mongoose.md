# Iniciando com Mongoose

Para instalar o mangoose, entre na pasta principal do projeto e digite no cdm:

    npm install --save mongoose

================================

### Aprendendo a se concetar com o mongoose

Primeiro criamos uma constante requisitando o mangoose:

    const mongoose = require('mongoose');

E para se conectar a ele digitamos:

    mongoose.connect("mongodb://localhost/nome_do_banco");

Lembrando que nesse caso podemos colocar qualquer nome de banco, pois caso o nome do banco não existir ele vai criar um.

ficando:

    const mongoose = require('mongoose');

    mongoose.connect("mongodb://localhost/aprendendo");

Se der erro usar 127.0.0.1 no lugar de localhost.
    
====================================

Para criarmos um banco de dados direto no cmd devemos digitar:

    use nome_do_banco;

Porém ele não mostra um banco vazio no show databases.

=====================================

Precisamos também ter alguma mensagem para saber se a conexão com banco foi feita com sucesso ou não e para isso usamos o .then() e o .catch();

    const mongoose = require('mongoose');

    mongoose.connect("mongodb://127.0.0.1/aprendendo").then(() => {
        console.log("MongoDB Conectado ...");
    }).catch((erro) => {
        console.log("Houve um erro ao se conectar com o MongoDB: " + erro);
    })

Para evitar alguns erros no Mongo podemos usar umas configurações adicionais:

// Configurando o mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://127.0.0.1/aprendendo", {
        useMongoClient: true
    }).then(() => {
        console.log("MongoDB Conectado ...");
    }).catch((erro) => {
        console.log("Houve um erro ao se conectar com o MongoDB: " + erro);
    })

Esse código que foi passado na aula é de uma versão antiga do mongoose, a versão 5.0 que estou utilizando não precisa mais dessa parte do useMongoClient: true, então é só remove-la que funciona normalmente:



