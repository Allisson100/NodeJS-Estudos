# Criando home page

Criamos até o momento toda a parte do admin, agora vamos criar a prte do cliente.

Vamos no arquivo app.js e criar a rota:

    app.get('/', (req, res) => {
        res.render("index")
    })

E na pasta views vamos criar um arquivo chamdo index.handlebars.

E vamos personalizar também a _navbar.handlebars.

Adicionamos no index.js um component do site do bootstrap chamado jumbotron.

    <div class="bg-light p-5 rounded-lg m-3">
        <h1 class="display-4">Hello, world!</h1>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </div>

Agora precisamos carregar o model de postagem no app.js, pois queremos listar as postagens na página principal.

    require('./models/Postagem');
    const Postagem = mongoose.model("postagens"); 

Agora vamos mexer na rota:

    app.get('/', (req, res) => {
        Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
            res.render("index", {postagens: postagens});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno");
            res.redirect("/404");
        })
    })

Agora vamos criar a rota 404:

    app.get("/404", (req, res) => {
        res.send("Erro 404!");
    })

Agora vamos acrescentar código no arquivo index.hndlebars:

