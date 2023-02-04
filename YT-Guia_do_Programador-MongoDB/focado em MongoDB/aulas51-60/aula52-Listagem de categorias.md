# Listagem de categorias

Agora vamos fazer a parte de que quando o usuário clicar em categoria ele vai ser direcionao para uma parte de categorias que tem no blog.

Primeiro vamos carregar o model de categorias:

    require('./models/Categoria');
    const Categoria = mongoose.model("categorias");

Dentro da pasta views vamos criar uma pasta com o nome categorias e dentro dessa pasta vamos criar um arquivo chamado index.handlebars.

E vamos criar uma nova rota no app.js:

    app.get("/categorias", (req, res) => {
        Categoria.find().lean().then((categorias) => {
            res.render("categorias/index", {categorias: categorias});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao listar as categorias");
            res.redirect("/")
        })
    })

Agora dentro do arquivo index.handlebars que está na página categorias digitamos:

    <h4>Categorias:</h4>

    {{#each categorias}}
        <h5>{{nome}}</h5>
    {{else}}

    {{/each}}

Lembrando que temos que linkar no href a palavra categorias que está na navbar com essa rota /categorias.

Agora vamos linkar esses nome da categoria para que quando o usuário clicar ele vai ir para uma página com os conteúdos a respeito daquela categoria.

Para isso vamos colocar uma tag a:

    <h4>Categorias:</h4>
    <hr>

    {{#each categorias}}
        <a href=""><h5>{{nome}}</h5></a>
    {{else}}

    {{/each}}

E vamos direcioná-lo para uma rota específica:

   app.get("/categorias/:slug", (req, res) => {
        Categoria.findOne().lean().then((categoria) => {
            if(categoria) {

                Postagem.find({categoria: categoria._id});

            } else {
                req.flash("error_msg", "Está categoria não existe");
                res.redirect("/");
            }
        }).catch((err) => {
            res.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria");
            res.redirect("/");
        })
    })

Ou seja, ele basicamente está pesquisando os posts que pertencem a aquela categoria que foi passada pelo slug.

Agora dentro da pasta views/categorias vou criar um arquivo chamado postagens.handlebars.

E vou mexer um pouco na rota novamente:

    app.get("/categorias/:slug", (req, res) => {
        Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {
            if(categoria) {

                Postagem.find({categoria: categoria._id}).lean().then ((postagens) => {

                    res.render("categorias/postagens", {postagens: postagens, categoria: categoria});

                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao listar os posts");
                    res.redirect("/");
                }) 

            } else {
                req.flash("error_msg", "Está categoria não existe");
                res.redirect("/");
            }
        }).catch((err) => {
            res.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria");
            res.redirect("/");
        })
    })

Agora no arquivo index.handlebars dentro da pasta views/categorias vamos direcionar o href para aquela rota:

    <h4>Categorias:</h4>
    <hr>

    {{#each categorias}}
        <a href="/categorias/{{slug}}"><h5>{{nome}}</h5></a>
    {{else}}

    {{/each}}

Agora vamos rendenizar os posts da categoria:

    <h1>{{categoria.nome}}</h1>

    {{#each postagens}}
        <div class="card mt-4">
            <div class="card-body">
                <h3>{{titulo}}</h3>
                <p>{{conteudo}}</p>
                <a href="/postagem/{{slug}}"><button class="btn btn-success">Leia mais</button></a>
                <hr>
                <small>Data de publicação: {{data}}</small>
            </div>
        </div>
    {{else}}
        <h5>Nenhuma Postagem!!</h5>
    {{/each}}









