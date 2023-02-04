# Fazendo correção

Esquecemos de criar um outro campo no model Usuario.js, que seria o campo para verificar se o usuário é admin ou não.

Então para isso editamos o model de usuário:

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

        eAdmin: {
            type: Number,
            default: 0
        },

        senha: {
            type: String,
            required: true
        }
    })

    mongoose.model("usuarios", Usuario);

Quando o campo eAdmin for igual a 0, significa que o usuário NÃO é ADMIN e quando o valor for igual a 1 significa que ele é ADMIN da página.


