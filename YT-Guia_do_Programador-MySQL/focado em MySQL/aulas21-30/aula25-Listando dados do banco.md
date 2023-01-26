# Listando dados do banco

Agora vamos pegar os dados do banco e mostrar no arquivo home.handlebars, para isso devemos digitar na rota '/':

    Post.findAll()

E devemos passar esses posts para a pasta views com o .then() e dentro do .then() devemos colocar o res.render('home'), ficando da seguinte forma:

    app.get('/', function(req, res){
        Post.findAll().then(function(posts){
            res.render('home', {
                nome: "Allison",
                sobrenome: "Matheus"
            });
        })
    })

E se eu quiser que essas variavéis apareçam lá na home.handlebars eu devo digitar:

    <h1>Lista de Posts: </h1>

    {{nome}}
    {{sobrenome}}

Então agora devemos passar a variável posts para que os dados do banco fique na página home.handlebars:

       app.get('/', function(req, res){
        Post.findAll().then(function(posts){
            res.render('home', {posts: posts});
        })
    })

E devemos mudar no home.handlebars também.

    <h1>Lista de Posts: </h1>

    {{posts}}

Porém assim ele ainda não mostra os dados, mas é legal ver o que ele retorna. Para retornar os dados corretamente devemos:

    <h1>Lista de Posts: </h1>

    {{#each posts}}
        <h1>{{titulo}}</h1>
        <p>{{conteudo}}</p>
        <hr>
    {{/each}}

Mas com o código acima não aparecerá os dados do banco, pois devemos acrescentar uma coisa no arquivo db.js:

    const Sequelize = require('sequelize');

        // Conexão com o banco de dados MySQL
        const sequelize = new Sequelize('postapp', 'root', 'Alison20', {
            host: "localhost",
            dialect: 'mysql',
            query:{raw:true}
        });

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }

Agora tudo está correto para que funcione.

A tag {{#each}} {{/each}} siginifica "cada", então lá no código do handlebars queremos dizer que para cada postagem, exiba o título no h1 e conteudo na tag p e também o hr.
Usamos isso, pois o que recebemos do Post.findAll é um array com vários posts, então essa é uma maneira de seleciona-lo.

=========================================

Todo esse código exibirá o conteúdo do banco de dados dos posts mais antigos para os mais recente, caso quisermos exibir do mais recente para o mais antigo devemos:

 app.get('/', function(req, res){
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            res.render('home', {posts: posts});
        })
    })

Se quisermos do mais antigo para o mais novo devemos mudar o desc para asc:


    app.get('/', function(req, res){
        Post.findAll({order: [['id', 'ASC']]}).then(function(posts){
            res.render('home', {posts: posts});
        })
    })



