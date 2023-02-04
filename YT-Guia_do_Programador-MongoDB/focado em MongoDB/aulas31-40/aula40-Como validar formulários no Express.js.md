# Como validar formulários no Express.js

Para fazer o sistema de validação do formulário vamos no arquivos admin.js e acrescentar alguns códigos na rota POST que é a rota do formulário.

Podemos fazer essa válidação de forma manual através de estruturas de if:

    router.post('/categorias/nova', (req, res) => {

        var erros = [];

        if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({texto: "Nome inválido"});
        }

        if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            erros.push({texto: "Slug inválido"});
        }

        if (req.body.nome.length < 2) {
            erros.push({texto: "Nome da categoria muito curto"});
        }

        if (erros.length > 0) {
            res.render("addcategorias", {erros: erros})
        }

        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save().then(() => {
            console.log("Categoria salva com sucesso");
        }).catch((err) => {
            console.log("Erro ao salvar categoria: " + err);
        })
    })

E caso de algum erro para mostrá-lo na página html devemos adicionar a seguinte estrutura na página addcategorias.handlebars:

    {{#each erros}}
        <div class="alert alert-danger">{{texto}}</div>
    {{else}}

    {{/each}}

=====================

Para deixar melhor a parte de validação, vamos adiconar a parte que cria a categoria em um else, ficando da seguinte forma:

    router.post('/categorias/nova', (req, res) => {

        var erros = [];

        if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({texto: "Nome inválido"});
        }

        if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            erros.push({texto: "Slug inválido"});
        }

        if (req.body.nome.length < 2) {
            erros.push({texto: "Nome da categoria muito curto"});
        }

        if (erros.length > 0) {
            res.render("admin/addcategorias", {erros: erros})
        } else {
            const novaCategoria = {
                nome: req.body.nome,
                slug: req.body.slug
            }
        
            new Categoria(novaCategoria).save().then(() => {
                req.flash("success_msg", "Categoria criada com sucesso!")
                res.redirect("/admin/categorias");
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
                res.redirect("/admin");
            })
        }
    })

Adicionamos também no código acima dois req.flash para exibir a mensagem se houver erro ou não ao registrar uma nova categoria. 

E criamos também um novo arquivo na pasta partials chamado _msg.handlebars para justamente exibir essas mensagens. Também tiramos as partes de console.log e colocamos um redirecionamento de páginas.

E também adicionamos o partial no página main_handlebars:

    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="/css/bootstrap.css">

        <title>Blog NodeJS</title>
    </head>
    <body>
        {{>_navbar}}
        <div class="container mt-4">
            {{>_msg}}
            {{{body}}}
        </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
    <script src="/js/bootstrap.js"></script>
    </html>

Lembrando que o flash é um tipo de sessão que só aparece uma vez, quando a pessoa for recarregar a página já não vai estar mais lá.





