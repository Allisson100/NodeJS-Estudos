# Salvando postagens no banco de dados

Vamos criar uma nova rota post:

    router.post("/postagens/nova", (req, res) => {
        
    })

Após criar  arota precisamos ir no formulário addpostagem.handlebars e dizer na action que essa rota que criamos é a rota para enviar o formulário e também dizer o método.

    <div class="card">
        <div class="card-body">
            <h4>Nova Postagem:</h4>

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

                <button class="btn btn-success" type="submit">Criar postagem</button>
            </form>
        </div>
    </div>

Agora precisamos mexer na rota que criamos. Podemos fazer a validação, mas nesse caso vamos fazer somente a validação da parte de categorias. Podemos fazer uma validação no html colocando a tag required nos campos, porém é interessante fazer uma validação no backend também. Então a rota fica o seguinte:

    router.post("/postagens/nova", (req, res) => {
        
        var erros = [];

        if (req.body.categoria == "0") {
            erros.push({texto: "Categoria inválida, registre uma categoria"});
        }

        if (erros.length > 0){
            res.render("admin/addpostagem", {erros: erros});
        }else {

        }

    })

Por enquanto fizemos uma validação na parte de categorias, onde crimos um array vazio e criamos um que, caso o req.body.categoria nos retorne 0, o que siginifica que n tem categoria registrada, ele vai adciocinar um objeto no array com o texto dizendo que é inválido. O segundo if serve para dizer que caso o array for maior que zero, ele irá redenizar a página de categorias porém com a messagem do erro. 

Lembrando que não podemos esquecer de adcionar esse erro lá na página addpostagem.handlebars:

    {{#each erros}}
        <div class="alert alert-danger">{{texto}}</div>
    {{else}}

    {{/each}}

    <div class="card">
        <div class="card-body">
            <h4>Nova Postagem:</h4>

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

                <button class="btn btn-success" type="submit">Criar postagem</button>
            </form>
        </div>
    </div>

Agora lá no else vamos adicionar a postagem no banco de dados. precismos primeiro carregar na página o model de post, pois até o moomento só tinhamos carregados o model de Categorias. Então para isso criamos uma constante:

    require('../models/Postagem');
    const Postagem = mongoose.model("postagens");

Agora no else vamos criar:

    router.post("/postagens/nova", (req, res) => {
        
        var erros = [];

        if (req.body.categoria == "0") {
            erros.push({texto: "Categoria inválida, registre uma categoria"});
        }

        if (erros.length > 0){
            res.render("admin/addpostagem", {erros: erros});
        }else {
            const novaPostagem = {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                conteudo: req.body.conteudo,
                categoria: req.body.categoria,
                slug: req.body.slug
            }

            new Postagem (novaPostagem).save().then(() => {
                req.flash("success_msg", "Postagem criada com sucesso!");
                res.redirect("/admin/postagens");
            }).catch((err) => {
                req.flash("erro_msg", "Houve um erro durante o salvamento da postagem!");
                res.redirect("/admin/postagens");
            })
        }

    })

E com isso conseguimos registrar no banco de dados a postagem.





