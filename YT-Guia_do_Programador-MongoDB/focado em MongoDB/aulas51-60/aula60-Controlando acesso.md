# Controlando acesso

Agora vamos fazer a parte onde apenas os admin vão poder acessar aquela parte de categorias.

Vamos armazenar os dados do usuário logado em uma variável global com o passport.

Vamos no arquivo app.js e na parte do middleware vamos criar uma nova variável:

    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            res.locals.error = req.flash("error");
            res.locals.user = req.user || null;
            next()
        })
    
A parte res.locals.user = req.user || null; signifca que a variável user vai armazenar os dados do usuário autenticado. O req.user é uma coisa que o passport cria automaticamente que armazena dados daquele usuário logado. E o null serve para caso não exista usuário logado o que vai ser passado para aquela variável vai ser o valor null.

Agora vamos criar uma pasta com o nome helpers. Helpers são pequenas funções que servem para ajudar em alguma coisa. Podemos criar helpers para qualquer coisa.

Vamos criar um helper para proibir que um usuário entre em alguma rota específica.

Dentro da pasta helpers vamos criar um novo arquivo com o nome eAdmin.js. Basicamente a utilidade desse arquivo é saber se o usuário está autenticado e se ele é admin.

Então no arquivo eAdmin.js digitamos:

    module.exports = {
        eAdmin: function(req, res, next){

            if(req.isAuthenticated() && req.user.eAdmin == 1) {
                return next();
            }

            req.flash("error_msg", "Você precisa ser um Admin!");
            res.redirect("/");
        }
    }

Agora vamos no arquivo admin.js que está na pasta routes e vamos carregar o helper:

    const {eAdmin} = require("../helpers/eAdmin");  

Essa const quer dizer que eu quero pegar somente a função eAdmin.

Agora toda a rota que eu quiser proteger eu vou colocar a variável eAdmin antes do (req, res). Alguns exemplos:

    router.get('/posts', eAdmin, (req, res) => {
        res.send("Página de posts!")
    })

    router.get('/categorias', eAdmin, (req, res) => {
        Categoria.find().lean().sort({date: 'desc'}).then((categorias) => {
            res.render("admin/categorias", {categorias: categorias});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias");
            res.redirect("/admin")
        })
    })

Agora vamos tirar os botôes de Login e registro que tem na navbar para quem está logado. Para isso vamos no arquivo _navbar.handlebars e acrescentamos somente um if/else:

    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Blog do Node</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/categorias">Categorias</a>
            </li>
            {{#if user}}
            {{else}}
            <li class="nav-item">
            <a class="nav-link disabled">Login</a>
            </li>
            <li class="nav-item">
            <a class="nav-link disabled">Resgistro</a>
            </li>
            {{/if}}
        </ul>
        </div>
    </div>
    </nav>

A variável user que está no if vem lá da variável global do middleware, ou seja, Se existir um usuário logado não mostre os botões de registro e login Se Não mostre os botôes.

Agora lá no arquivo usuario.js eu vou colocar a variável eAdmin: 1, para criar uma conta como adm e depois vou retirar esse campo. O código fica o seguinte:

    const novoUsuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        eAdmin: 1
    })

Código por inteiro:

    router.post("/registro", (req, res) => {

        var erros = [];

        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({texto: "Nome inválido"});
        }

        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
            erros.push({texto: "Email inválido"});
        }

        if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
            erros.push({texto: "Senha inválida"});
        }

        if(req.body.senha.length < 4) {
            erros.push({texto: "Senha muito curta"});
        }

        if(req.body.senha != req.body.senha2) {
            erros.push({texto: "As senhas são diferentes, tente novamente!"});
        }

        if(erros.length > 0) {

            res.render("usuarios/registro", {erros: erros});

        }else { 
            Usuario.findOne({email: req.body.email}).then((usuario) => {
                if(usuario) {
                    req.flash("error_msg", "Já existe uma conta com esse email no noso sistema");
                    res.redirect("/usuarios/registro");
                }else {

                    const novoUsuario = new Usuario({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha,
                        eAdmin: 1
                    })

                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                            if(erro) {
                                req.flash("error_msg", "Houve um erro durante o salvamento do usuário"); 
                                res.redirect("/");
                            }

                            novoUsuario.senha = hash

                            novoUsuario.save().then(() => {
                                req.flash("success_msg", "Usuário cadastrado com sucesso");
                                res.redirect("/");
                            }).catch((err) => {
                                req.flash("error_msg", "Houve um erro ao criar o usuário, tente novamente!");
                                res.redirect("/usuarios/registro");
                            })
                        })
                    })

                }
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno");
                res.redirect("/");
            })
        }
    })

Depois de criar uma conta como Admin podemos apagar aquela parte.

Agora vamos colocar o link no botão de login lá no arquivo da _navbar.handlebars e também devemos mudar a class para active em vez de disabled:

    <li class="nav-item">
        <a class="nav-link active" href="/usuarios/login">Login</a>
    </li>
    <li class="nav-item">
        <a class="nav-link active" href="/usuarios/registro">Resgistro</a>
    </li>









