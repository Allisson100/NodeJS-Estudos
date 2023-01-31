# Formulário de postagens

Vamos criar uma nova rota no arquivo admin.js:

    router.get("/postagens", (req,res) => {
        res.render("admin/postagens")
    })

E vamos criar um novo arquivo na pasta views/admin com o nome postagens.handlebars.

Após isso vamos criar um nova rota para rendenizar a página de adição de postagens:

    router.get("/postagens/add", (req, res) => {
        res.render("admin/addpostagem");
    })

E também temos que criar um arquivo na pasta views/admin com o nome addpostagem.handlebars.

Agora vamos desenvolver um formulário para a dição de postagem no arquivo addpostagem.handlebars.

O formulário padrão já foi criado:

    <div class="card">
        <div class="card-body">
            <h4>Nova Postagem:</h4>

            <form action="">
                <label for="titulo">Titulo:</label>
                <input type="text" name="titulo" class="form-control">

                <label for="slug">Slug:</label>
                <input type="text" name="slug" class="form-control">

                <label for="descricao">Descrição:</label>
                <input type="text" name="descricao" class="form-control">

                <label for="conteudo">Conteúdo</label>
                <textarea name="conteudo" cols="30" rows="10" class="form-control"></textarea>

                <button class="btn btn-success" type="submit">Criar postagem</button>
            </form>
        </div>
    </div>

Mas ainda falta o campo de categoria. Então vamos na rota /postagens/add e digitar:

    router.get("/postagens/add", (req, res) => {
        Categoria.find().lean().then((categorias) => {
            res.render("admin/addpostagem", {categorias: categorias});
        }). catch((err) => {
            req.flash("error_msg", "Houve um erro ao carregar o formulário");
            res.redirect("/admin");
        })
    })

Bsicamente eu estou passando para a view de postagens todas as categorias cadastradas e com isso eu posso adicona-la lá no addpostagem.handlebars:

