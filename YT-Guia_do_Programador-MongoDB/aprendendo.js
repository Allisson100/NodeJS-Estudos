const mongoose = require('mongoose');

// Configurando o mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://127.0.0.1/aprendendo").then(() => {
        console.log("MongoDB Conectado ...");
    }).catch((erro) => {
        console.log("Houve um erro ao se conectar com o MongoDB: " + erro);
    })

