# Como se conectar ao MySQL

O sequelize é um orm, um orm é um sistema que abstrai toda a camada de banco de dados, então não precisa mais ficar digitando as querrys longas dos selects, etc.

Para se conectar precisanmos digitar o seguinte código:

    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('');

O primeiro parametro que eu devo passar é qual banco de dados eu quero me conectar, o usuário do banco que no nosso caso é o root, a senha e como último prametro ele pede um objeto jason e vamos chamar o host que serve para dizer em qual máquina/servidor está o nosso baco de dados mysql. Vamos chamar também o dialect que serve para dizer qual tipo de banco de dados você quer se conectar.

    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('nome_do_banco', 'usuário', 'senha');

ficando no nosso caso:
     
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('teste', 'root', 'Alison20', {
        host: "localhost",
        dialect: 'mysql'
    })

Para fazermos um teste vamos utilizar o código:

    sequelize.authenticate();

Ele verifica se a gente conseguiu se conectar com sucesso ao banco de dados, mas sozinha ele não faz nada.

    sequelize.authenticate().then(function () {
        console.log("Conectado com sucesso!")
    }).catch(function (erro) {
        console.log("Falha ao se concetar: " + erro);
    })

O .then() funciona como uma função de callback, ela é uma função especial que é executada quando um evento acontece, ou seja, a função sequelize.authenticate() quando ela tenta se conectar ao banco dedados ela só terá dois resultados, secesso ou falha, caso a gente consiga se conectar com o banco de dados com sucesso a função .then() vai ser chamada caso tenha alguma falha ou qualquer erro a função que vai ser chamada será a .catch().

O .then() e o .catch() vai ser bastante utilizado durante o curso e eles fazem parte de um paradigma chamado programação assíncrona.

