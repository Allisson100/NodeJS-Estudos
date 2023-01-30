# Editando categoria

Para apagar as categorias precisamos criar uma nova rota:

    router.get("/categorias/edit/:id", (req, res) => {
        res.render("admin/editcategorias");
    })

Temos também que adicionar um botão no arquivo categorias.handlebars com uma tag a :

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
            </div>
        </div>
    {{else}}

    {{/each}}

E vamos criar também uma nova view na pasta admin para essa parte de edição de categorias.

No arquivo editcategorias.handlebars precisamos que os dados que vamos editar fique escrito no campo do formulário e para isso devemos chamar na rota de edição o model Categoria.findOne({_id:req.params.id}):

    router.get("/categorias/edit/:id", (req, res) => {
        Categoria.findOne({_id:req.params.id}).lean().then((categoria) => {
            res.render("admin/editcategorias", {categoria: categoria});
        }).catch((err) => {
            req.flash("error_msg", "Essa categoria não existe");
            res.redirect("/admin/categorias");
        })
    })


Agora precisamos aplicar a edição no campo.

No arquivo editcategorias.handlebars precisamos adicionar um outro input do tipo hidden:

    <input type="hidden" name="id" value="{{categoria._id}}">

Ele simplesmente está pegando o id daquela categoria para ser utilizada no backend.

Agora que já temos id vamos criar outra rota:

    router.post("/categorias/edit", (req, res) => {

        Categoria.findOne({_id: req.body.id}).then((categoria) => {

            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;


        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao editar a categoria");
            req.redirect("/admin/categorias");
        })
    })

Ele basicamente está dizendo que quer trocar o nome categoria.nome pelo nome que está digitado no formulário através do req.body.nome; e a mesma coisa serve para o slug.

E se quisermos podemos fazer o sistema de validação nesse formulário também.

Precisamos agora salvar as edições e para isso temos como código final:

    router.post("/categorias/edit", (req, res) => {

        Categoria.findOne({_id: req.body.id}).then((categoria) => {

            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;

            categoria.save().then(() => {
                req.flash("success_msg", "Categoria editada com sucesso!");
                res.redirect("/admin/categorias")
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria");
                res.redirect("/admin/categorias");
            })


        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao editar a categoria");
            req.redirect("/admin/categorias");
        })
    })









