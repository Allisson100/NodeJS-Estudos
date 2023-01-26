# Estruturando banco de dados

Criamos um banco de dados mysql novo com o comando:

    create database postapp;

Acessamos o banco com:

    use postapp;

Vamos criar uma pasta models e criar o arquivo db.js. Esse arquivo serve para separar um pouco o código e ele ficará responsável por se conectar com o banco de dados.

Para exportar esse arquivo para outros devemos utilizar o module.exports, ficando:

    const Sequelize = require('sequelize');

        // Conexão com o banco de dados MySQL
        const sequelize = new Sequelize('test', 'root', 'Alison20', {
            host: "localhost",
            dialect: 'mysql'
        });

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }

Para chamar ele em outro arquivo digitamos o seguinte código:

    const db = require ('./db');

Lembrando que o ./ diz que or arquivos estão na mesma página.

=============================================

Agora no arquivo Post.js vamos criar os campos da tabela e para isso digitamos:

    const db = require ('./db');

    const Post = db.sequelize.define('postagens', {
        titulo: {
            type: db.Sequelize.STRING
        },
        coteudo: {
            type: db.Sequelize.TEXT
        }
    })

    Post.sync({force: true})

Lembrando que após criar os campos da tabela sempre comentar ou deletar a parte do sync, pois se não ele vai ficar recriando as colunas e apagando tudo que tem lá.

E por fim vamos exporta-lo:

    const db = require ('./db');

    const Post = db.sequelize.define('postagens', {
        titulo: {
            type: db.Sequelize.STRING
        },
        coteudo: {
            type: db.Sequelize.TEXT
        }
    })

    module.exports = Post;



