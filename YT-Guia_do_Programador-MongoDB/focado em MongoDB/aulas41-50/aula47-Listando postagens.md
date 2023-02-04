# Listando postagens

Funcionalidade populate.

Se quisermos pegar o nome da categoria por exemplo, deveriamos fazer um busca através do seu id.

Exemplo, vamos mexer na rota postagem:

    router.get("/postagens", (req,res) => {
        Postagem.find().lean().populate({path:"categoria", strictPopulate: false}).sort({data:"desc"}).then((postagens) => {
            res.render("admin/postagens", {postagens: postagens});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as postagens");
            res.redirect("/admin");
        })
    })

E no arquivo postagens.handlebars:

    <h2>Lista de postagens: </h2>
    <hr>
    <a href="/admin/postagens/add"><button class="btn btn-success">Nova postagem</button></a>

    {{#each postagens}}
        <div class="card mt-4">
            <div class="card-body">
                <h4>{{titulo}}</h4>
                <p>Descrição: {{descricao}}</p>
                <small>Data: {{data}}</small><br>
                <small>Categoria: {{categoria.nome}}</small>
            </div>
        </div>
    {{else}}
        <p>Nenhuma postagem registrada!</p>
    {{/each}}


