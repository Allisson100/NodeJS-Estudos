# Pegando dados do formulário

Agora no arquivo index.html devemos criar a constante para receber o Post.js, pois vamos manipula-lo atraves do index.js.

    const Post = require('./models/Post');

Agora para mandar um dado do formulário para o banco de dados, devemos mexer na rota:

    app.post('/add', function(req, res) {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        })
    })

Esse código pega as informações de titulo e conteudo e joga na rota /add.

Para sabermos que os dados foram cadastrados com sucesso devemos acrescentar o .then() e o .catch() :

    app.post('/add', function(req, res) {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function () {
            res.send("Post criado com sucesso!")
        }).catch(function(erro) {
            res.send("Houve um erro: " + erro)
        })
    })

Agora o banco de dados já está funcionado.

=======================================

Para a gente ser redirecionado para outra página devemos criar uma outra rota:

    app.get('/', function(req, res){
        res.render('home')
    })

Vamos criar esse arquivo home.handlebars lá na pasta views e criar um HTMl simples:

    <h1>Lista de Posts: </h1>

E para ser direcionado para essa página devemos mudar um pouco a rota do /add :

    app.post('/add', function(req, res) {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function () {
            res.redirect('/')
        }).catch(function(erro) {
            res.send("Houve um erro: " + erro)
        })
    })

Só trocamos no .then() para res.redirect('/'), ou seja, caso o envio do formulário de certo, ele nos direciona para a página home que criamos.







