const mongoose = require('mongoose');

// Configurando o mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://127.0.0.1/aprendendo").then(() => {
        console.log("MongoDB Conectado ...");
    }).catch((erro) => {
        console.log("Houve um erro ao se conectar com o MongoDB: " + erro);
    })

// Model - Usuários
// Definindo o Model

    const UsuarioSchema = mongoose.Schema({

        nome: {
            type: String,
            require: true
        },

        sobrenome: {
            type: String,
            require: true
        },

        email: {
            type: String,
            require: true
        },

        idade: {
            type: Number,
            require: true
        },

        pais: {
            type: String
        }
    })

//Collection
    mongoose.model('usuarios', UsuarioSchema);

    const Allisson = mongoose.model('usuarios')

    new Allisson ({
        nome: "Allisson",
        sobrenome: "Matheus",
        email: "teste@email.com",
        idade: 22,
        pais: "Brasil"
    }).save().then(() => {
        console.log("Usuário criado com sucesso!!!");
    }).catch((erro) => {
        console.log("Houve um erro ao registrar o usuário: " + erro);
    })


