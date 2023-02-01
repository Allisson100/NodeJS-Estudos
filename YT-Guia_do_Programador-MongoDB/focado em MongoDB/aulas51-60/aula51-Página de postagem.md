# Página de postagem

Vamos mudar mais o index.handlebars:

    <div class="bg-light p-5 rounded-lg m-3">
    <h1 class="display-4">Bem-vindo ao Blog do Node</h1>

    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>

    <hr class="my-4">

    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>

    <a class="btn btn-primary btn-lg" href="#" role="button">Crie uma conta</a>
    </div>

    <hr>

    <h2>Postagens recentes:</h2>

    {{#each postagens}}
        <div class="card mt-4">
            <div class="card-body">
                <h3>{{titulo}}</h3>
                <p>{{conteudo}}</p>
                <a href=""><button class="btn btn-success">Leia mais</button></a>
                <hr>
                <small>Categoria: {{categoria.nome}}</small><br>
                <small>Data de publicação: {{data}}</small>
            </div>
        </div>
    {{else}}
        <h5>Nenhuma Postagem!!</h5>
    {{/each}}

Agora vamos criar uma nova rota:

    app.get("/postagem/:slug", (req, res) => {
        Postagem.findOne({slug: req.params.slug})
    })

Basicamente essa rota vai pesquisar uma postagem pelo slug dela e esse slug vai ser passado pelo usuario pelo parametro da rota.

Agora precisamos fazer alquela rota rendenizar uma postagem, mas para isso vamos criar priimeiro uma pasta em views com o nome de postagem e criar um arquivo index.handlebars lá dentro.

Depois que criamos vamos adicionar na rota:

    app.get("/postagem/:slug", (req, res) => {
        Postagem.findOne({slug: req.params.slug}).then((postagem) => {
            if (postagem){
                res.render("postagem/index", {postagem: postagem});
            }else {
                req.flash("error_msg", "Esta postagem não existe");
                res.redirect("/");
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno");
            res.redirect("/");
        })
    })

Depois disso temos que adcionar essa rota no href do botão que está na arquivo index.handlebars dentro da pasta views:

    <div class="bg-light p-5 rounded-lg m-3">
    <h1 class="display-4">Bem-vindo ao Blog do Node</h1>

    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>

    <hr class="my-4">

    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>

    <a class="btn btn-primary btn-lg" href="#" role="button">Crie uma conta</a>
    </div>

    <hr>

    <h2>Postagens recentes:</h2>

    {{#each postagens}}
        <div class="card mt-4">
            <div class="card-body">
                <h3>{{titulo}}</h3>
                <p>{{conteudo}}</p>
                <a href="/postagem/{{slug}}"><button class="btn btn-success">Leia mais</button></a>
                <hr>
                <small>Categoria: {{categoria.nome}}</small><br>
                <small>Data de publicação: {{data}}</small>
            </div>
        </div>
    {{else}}
        <h5>Nenhuma Postagem!!</h5>
    {{/each}}

Agora dentro do arquivo index.hndlebars que está na pasta view/postagem digitamos:

    <div class="card">
        <div class="card-body">
            <h1>{{postagem.titulo}}</h1>
            <hr>
            <small>Data de publicação: {{postagem.data}}</small><br>
            <hr>
            {{postagem.conteudo}}
        </div>
    </div>

