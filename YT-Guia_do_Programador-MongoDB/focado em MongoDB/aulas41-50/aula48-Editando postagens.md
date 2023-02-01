# Editando postagens

Vamos basicamente replicar o que fizemos com a parte de categorias.

Primeiro vamos criar uma rota do tipo get:

    router.get("/postagens/edit/:id", (req, res) => {
        res.render("admin/editpostagens");
    })

E vamos criar esse arquivo editpostagens.handlebars na pasta views/admin.

O formulário do arquivo editpostagens é o mesmo do addpostagens, mudando somente o titulo e nome do botão:

    {{#each erros}}
        <div class="alert alert-danger">{{texto}}</div>
    {{else}}

    {{/each}}

    <div class="card">
        <div class="card-body">
            <h4>Editar Postagem:</h4>

            <form action="/admin/postagens/nova" method="POST">
                <label for="titulo">Titulo:</label>
                <input type="text" name="titulo" class="form-control">

                <label for="slug">Slug:</label>
                <input type="text" name="slug" class="form-control">

                <label for="descricao">Descrição:</label>
                <input type="text" name="descricao" class="form-control">

                <label for="conteudo">Conteúdo</label>
                <textarea name="conteudo" cols="30" rows="10" class="form-control"></textarea>

                <label for="categoria">Categoria:</label>
                <select name="categoria" class="form-select">
                    {{#each categorias}}
                        <option value="{{_id}}">{{nome}}</option>
                    {{else}}
                        <option value="0">Nenhuma categoria registrada</option>
                    {{/each}}
                </select><br>            

                <button class="btn btn-success" type="submit">Editar postagem</button>
            </form>
        </div>
    </div>

Lembrando que foi acrescentado o botão editar postagem no arquivo postagens.handlebars.

Agora para mostar o conteúdo cadastrado no arquivo editpostagens.handlebars devemos fazer duas pesquisas seguidas no banco de dados do Mongo, primeiro pesquisar as postagens e depois as categorias.

Para fazer essas pesquisas em sequencia devemos mexer na rota:

    router.get("/postagens/edit/:id", (req, res) => {

        Postagem.findOne({_id: req.params.id}).lean().then((postagem) => {

            Categoria.find().lean().then((categorias) => {
                res.render("admin/editpostagens", {categorias: categorias, postagem: postagem});
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao listar as categorias.");
                res.redirect("/admin/postagens");
            })

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro as carregar o formulário de edição");
            res.redirect("/admin/postagens");
        })
    })

Também devemos adicionar essas dados no arquivo editpostagens.handlebars:

    {{#each erros}}
        <div class="alert alert-danger">{{texto}}</div>
    {{else}}

    {{/each}}

    <div class="card">
        <div class="card-body">
            <h4>Editar Postagem:</h4>

            <form action="/admin/postagens/nova" method="POST">
                <label for="titulo">Titulo:</label>
                <input type="text" name="titulo" class="form-control" value="{{postagem.titulo}}">

                <label for="slug">Slug:</label>
                <input type="text" name="slug" class="form-control" value="{{postagem.slug}}">

                <label for="descricao">Descrição:</label>
                <input type="text" name="descricao" class="form-control" value="{{postagem.descricao}}">

                <label for="conteudo">Conteúdo</label>
                <textarea name="conteudo" cols="30" rows="10" class="form-control">{{postagem.conteudo}}</textarea>

                <label for="categoria">Categoria:</label>
                <select name="categoria" class="form-select">
                    {{#each categorias}}
                        <option value="{{_id}}">{{nome}}</option>
                    {{else}}
                        <option value="0">Nenhuma categoria registrada</option>
                    {{/each}}
                </select><br>            

                <button class="btn btn-success" type="submit">Editar postagem</button>
            </form>
        </div>
    </div>

Lembrando que a tag textarea não existe o value, então coloacamos o conteudo dentro do campos mesmo (>{{postagem.conteudo}}<).


Agora precisamos criar uma rota que vai atualizar lá no banco de dados o conteud da postagem:

Antes de criar a rota devemos criar um input dentro do form do tipo hidden no arquivo editpostagens.handlebars:

    <input type="hidden" value="{{postagem._id}}" name="id">


E mudamos também a action para a rota de edição do formulário.

Podemos fazer a validação na rota se quisermos, porém nessa aula não faremos para não ficar repetitivo. Então o código da rota fica o seguinte:

    router.post("/postagem/edit", (req, res) => {

        Postagem.findOne({_id: req.body.id}).then((postagem) => {

            postagem.titulo = req.body.titulo
            postagem.slug = req.body.slug
            postagem.descricao = req.body.descricao
            postagem.conteudo = req.body.conteudo
            postagem.categoria = req.body.categoria

            postagem.save().then(() => {
                req.flash("success_msg", "Postagem editada com sucesso!");
                res.redirect("/admin/postagens")
            }).catch((err) => {
                req.flash("error_msg", "Erro interno");
                res.redirect("admin/postagens");    
            })

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a edição");
            res.redirect("/dmin/postagens");
        })
    })







