# Definindo model de usuario

Precisamos criar um sistema de autenticação, pois até gora qualquer usuário pode acessar a parte de admin.

Vamos cria ro model de usuário na pasta model e vamos definir o model:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Usuario = new Schema({
        nome: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        senha: {
            type: String,
            required: true
        }
    })

    mongoose.model("usuarios", Usuario);




