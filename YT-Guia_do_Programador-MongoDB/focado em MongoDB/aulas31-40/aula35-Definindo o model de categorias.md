# Definindo o model de categorias

Vamos criar um model de categoria, mas precisamos antes configurar a conexão com o MongoDb.

Precisamos primeiro criar uma const requisitando o mongoose:

    const mongoose = require('mongoose');

E depois comfigurá-lo:

    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log("Conectado ao Mongo");
        }).catch((err) => {
            console.log("Erro ao se conectar: " + err);
        })

===============================

Agora vamos criar o model de categorias.

Primeiramente vamos criar um arquivo Categoria.js na pasta models.

Lembrando que criar um model com a primeira letra maiúscula e no singular é uma boa prática de organização de projeto.

========================================

Dentro de Categoria.js digitamos:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Categoria = new Schema({
        nome: {
            type: String,
            required: true
        },

        slug: {
            type: String,
            reqiured: true
        },

        date: {
            type: Date,
            default: Date.now()
        }
    })

    mongoose.model("categorias", Categoria);

