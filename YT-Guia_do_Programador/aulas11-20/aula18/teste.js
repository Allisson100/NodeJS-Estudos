const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', 'Alison20', {
    host: "localhost",
    dialect: 'mysql'
});

const Postagem =  sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

Usuario.create({
    nome: "Allisson",
    sobrenome: "Matheus",
    idade: 22,
    email: "teste@hotmail.com"
})