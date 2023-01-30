# Deletando categorias

Para deletarmos as categorias primeiro vamos criar um formulário novo no arquivo categorias.handlebars e acrescentar um botão é inout do tipo hidden:

    <h2>Lista de categorias: </h2>
    <hr>
    <a href="/admin/categorias/add"><button class="btn btn-success">Nova categoria</button></a>

    {{#each categorias}}
        <div class="card mt-4">
            <div class="card-body">
                <h4>{{nome}}</h4>
                <small>Slug: {{slug}}</small><br>
                <small>Data de criação: {{date}}</small><br>
                <a href="/admin/categorias/edit/{{_id}}"><button class="btn btn-success mt-4">Editar categoria</button></a>
                <form action="" method="POST">
                    <input type="hidden" name="id" value="{{_id}}">
                    <button type="submit" class="btn btn-danger mt-2">Deletar categoria</button>
                </form>
            </div>
        </div>
    {{else}}

    {{/each}}

E vamos criar um nov rota:

    router.post("/categorias/deletar", (req, res) => {
        Categoria.remove({_id: req.body.id}).then(() => {
            req.flash("success_msg", "Categoria deletada com sucesso!");
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao deletar a categoria!");
            res.redirect("/admin/categorias");
        })
    })

Essa rota vai deletar a categoria que tem o id igual ao id que vem lá do formulário. 

E temos também que mudar o action do formulário:

    <h2>Lista de categorias: </h2>
    <hr>
    <a href="/admin/categorias/add"><button class="btn btn-success">Nova categoria</button></a>

    {{#each categorias}}
        <div class="card mt-4">
            <div class="card-body">
                <h4>{{nome}}</h4>
                <small>Slug: {{slug}}</small><br>
                <small>Data de criação: {{date}}</small><br>
                <a href="/admin/categorias/edit/{{_id}}"><button class="btn btn-success mt-4">Editar categoria</button></a>
                
                <form action="/admin/categorias/deletar" method="POST">
                    <input type="hidden" name="id" value="{{_id}}">
                    <button type="submit" class="btn btn-danger mt-2">Deletar categoria</button>
                </form>
            </div>
        </div>
    {{else}}

    {{/each}}

