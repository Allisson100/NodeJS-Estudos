# Deletando posts

Vamos criar um botão para deletar um post do banco de dados através da página home.handlebars.

    <h1>Lista de Posts: </h1>

    {{#each posts}}
        <h1>{{titulo}}</h1>
        <p>{{conteudo}}</p>
        <button>Deletar</button>
        <hr>
    {{/each}}

Já adicionamos o botão, agora devemos criar uma rota para que aconteça o delete:

    app.get('/deletar/: id', function(req, res){
        Post.destroy({where:  {'id': req.params.id}})
    })

Nessa rota estamos dizendo que queremos deletar um dado do banco de dados e para isso utilizamos o comando Post.destroy(). Devemos passar para ele alguns parametros, pois como ele vai saber qual post queremos deletar. Então por isso dizemos que queremos destruir o post where o id vai ser igual ao id que estamos requisitando com o 'id': req.params.id.

Caso aconteça algum erro eu quero que o código me avise também.

    app.get('/deletar/: id', function(req, res){
        Post.destroy({where:  {'id': req.params.id}}).then(function(){
            res.send("Postagem deletada com sucesso!")
        }).catch(function(erro){
            res.send("Esta postagem não existe!")
        })
    })


Agora quando clicarmos no botão devemos mandar o usuário para um rota. Para isso vamos criar uma tag a envolvendo o botão e colocar no href a rota do deletar:

    <h1>Lista de Posts: </h1>

    {{#each posts}}
        <h1>{{titulo}}</h1>
        <p>{{conteudo}}</p>
        <a href="/deletar"><button>Deletar</button></a>
        <hr>
    {{/each}}

Porém devemos lembrar que a rota deletar recebe um parametro. Então vamos ter que passar esse parâmetro.

    <h1>Lista de Posts: </h1>

    {{#each posts}}
        <h1>{{titulo}}</h1>
        <p>{{conteudo}}</p>
        <a href="/deletar/{{id}}"><button>Deletar</button></a>
        <hr>
    {{/each}}


