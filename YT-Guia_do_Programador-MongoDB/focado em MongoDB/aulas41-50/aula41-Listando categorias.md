# Listando categorias

Agora precisamos mostar a lista de categorias na rota categorias. Primeiro temos que indentificar a rota de categorias e digitar:

    router.get('/categorias', (req, res) => {
        Categoria.find().lean().then((categorias) => {
            res.render("admin/categorias", {categorias: categorias});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias");
            res.redirect("/admin")
        })
    })

Não podemos esquecer também de passar os valores para a página de categorias lá no arquivo categorias.handlebars:

    <h2>Lista de categorias: </h2>
    <hr>
    <a href="/admin/categorias/add"><button class="btn btn-success">Nova categoria</button></a>

    {{#each categorias}}
        <div class="card mt-4">
            <div class="card-body">
                <h4>{{nome}}</h4>
                <small>Slug: {{slug}}</small><br>
                <small>Data de criação: {{date}}</small>
            </div>
        </div>
    {{else}}

    {{/each}}

===================================

E se quisermos ordenar as categorias do mias recente para o mais antigo que nem fizemos no MySQL basta ir na rota de categorias e chamar a função .sort({date: 'desc'}):

    router.get('/categorias', (req, res) => {
        Categoria.find().lean().sort({date: 'desc'}).then((categorias) => {
            res.render("admin/categorias", {categorias: categorias});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias");
            res.redirect("/admin")
        })
    })



